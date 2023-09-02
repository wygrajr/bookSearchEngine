const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');


const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('savedBooks');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
  Mutation: {
    login: async (_, body) => {
      const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });
      const correctPw = await user.isCorrectPassword(body.password);
      if (!correctPw) {
        return res.status(400).json({ message: 'Wrong password!' });
      }
      const token = signToken(user);
      return {user,token};
    },

    addUser: async (_, body) => {
      const user = await User.create(body);
      if (!user) {
        return res.status(400).json({ message: 'Something is wrong!' });
      }
      const token = signToken(user);
      return {user,token};
    },

    saveBook: async (_, { user, body }) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { savedBooks: body } },
        { new: true, runValidators: true }
      );
      return updatedUser;
    },

    removeBook: async (_, { user, params }) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
      { $pull: { savedBooks: { bookId: params.bookId } } },
      { new: true }
      );
      return updatedUser;
    },
  },
};

module.exports = resolvers;
