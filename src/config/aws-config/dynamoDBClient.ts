import * as AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import 'dotenv/config';

const { ENDPOINT_URL, REGION,AWS_ACCESS_ID,AWS_SECRET_KEY ,IS_DDB_LOCAL} = process.env;

export const dynamoDBClient = (): DocumentClient => {
  console.log("IS_DDB_LOCAL=" + IS_DDB_LOCAL)
  if (IS_DDB_LOCAL){
    return new AWS.DynamoDB.DocumentClient({
      region: REGION,
      endpoint: ENDPOINT_URL,
      apiVersion: 'latest',
      
    });
  }else{
    return new AWS.DynamoDB.DocumentClient({
      region: REGION,
      endpoint: ENDPOINT_URL,
      apiVersion: 'latest',
      credentials: {
        accessKeyId:  AWS_ACCESS_ID,
        secretAccessKey: AWS_SECRET_KEY
      }
      
    });
  }
  
};
