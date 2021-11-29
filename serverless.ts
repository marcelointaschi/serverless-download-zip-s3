import type { AWS } from '@serverless/typescript';
import downloadzip from '@functions/downloadzip';


const serverlessConfiguration: AWS = {
  service: 'downloadzips3',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
    apigwBinary: {
      types: ['*/*']
    }
  },
  plugins: ['serverless-webpack','serverless-apigw-binary','serverless-offline'],
  provider: {
    name: 'aws',
    stage: 'prod',
    runtime: 'nodejs14.x',
    region: 'sa-east-1',
    logs: {
    restApi: true
    },
    vpc: {
      securityGroupIds: [
         'sg-xxxxxxxxxxxxxxx'
      ],
      subnetIds: [
         'subnet-xxxxxxxxxxxxxxxxx',
         'subnet-xxxxxxxxxxxxxxxxx'
      ]
    },
    apiGateway: {
      shouldStartNameWithService: true,
      binaryMediaTypes : ['*/*'],
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '0',
      ACCESSKEY: '${env:ACCESSKEY}',
      SECRETKEY: '${env:SECRETKEY}',
      BUCKETNAME: '${env:BUCKETNAME}',
      REGION: '${env:REGION}',
      SLS_DEBUG: '*'
    },
    lambdaHashingVersion: '20201221',
  },

  functions: { downloadzip },
};

module.exports = serverlessConfiguration;
