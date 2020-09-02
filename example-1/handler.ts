import { v4 as uuidv4 } from 'uuid';
import { APIGatewayEvent } from 'aws-lambda';
import { response } from './middlewares';
import { user } from './models';

const main = response(async (event: APIGatewayEvent) => {
  const data = JSON.parse(event.body);
  const input = {
    TableName: 'test',
    Item: {
      id: uuidv4(),
      uid: event.requestContext.identity.cognitoIdentityId,
      user: data.user,
      age: data.age,
    },
  };

  await user.put(input);

  return input.Item;
});

export { main };
