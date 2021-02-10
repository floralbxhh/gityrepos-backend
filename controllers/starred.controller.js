const axios = require("axios");
const userCtrl = require("./user.controller");
const Starred = require("../models/starred");

const createError = require("http-errors");

const saveStarred = async (req, res, next) => {
  const username = req.query?.username;

  //Make sure there is a user stored in db with the provided username
  const user = await userCtrl.getUserIdByUsername(username);

  if (user?._id) {
    const apiStarredData = await getStarredAPI(username, user._id);

    await Starred.deleteMany({ userId: user._id });

    const starred = await Starred.insertMany(apiStarredData);
    res.json({ success: true, results: starred.length, data: starred });
  } else {
    res.status(400).json({ success: false, message: "bad request" });
  }
};

const getStarredAPI = async (username, userId) => {
  try {
    const { data } = await axios.get(
      `https://api.github.com/users/${username}/starred`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    let starred = data.map((o) => {
      return {
        githubRepoId: o.id,
        name: o.name,
        fullname: o.full_name.toString(),
        description: o.description,
        userId: userId,
      };
    });

    return starred;
  } catch (err) {
    throw createError(500, err);
  }
};

module.exports = { saveStarred };
