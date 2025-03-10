const typeDefs = `
  type User {
    _id: ID
    username: Sting
    email: String
    password: String
    savedBooks: [BookDocument]
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
      user: User}
    }

    input BookInput {
      authors: [String]
      description: String
      title: String
      bookId: String
      image: String
      link: String}
    }   

    type LoginInput {
      email: String
      username: String
      password: String!
    }

    type AddUserInput {
      username: String!
      email: String!
      password: String!
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