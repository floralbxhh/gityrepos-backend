const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      username: {
        type: String,
        required: true,
        unique: true,
      },
      githubUserId: {
        type: Number,
        required: true,
        unique: true,
      },
      fullname: {
        type: String,
      },
      email: {
        type: String,
      },
      avatarUrl: {
        type: String,
      },
    },
    { timestamps: true }
  )
);

module.exports = User;
