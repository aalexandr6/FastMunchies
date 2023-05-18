const { ObjectId } = require('mongoose').Types;
const { User, order } = require('../models');

const userCount = async () => {
    const numberOfUsers = await User.aggregate()
      .count('userCount');
    return numberOfUsers;
  }
  
  module.exports = {

    // Gets all users
    async getUsers(req, res) {
      try {
        const Users = await User.find();
  
        const userObj = {
          Users,
          userCount: await userCount(),
        };
  
        res.json(userObj);
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },

    // Gets a single user
    async getSingleUser(req, res) {
        try {
          const User = await User.findOne({ _id: req.params.UserId })
            .select('-__v');

          if (!User) {
            return res.status(404).json({ message: 'No User with that ID' })
          }
          res.json({
            User,
            order: await order(req.params.UserId),
          });
        } catch (err) {
          console.log(err);
          return res.status(500).json(err);
        }
      },
    
    //   Creates a new User
      async createUser(req, res) {
        try {
          const User = await User.create(req.body);
          res.json(User);
        } catch (err) {
          res.status(500).json(err);
        }
      },
    
    //   Finds and deletes a user.
      async deleteUser(req, res) {
        try {
          const User = await User.findOneAndRemove({ _id: req.params.UserId });
    
          if (!User) {
            return res.status(404).json({ message: 'No such User exists' });
          }
    
          res.json({ message: 'User was successfully deleted' });
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },
    
    //   Adds and order to a user
      async addOrder(req, res) {
        console.log('You are creating an order');
        console.log(req.body);
    
        try {
          const user = await user.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { Orders: req.body } },
            { runValidators: true, new: true }
          );
    
          if (!user) {
            return res
              .status(404)
              .json({ message: 'No user found with that ID' });
          }
    
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },
      
    //   Removes and order from a user.
      async removeOrder(req, res) {
        try {
          const user = await user.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { Order: { OrderId: req.params.OrderId } } },
            { runValidators: true, new: true }
          );
    
          if (!user) {
            return res
              .status(404)
              .json({ message: 'No user found with that ID' });
          }
    
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },
    




}



  