// Import the 'gql' function from Apollo Client
// It allows us to define GraphQL queries using GraphQL syntax within JavaScript files
import { gql } from "@apollo/client";

// Define GraphQL queries. Each query corresponds to an operation that retrieves data from the server

// Query to fetch a list of complaints. It doesn't require any input and returns an array of complaint objects
export const GET_COMPLAINTS = gql`
  query complaints {
    complaints {
      _id
      title
      description
      category
      username
      date
      votes
      unsupportedVotes
      image
      created
      comments {
        _id
        author
        description
        createdAt
        image
        link
      }
    }
  }
`;

// Query to fetch a specific complaint by its 'id.' It takes 'id' as input and returns the complaint's data.
export const GET_COMPLAINT = gql`
  query complaint($complaintID: ID!) {
    complaint(complaintID: $complaintID) {
      _id
      title
      description
      category
      username
      image
      date
      votes
      unsupportedVotes
      created
      comments {
        _id
        author
        description
        createdAt
        image
        link
      }
    }
  }
`;
export const GET_USER_BY_COMPLAINT = gql`
  query userComplaint($complaintID: ID!) {
    userComplaint(complaintID: $complaintID) {
      _id
      username
      email
      password
      isModerator
      complaints {
        _id
        title
        description
        category
        image
        date
        votes
        created
        comments {
          _id
          author
          description
          createdAt
          image
          link
        }
      }
    }
  }
`;

// Query to fetch a list of users. It doesn't require any input and returns an array of user objects.
export const GET_USERS = gql`
  query getUsers {
    users {
      _id
      username
      email
    }
  }
`;

// Query to fetch a specific user by their 'id.' It takes 'id' as input and returns the user's data.
export const GET_USER = gql`
  query getUser($id: ID!) {
    user(_id: $id) {
      _id
      username
      email
    }
  }
`;

// Query to fetch a complaint by category
export const GET_COMPLAINTS_BY_CATEGORY = gql`
  query complaintsByCategory($category: String!) {
    complaintsByCategory(category: $category) {
      _id
      title
      description
      category
      username
      image
      date
      votes
      unsupportedVotes
      created
      comments {
        _id
        author
        description
        createdAt
        image
        link
      }
    }
  }
`;
// query to get user me field is very important as it fetches the current logged in user
export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      isModerator
      complaints {
        _id
        title
        description
        category
        username
        image
        date
        votes
        unsupportedVotes
        created
        comments {
          _id
          author
          description
          createdAt
          image
          link
        }
      }
    }
  }
`;