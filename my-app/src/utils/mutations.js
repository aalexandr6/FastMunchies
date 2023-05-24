import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation add_User ($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      token
      user {
        name
        email
        _id
      }
    }
  }