const { ApolloServer } = require('apollo-server-lambda');
const schema = require('./schema');

const server = new ApolloServer({ schema });

// to run on your AWS Lambda (testing)
exports.graphqlHandler = server.createHandler({
    cors: {
      origin: '*',
      credentials: true,
    },
  });
