const { ApolloServer } = require('apollo-server');
const schema = require('./schema');

// to run locally or on your EC2 instance
const server = new ApolloServer({ schema });

server.listen().then(({ url }) => {
    console.log(`🚀  F1 GraphQL Server ready at ${url}`);
  });