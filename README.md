# DynamoDB Instagram using OneTable

This is a fork of Alex's excellent DynamoDB demo / sample that builds a simple Instagram backend clone to use [OneTable](https://www.npmjs.com/package/dynamodb-onetable).

For a full discussion, please read

[Building Instagram with DynamoDB and OneTable](https://www.sensedeep.com/blog/posts/stories/building-instagram-with-dynamoDB-and-OneTable.html).

The original project was built for a DynamoDB demo on [Marcia Villalba's YouTube channel](https://www.youtube.com/channel/UCSLIvjWJwLRQze9Pn4cectQ).

## Background

This fork utilizes [OneTable](https://www.npmjs.com/package/dynamodb-onetable) to explore the benefits of using OneTable compared to native DynamoDB APIs.

The OneTable differences are:

* ./connect/Schema.js -- The OneTable entity schema
* ./connect/index.js -- Setup for the OneTable DynamoDB connection and initialization
* ./data -- The logic models now use OneTable which provides a CRUD API for each entity
* ./handlers -- Adjusted to use the slightly different syntax of the data API
