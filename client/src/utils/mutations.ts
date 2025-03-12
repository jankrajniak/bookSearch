import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($input: LoginInput!) {
   login(input: $input) {
    token
    user {
      _id
      username
      email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($input: AddUserInput!) {
    addUser(input: $input) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;
  
export const SAVE_BOOK = gql`
    mutation saveBook($input: BookInput!) {
      saveBook(input: $input) {
        username
        email
        password
        savedBooks {
          bookId
          authors
          description
          title
          image
          link
          }
        bookCount
      }
    }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($input: BookId!) {
    removeBook(input: $input) {
      _id
      username
      email
      password
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
        }
    bookCount
    }
  }
`;

