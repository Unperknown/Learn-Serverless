import DynamoDB from 'aws-sdk/clients/dynamodb';

const dynamoDB = new DynamoDB.DocumentClient();

export default {
  get: (input: any) => dynamoDB.get(input).promise,
  put: (input: any) => dynamoDB.put(input).promise,
  query: (input: any) => dynamoDB.query(input).promise,
  update: (input: any) => dynamoDB.update(input).promise,
  delete: (input: any) => dynamoDB.delete(input).promise,
};
