import * as S3 from 'aws-sdk/clients/s3';

/**
 * @author marcelo.intaschi
 * 
 * This class is responsible for download file from S3
 * 
 */

export class S3Service {    
    /**
     *  Custom method to download ZIP
     * 
     * @param file  ZIP name
     * 
     * @returns the file
     */
    async download (file: string): Promise<any>{
    
      console.log('starting the download')

      const aws:S3 = new S3();

      aws.config.update({
        region: process.env.REGION,
        accessKeyId: process.env.ACCESSKEY,
        secretAccessKey: process.env.SECRETKEY
        });
           
      const filename = file + '.zip';

      console.log('Downloading the file:',filename );
      
      const data = await aws.getObject({
        Bucket: process.env.BUCKETNAME,
        Key: filename
        }).promise();
     
            console.log('there is a object',data)
            const bytearray = JSON.stringify(data.Body)
            const jdata = JSON.parse(bytearray); 
            const resp = Buffer.from(jdata.data, "binary").toString("base64");

            // console.log('DATA:',resp) //In case you want to check if the file is returned

            return resp;
    }
}