import { config } from '../../config/config';
import AWS = require('aws-sdk');

let dynamoDB: AWS.DynamoDB.DocumentClient;
if(config.isOffline){
    dynamoDB = new AWS.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: config.dynamoDbLocalUrl,
  });
}else{
    dynamoDB = new AWS.DynamoDB.DocumentClient();
}

export default dynamoDB;