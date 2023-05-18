const mongoose = require("mongoose");
// const Food = require('./food.models');
// const User = require('./user.models')

const Schema = mongoose.Schema;

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const orderSchema = new Schema(
  {
    foods: [{
      type: Schema.Types.ObjectId,
      ref: "Food",
    }],
    // totalCost: {
    //   type: Number,
    //   required: true,
    // },
    // userEmail: {
    //   type: String,
    //   required: true,
    //   // unique: false,
    //   trim: true,
    //   lowercase: true,
    //   validate: [validateEmail, "Please fill a valid email address"],
    //   match: [
    //     /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    //     "Please fill a valid email address",
    //   ],
    // },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
