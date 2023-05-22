const { ObjectId } = require('mongoose').Types;
const { User, Order } = require('../models');

const userCount = async () => {
    const numberOfUsers = await User.aggregate()
      .count('userCount');
    return numberOfUsers;
  }
  
  module.exports = {

    // Gets all users
    async getUsers(req, res) {
      try {
        const users = await User.find();
  
        const userObj = {
          users,
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
          const user = await User.findOne({ _id: req.params.UserId })
            .select('-__v');

          if (!user) {
            return res.status(404).json({ message: 'There is no user with that Id' })
          }
          res.json({
            user,
            order: await Order(req.params.userId),
          });
        } catch (err) {
          console.log(err);
          return res.status(500).json(err);
        }
      },
    
    //   Creates a new User
      async createUser(req, res) {
        try {
          const user = await User.create(req.body);
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },
    
    //   Finds and deletes a user.
      async deleteUser(req, res) {
        try {
          const user = await User.findOneAndRemove({ _id: req.params.userId });
    
          if (!user) {
            return res.status(404).json({ message: 'That user does not exist' });
          }
    
          res.json({ message: 'User was successfully deleted' });
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },
}



  