import { AWSError } from 'aws-sdk';

test('Main Lambda Test', async () => {

  const callback = (error: AWSError, response: any) => {
    expect(response.statusCode).toEqual(200);

    expect(response.headers['Access-Control-Allow-Origin']).toEqual('*');
    expect(response.headers['Access-Control-Allow-Credentials']).toEqual(true);
  };

  //await main(event, context);
});
