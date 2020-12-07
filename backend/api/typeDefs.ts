import { buildSchema } from 'graphql';

const schema = buildSchema(`
    type User {
        id: ID
        firstName: String
        lastName: String
        email: String
        role: String
    }

    type Query {
        currentUser: User
    }
`)

export default schema;