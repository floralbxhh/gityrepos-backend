const mongoose = require("mongoose");

const Starred = mongoose.model(
  "Starred",
  new mongoose.Schema(
    {
      githubRepoId: {
        type: Number,
        required: true,
        unique: true,
      },
      name: {
        type: String,
        required: true,
      },
      fullname: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
    {
      timestamps: true,
    }
  )
);

module.exports = Starred;
