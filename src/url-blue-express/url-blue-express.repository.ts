import { Injectable } from '@nestjs/common';
import { dynamoDBClient } from 'src/config/aws-config/dynamoDBClient';
import { UrlBEInterface } from './url-blue-express.interface';

const { TABLE_NAME } = process.env;
console.log('UrlBlueExpressRepository TABLE_NAME', TABLE_NAME);
@Injectable()
export class UrlBlueExpressRepository {
  async findOneId(urlId: string) {
    console.log('findOneId urlId', urlId);
    const result = await dynamoDBClient()
      .get({
        TableName: TABLE_NAME,
        Key: { urlId },
      })
      .promise();

    return result.Item;
  }

  async findOneBy(longUrlVal: string) {
    console.log('findOneBy longUrlVal', longUrlVal);
    const result = await dynamoDBClient()
      .scan({
        TableName: TABLE_NAME,
        FilterExpression: 'longUrl = :longUrlVal',
        ExpressionAttributeValues: {
          ':longUrlVal': longUrlVal,
        },
      })
      .promise();
    return result.Items[0];
  }

  async getList(limit: number, startKey: string) {
    let params = {
      TableName: TABLE_NAME,
      Limit: limit,
    };

    if (startKey !== '0') {
      params['ExclusiveStartKey'] = { urlId: startKey };
    }
    console.log('getLists result', params);

    const result = await dynamoDBClient().scan(params).promise();
    console.log('getLists result', result);
    return result;
  }

  async totalCountLists() {
    const result = await dynamoDBClient()
      .scan({
        TableName: TABLE_NAME,
        Limit: 3,
      })
      .promise();
    console.log('getLists result', result);
    return result;
  }

  async create(urlBEInterface: UrlBEInterface) {
    console.log('create urlBEInterface', urlBEInterface);
    return await dynamoDBClient()
      .put({
        TableName: TABLE_NAME,
        Item: urlBEInterface,
      })
      .promise();
  }

  async update(urlId: string, countRedirect: number) {
    console.log('update urlId', urlId, 'countRedirect', countRedirect);
    const updated = await dynamoDBClient()
      .update({
        TableName: TABLE_NAME,
        Key: { urlId },
        UpdateExpression: 'set countRedirect = :countRedirect',
        ExpressionAttributeValues: {
          ':countRedirect': countRedirect,
        },
        ReturnValues: 'ALL_NEW',
      })
      .promise();
    return updated.Attributes;
  }

  async delete(urlId: string) {
    console.log('delete urlId', urlId);
    const response = await dynamoDBClient()
      .delete({
        TableName: TABLE_NAME,
        Key: { urlId },
      })
      .promise();
    return response;
  }
}
