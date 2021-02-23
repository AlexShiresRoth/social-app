const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.typeDef = `
    type User {
        handle: String
        name: String
        email: String
        password: String
        passwordTwo: String
        avatar: String
    }
    type Query {
        getUsers: [User]
    }
    type Mutation {
      loginUser (email:String, password:String, handle: String): LoginResponse
      createUser (email: String, handle: String, password: String, passwordTwo: String, avatar: String): CreateUserResponse 
    }

    type LoginResponse {
      message:String
      success:Boolean
      user: User
      token: ID!
    }

    type CreateUserResponse {
      message: String
      success: Boolean
      user: User
      token: ID!
    }

`;

module.exports.resolvers = {
  Query: {
    getUsers: () => {},
  },
  Mutation: {
    loginUser: async (_, { email, handle, password }) => {
      const foundUser = await User.findOne({ email });

      if (!foundUser) {
        return {
          message: "Could not locate a user",
          success: false,
          user: {},
        };
      }

      const compare = await bcrypt.compare(password, foundUser.password);

      if (!compare) {
        return {
          message: "Password does not match",
          success: false,
          user: {},
        };
      }

      const payload = {
        id: {
          user: foundUser.id,
        },
      };

      const token = await jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 34000,
      });

      return {
        message: "Successful login",
        success: true,
        user: foundUser,
        token,
      };
    },
  },
};
