import { ApolloServer, gql } from 'apollo-server-micro';

// define API queries types
// create the schema
const typeDefs = gql`
  type User {
    name: String
  }

  type Query {
    sayHello: String
    isCool: Boolean
    me: User
  }
`;

// Resolovers - what to run/return when we hit API
const resolvers = {
  User: {
    name: () => 'Marley',
  },

  Query: {
    sayHello: () => 'Hello Colin',
    isCool: () => false,
  },
};

// create new apollo servew with this two properties
const apolloServer = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
});

// provide small config option (NJS is expecting this)
export const config = {
  api: {
    bodyParser: false,
  },
};

// export server with path where API lives
export default apolloServer.createHandler({ path: '/api/graphql' });

// When the API is hit, call this function
// and return a response
// export default (req, res) => {
//   res.status(200).json({
//     test: 'Hello Colin'
//   })
// };

// per documentation
// export default (req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'application/json');
//   res.end(JSON.stringify({ name: 'John Doe' }));
// };
