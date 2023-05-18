const { AuthenticationError } = require('apollo-server-express');
const { User, Food, Order } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')(process.env.STRIPE_SECRET);


const resolvers = {
    Query: {
      foods: async () => {
        return await Food.find({});
      },

      user: async (_, args, context) => {
        if (context.user) {
          const user = await User.findById(context.user._id)
          .populate({path: "orders.foods"})
          return user

        }
         throw new AuthenticationError('not login in')
      },

      order: async (_, args, context) => {
        if (context.user) {
        const user = await User.findById(context.user._id)
          .populate({path: "orders.foods"})
          return user.orders.id(args._id)
        }
      }
      
    //   matchups: async (parent, { _id }) => {
    //     const params = _id ? { _id } : {};
    //     return Matchup.find(params);
    //   },
    // },
    // Mutation: {
    //   createMatchup: async (parent, args) => {
    //     const matchup = await Matchup.create(args);
    //     return matchup;
    //   },
   
//       createVote: async (parent, { _id, techNum }) => {
//         const vote = await Matchup.findOneAndUpdate(
//           { _id },
//           { $inc: { [`tech${techNum}_votes`]: 1 } },
//           { new: true }
//         );
//         return vote;
//       },
    },
    Mutation: {
      addUser: async (parent, { name, email, password }) => {
        const user = await User.create({ name, email, password });
        const token = signToken(user);
        return { token, user };
      },
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
  
        if (!user) {
          throw new AuthenticationError('No user found with this email address');
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }
  
        const token = signToken(user);
  
        return { token, user };
      },
      addOrder: async (parent, { foods }, context) => {
        console.log(context);
        if (context.user) {
          const order = new Order({ foods });
  
          await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });
  
          return order;
        }
  
        throw new AuthenticationError('Not logged in');
      },
    }
  };
  
  module.exports = resolvers;
  