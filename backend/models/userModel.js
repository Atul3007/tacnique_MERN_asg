const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    city: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const userModel = mongoose.model("trq_users", userSchema);

module.exports = userModel;
