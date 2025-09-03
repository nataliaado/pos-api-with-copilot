const { gql } = require("apollo-server-express");

module.exports = gql`
  type User {
    username: String!
    favorecido: Boolean!
  }

  type Transfer {
    from: String!
    to: String!
    value: Float!
    date: String
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Error {
    error: String!
  }

  type Query {
    login(username: String!, password: String!): AuthPayload
    users: [User]
    transfers: [Transfer]
  }

  type Mutation {
    registerUser(
      username: String!
      password: String!
      favorecido: Boolean!
    ): User
    transfer(from: String!, to: String!, value: Float!): Transfer
  }
`;
