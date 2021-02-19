const mongoose = require("mongoose");

const Starred = mongoose.model(
  "Starred",
  new mongoose.Schema(
    {
      githubRepoId: {
        type: Number,
        required: true,
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
      htmlUrl: {
        type: String,
        required: true
      },
      createdBy: {
        type: String,
      }
    },
    {
      timestamps: true,
    }
  )
);

module.exports = Starred;
