This component is meant to make a very common pattern deployed with the Serverless Framework available
easily to components users. The pattern is as follows:

1. A microservice that relates to a single entity in a data model (Customer, Product, Order, etc).
2. The entity is managed via a REST API CRUD; Create, Read (single and list), Updated and Delete.
3. Each CRUD action is performed by an individual Lambda function.
4. Each Lambda is connected to its own API Gateway endpoint; API Gateway manages routing, not the code
5. Each CRUD action acts upon a single DynamoDB table
6. Each data manipulation event triggers an asynchronous process to notify any other services in the ecosystem about the state change of that entity; create, update or delete

Usually setting this up in the Serverless Framework is a little laborious requiring configuration of DynamoDB, each function and its associated paths, permissions, etc. The aim is to have a single component that has a minimal configuration to get a simple working service that meets the criteria but has capacity to be customised further; see serverless.prototype.yml for an example of the envisaged minimum configuration required to deploy a working API with all the features listed above.
