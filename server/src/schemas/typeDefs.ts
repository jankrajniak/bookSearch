const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]
    bookCount: Int
    }

  type Book {
    bookId: String
    title: String
    authors: [String]
    description: String
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  input BookInput {
    authors: [String]
    description: String
    title: String
    bookId: String
    image: String
    link: String
  }   

  input LoginInput {
    email: String
    username: String
    password: String!
  }

  input AddUserInput {
    username: String!
    email: String!
    password: String!
    savedBooks: [BookInput]
  }

  type Query {
    me: User
  }

  type Mutation {
    login(input: LoginInput!): Auth
    addUser(input: AddUserInput): Auth
    saveBook(input: BookInput): User
    removeBook(bookId: String!): User
  }
`;

export default typeDefs;