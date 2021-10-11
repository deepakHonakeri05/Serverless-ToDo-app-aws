const AWS = require("aws-sdk");

//Using the AWS locally and later deploying it toa remote endpoint

AWS.config.update({
  region: "us-east-1",
  endpoint: "http://docker.for.mac.localhost:8000"
});

module.exports = { AWS };


