const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Child {
    id: ID!
    firstName: String!
    lastName: String!
    birthday: String!
    class: String!
    favoriteTreat: String!
    talksGiven: Int!
  }

  type Query {
    getAllChildren: [Child]
    getChildById(id: ID!): Child
  }

  type Mutation {
    addChild(
      firstName: String!
      lastName: String!
      birthday: String!
      class: String!
      favoriteTreat: String!
      talksGiven: Int!
    ): Child
    updateChild(
      id: ID!
      firstName: String
      lastName: String
      birthday: String
      class: String
      favoriteTreat: String
      talksGiven: Int
    ): Child
    deleteChild(id: ID!): String
  }
`;

module.exports = typeDefs;