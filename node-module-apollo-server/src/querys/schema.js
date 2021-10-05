const {gql} = require('apollo-server-express');

const typeDefs = gql`
  type Users {
    name: String!
    username: String!
    email: String!
  }

  type Query {
    users: [Users]
  }
`;

module.exports = typeDefs;
