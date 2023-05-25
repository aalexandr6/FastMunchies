const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Food {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
  }

  type Order {
    _id: ID
    date: String
    foods: [Food]
  }

  type User {
    _id: ID
    name: String
    email: String
    orders: [Order]
  }

  type Auth {
    token: ID
    user: User
  }
  type Checkout {
    session: ID
  }

  type Query {
    foods: [Food]
    user: User
    order(_id: ID!): Order
    checkout(foods: [ID]!): Checkout
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    addOrder(foods: [ID]!): Order
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
