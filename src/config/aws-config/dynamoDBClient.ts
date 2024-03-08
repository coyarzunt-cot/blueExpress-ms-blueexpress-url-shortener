import * as AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import 'dotenv/config';

const { IS_DDB_LOCAL,} = process.env;

export const dynamoDBClient = (): DocumentClient => {
  console.log("IS_DDB_LOCAL=" + IS_DDB_LOCAL)
  const boolIsDBLocal : boolean= (IS_DDB_LOCAL ==="true");
  if (boolIsDBLocal){
    const { ENDPOINT_URL, REGION,IS_DDB_LOCAL,} = process.env;
    return new AWS.DynamoDB.DocumentClient({
      region: REGION,
      endpoint: ENDPOINT_URL,
      apiVersion: 'latest',
      
    });
  }else{
    const { ENDPOINT_URL_AWS, REGION_AWS,AWS_ACCESS_ID,AWS_SECRET_KEY} = process.env;
    return new AWS.DynamoDB.DocumentClient({
      region: REGION_AWS,
      endpoint: ENDPOINT_URL_AWS,
      apiVersion: 'latest',
      credentials: {
        accessKeyId:  AWS_ACCESS_ID,
        secretAccessKey: AWS_SECRET_KEY
      }
      
    });
  }
  
};
