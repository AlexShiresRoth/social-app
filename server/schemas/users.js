module.exports.typeDef = `
    type User {
        name: String
        email: String
        password: String
        avatar: String
    }
    type Query {
        getUsers: [User]
    }
`;

module.exports.resolvers = {
  Query: {
    getUsers: () => {},
  },
};
