const { ApolloServer } = require('apollo-server-lambda');
const typeDefs = require('./typedefs');
const resolvers = require('./resolvers');

const server = new ApolloServer({ typeDefs, resolvers });

// to run on your AWS Lambda (testing)
exports.graphqlHandler = server.createHandler({
    cors: {
      origin: '*',
      credentials: true,
    },
  });
