const { AWS } = require('../connection');

const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async function (event, context) {
  let response;
  let todoId;
  const table = "Todos";

  if (event.body) { 
    let body = JSON.parse(event.body);
    todoId = body.id;
  }
  
  // delete the item, unconditionally,
  const params = {
    TableName: table,
    Key: {
      "id": todoId,
    }
  };

//if todo is deleted then a success message "Todo deleted" is returned
//else return error occurred
  try {
    const data = await docClient.delete(params).promise();  //delete item from dynamodb table
    response = {
      'statusCode': 200,
      'body': JSON.stringify({
        data,
        message: 'Todo deleted!'
      })
    }
  } catch (err) {
    response = {
      'statusCode': 400,
      'body': JSON.stringify({
        error: err,
        message: 'Todo not deleted!'
      })
    }
  }

  return response;
};