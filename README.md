# Serverless - Download ZIP functions

This project has been generated using the `aws-nodejs-typescript` template from the [Serverless framework](https://www.serverless.com/).

For detailed instructions, please refer to the [documentation](https://www.serverless.com/framework/docs/providers/aws/).

# Download ZIP

This project is a serverless service to get a ZIP from a specific bucket. 

IMPORTANT: The file's size is important!! It works with small files.

If you want to download other type of files, only change the content-type application/zip.


## Environemnt INSTALL
- Install Serverless using the command:
```
 npm install serverless -g
```
- Configure the AWS credentials in case of AWS provider with the command bellow:
```
serverless config credentials  -o  --provider aws --key <KEYHERE> --secret <SECRETHERE>
```
## Installation/deployment instructions

Depending on your preferred package manager, follow the instructions below to deploy your project.

> **Requirements**: NodeJS `lts/fermium (v.14.15.0)`. If you're using [nvm](https://github.com/nvm-sh/nvm), run `nvm use` to ensure you're using the same Node version in local and in your lambda's runtime.

### Using NPM

- Run `npm i` to install the project dependencies
- Run `npx sls deploy` to deploy this stack to AWS

### Using Yarn

- Run `yarn` to install the project dependencies
- Run `yarn sls deploy` to deploy this stack to AWS

## Test the services

This template contains a lambda functions triggered by an HTTP request made on the provisioned API Gateway REST API.

### downloadzips3

- sending a `POST` request to `/downloadzips3` with a payload containing a string properties of `src/functions/downloadzips3/schema.ts` will result in API Gateway returning a `200` HTTP status code.

requesting any other path than both above will result in API Gateway returning a `403` HTTP error code

### Locally

In order to test the hello function locally, run the following command:

- `npx sls invoke local -f downloadzips3 --path src/functions/downloadzips3/mock.json` if you're testing the downloadzips3 function or `npm run debug`

Check the [sls invoke local command documentation](https://www.serverless.com/framework/docs/providers/aws/cli-reference/invoke-local/) for more information.

### Remotely

You can use the browser to test, ex: https://myApiEndpoint/dev/downloadzips3/file123


### Project structure

The project code base is mainly located within the `src` folder. This folder is divided in:

- `functions` - containing code base and configuration for your lambda functions
- `libs` - containing shared code base between your lambdas

```
.
├── src
│   ├── functions               # Lambda configuration and source code folder
│   │   │
│   │   ├── downloadzips3
│   │   │   ├── handler.ts      # `downloadzips3` lambda source code
│   │   │   ├── index.ts        # `downloadzips3` lambda Serverless configuration
│   │   │   ├── mock.json       # `downloadzips3` lambda input parameter, if any, for local invocation
│   │   │   ├── schema.ts       # `downloadzips3` lambda input event JSON-Schema
|   |   |   └── S3Service.ts    # `downloadzips3` S3 function to download the zip file
│   │   │
│   │   └── index.ts            # Import/export of all lambda configurations
│   │
│   └── libs                    # Lambda shared code
│       └── apiGateway.ts       # API Gateway specific helpers
│       └── handlerResolver.ts  # Sharable library for resolving lambda handlers
│       └── lambda.ts           # Lambda middleware
│
├── package.json
├── serverless.ts               # Serverless service file
├── tsconfig.json               # Typescript compiler configuration
├── tsconfig.paths.json         # Typescript paths
└── webpack.config.js           # Webpack configuration
```

### 3rd party libraries

- [json-schema-to-ts](https://github.com/ThomasAribart/json-schema-to-ts) - uses JSON-Schema definitions used by API Gateway for HTTP request validation to statically generate TypeScript types in your lambda's handler code base
- [middy](https://github.com/middyjs/middy) - middleware engine for Node.Js lambda. This template uses [http-json-body-parser](https://github.com/middyjs/middy/tree/master/packages/http-json-body-parser) to convert API Gateway `event.body` property, originally passed as a stringified JSON, to its corresponding parsed object
- [@serverless/typescript](https://github.com/serverless/typescript) - provides up-to-date TypeScript definitions for your `serverless.ts` service file
- [aws-sdk](https://www.npmjs.com/package/aws-sdk) - aws library