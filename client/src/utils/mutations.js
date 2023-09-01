import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password ) {
      _id
      username
      password
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      _id
      username
      email
      password
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($bookId: String!, $authors: String!, $description: String!, $title: String!, $image: String, $link: String) {
    saveBook(bookId: $bookId, authors: $authors, description: $description, title: $title, image: $image, link: $link) {
      _id
      bookId
      authors
      description
      title
      image
      link
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      _id
      bookId
    }
  }
`;