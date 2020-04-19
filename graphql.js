const { ApolloServer } = require('apollo-server-lambda');
const schema = require('./schema');

const server = new ApolloServer({ schema });

// to run on your AWS Lambda
exports.graphqlHandler = server.createHandler();
