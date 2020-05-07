const { ApolloServer } = require('apollo-server');
const typeDefs = require('./typedefs');
const resolvers = require('./resolvers');

// to run locally or on your EC2 instance
const server = new ApolloServer({ typeDefs, resolvers , playground: { endpoint: "/dev/graphql" }});

server.listen().then(({ url }) => {
    console.log(`🚀  F1 GraphQL Server ready at ${url}`);
  });