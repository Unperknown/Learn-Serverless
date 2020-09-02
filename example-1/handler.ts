import { v4 as uuidv4 } from "uuid";
import AWS, { AWSError } from "aws-sdk";
import { APIGatewayEvent, Context, Callback } from "aws-lambda";
import { PutItemOutput } from "aws-sdk/clients/dynamodb";

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const main = (event: APIGatewayEvent, context: Context, callback: Callback) => {
  // Fetch request body
  const data = JSON.parse(event.body);

  // Sample row
  const inputs = {
    TableName: "test",
    Item: {
      id: event.requestContext.identity.cognitoIdentityId,
      uid: uuidv4(),
      user: data.user,
      age: data.age,
    },
  };

  dynamoDB.put(inputs, (err: AWSError, data: PutItemOutput) => {
    // enable CORS
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    };

    if (err) {
      const response = {
        statusCode: 500,
        headers: headers,
        body: JSON.stringify({ status: false }),
      };

      callback(null, response);

      return;
    }

    const repsonse = {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify(inputs.Item),
    };

    callback(null, repsonse);
  });
};

export { main };
