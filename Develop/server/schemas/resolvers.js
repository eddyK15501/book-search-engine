const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find().select('-__v -password').populate('savedBooks');
        },
        user: async (parent, { username }) => {
            return User.findOne({ username }).select('-__v -password').populate('savedBooks');
        },
        me: async (parent, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).select('-__v -password').populate('savedBooks');
            }
            throw new AuthenticationError('You need to be logged in!');
        }
    }
}

module.exports = resolvers;