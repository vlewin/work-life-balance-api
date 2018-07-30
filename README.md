# work-life-balance AWS Lambda based API

## KNOWN ISSUES:
- https://github.com/date-fns/date-fns/issues/376

## Controllers
- [AJV plugins](https://github.com/DivineGod/ajv-error-messages)
- [Rails-style implementation of strong parameters for Node.js](https://www.npmjs.com/package/strong-params)

## DynamodDB ORMs and wrappers
- [AWS SDK](https://github.com/multidots/node-graphql-dynamodb-example/blob/master/dynamodb.js)
- [dynamo-node](https://www.npmjs.com/package/dynamo-node)
- [amazon-dynamodb-datamapper](https://aws.amazon.com/de/blogs/developer/introducing-the-amazon-dynamodb-datamapper-for-javascript-developer-preview/)

## JSON schema validators
https://github.com/DivineGod/ajv-error-messages

Remote JSON schema???
https://github.com/entrecode/json-schema-remote

## npm-middlewares - A collection of middyJS custom middlewares for lambda functions
https://github.com/Vin65/npm-middlewares

## npm-auth0-authorizer - Auth0 API Gateway Custom Authorizer
https://github.com/Vin65/npm-auth0-authorizer

## Serveless alternatives
[Claudia.js](https://claudiajs.com/tutorials/lambda-api-dynamo-db.html)
[AWS SAM](https://github.com/awslabs/serverless-application-model)

## ISSUES
DON'T UPLOAD A WHOLE NODE_MODULES DIR TO AWS LAMBDA, ONLY RUNTIME DEPENDENCIES!!!


- https://read.acloud.guru/why-amazon-dynamodb-isnt-for-everyone-and-how-to-decide-when-it-s-for-you-aefc52ea9476
- https://blog.codeship.com/querying-and-pagination-with-dynamodb/
- https://containership.engineering/dynamodb-to-postgres-why-and-how-aa891681af4d
- https://www.reddit.com/r/aws/comments/8c7uoz/which_aws_service_would_you_prefer_to_use_as_an/

## Microsoft Azure???
[Time Series Insights](https://azure.microsoft.com/en-us/services/time-series-insights/)

## AWS DynamoDb vs Microsoft Azure Cosmos DB vs Google Firebase
- https://medium.com/@ivanjaros/picking-event-store-for-merqio-store-ng-amazon-dynamodb-150879024e87
- https://medium.com/@ivanjaros/picking-event-store-for-merqio-store-ng-pt-2-microsoft-azure-cosmos-db-8996b7b8dff0
- https://medium.com/@ivanjaros/picking-event-store-for-merqio-store-ng-pt-2-microsoft-azure-cosmos-db-752d5237a95b

## AWS Labs
[AWS Labs](https://github.com/awslabs)

## Event Sourcing with Dynamo and CQRS
- https://serverless.com/blog/event-driven-architecture-dynamodb/
- https://medium.com/@mhemphill.au/event-sourcing-with-dynamo-4d692cd56649
- https://itnext.io/creating-a-blueprint-for-microservices-and-event-sourcing-on-aws-291d4d5a5817
- https://www.linkedin.com/pulse/serverless-event-sourcing-aws-sam-van-overmeire

## Event sourcing examples
- [NPM package](https://github.com/bakerface/dynamodb-event-store)
- [Serverless example](https://github.com/alessandrobologna/dynamodb-event-store)

## Node
[NPX](https://blog.npmjs.org/post/162869356040/introducing-npx-an-npm-package-runner)

### Learn Object spread
```javascript
Object spread example:

const defaultOptions = {  
  foo: true,
  bar: 10,
  zaz: 'hi'  
};

const userLandOptions = {  
  foo: false,
  bar: 200
};


const combinedOptionsObject = {  
  ...defaultOptions,
  ...userLandOptions,
  yolo: true
};

console.log(combinedOptionsObject); // => { foo: false, bar: 200, zaz: 'hi', yolo: true }
```

### Graphql examples

```
  query getBalance {
    getBalance(user_id: "auth0|5b0fd1cb21652a131b051f7a") {
      user_id
      vacation
    }
  }
  mutation PutBalance {
    updateBalance(input: {
      user_id: "auth0|5b0fd1cb21652a131b051f7a",
      vacation: 3
      sickness: 3
      total: 1.0
    }) {
      user_id
      vacation
      sickness
      total
  	}
  }

  subscription updateBalance {
      onUpdateBalance {
        user_id
      }
  }
```
