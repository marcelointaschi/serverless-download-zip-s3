import 'source-map-support/register';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import { S3Service } from './S3Service';


/**
 *  This function is responsible for download a ZIP from a S3 bucket
 * 
 * @param event event request
 * 
 * @returns in case of sucesss, 200 status code with the zip base64
 */
const downloadzips3: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

  console.log('event',event);

  const s3 = new S3Service();
  
  const resp = await s3.download(event.pathParameters.id);
  
  //console.log('done:', resp) // In case you want to check if the file is returned

  let response = {

    statusCode: 200,
    headers: {
      'Cache-Control':'no-cache',
      'Content-type': 'application/zip',
      'content-disposition': 'attachment; filename=arquivo.zip' 
    },
    body: resp,
    isBase64Encoded: true
  };
  return response;
}


export const main = middyfy(downloadzips3);
