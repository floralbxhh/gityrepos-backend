const express = require("express");
const User = require("../models/user");

const Router = express.Router();
module.exports = Router;

//@route GET api/users
//@description Get all users
Router.get("/", (req, res) => {
  User.find()
    .then((users) => {
      if (users.length > 0) {
        res.json({ success: true, results: users.length, data: users });
      } else {
        res.status(404).json({ success: false, message: "not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ success: false, error: err });
    });
});

//@route GET /api/users/:username
//@description Get a user based on username
Router.get("/:username", (req, res) => {
  User.findOne({ username: req.params.username })
    .then((user) => {
      if (user) {
        res.json({ success: true, data: user });
      } else {
        res.status(404).json({ success: false, message: "not found" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ success: false, message: "server error", error: err });
    });
});

//@route POST /api/users
//@description Creates a user
Router.post("/", (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then((user) => {
      res
        .status(201)
        .json({ success: true, message: "user created", data: user });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ success: false, message: "server error", error: err.message });
    });
});

//@route DELETE /api/users/:username
//@description Deletes a user
Router.delete("/:username", (req, res) => {
  User.findOneAndDelete({ username: req.params.username })
    .then((user) => {
      if (user) {
        res.json({ success: true, data: user });
      } else {
        res.status(404).json({ success: false, message: "not found" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ success: false, message: "server error", error: err });
    });
});

//@route PATCH /api/users/:username
//@description Updates a user
Router.patch("/:username", (req, res) => {
  User.findOneAndUpdate({ username: req.params.username }, req.body)
    .then((user) => {
      if (user) {
        res.json({ success: true, data: user });
      } else {
        res.status(404).json({ success: false, message: "not found" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ success: false, message: "server error", error: err });
    });
});
