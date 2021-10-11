/* 
    Used Docker to run the DynamoDB locally using thebelow command:

    docker run -p 8000:8000 amazon/dynamodb-local
*/
const { AWS } = require('./connection');

/* 
    I am creating a table called Todos in Amazon DynamoDB using the values specified in the params object. 
    This is made possible because there is a database connection running on the endpoint: "http://localhost:8000".
 */

const dynamodb = new AWS.DynamoDB();

const params = {
  TableName: "Todos",
  KeySchema: [
    { AttributeName: "id", KeyType: "HASH" },  //Partition key
  ],
  AttributeDefinitions: [
    { AttributeName: "id", AttributeType:"S" },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10
  }
};

dynamodb.createTable(params, function (err, data) {
  if (err) {
    console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
  } else {
    console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
  }
});

