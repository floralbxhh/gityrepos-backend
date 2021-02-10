const Joi = require("joi");
const User = require("../models/user");
const createError = require("http-errors");

const userSchema = Joi.object({
  username: Joi.string().min(3).required(),
  githubUserId: Joi.number().required(),
  fullname: Joi.string().allow(null),
  email: Joi.string().email().allow(null),
  avatarUrl: Joi.string().uri().allow(null),
});

async function storeUser(userData) {
  let validator = await userSchema.validate(userData, { abortEarly: false });

  if (validator.error) {
    throw createError(400, validator.error);
  } else {
    let user = await User.findOneAndUpdate(
      { username: userData.username },
      userData,
      {
        new: true,
        upsert: true,
      }
    );

    return user.toObject();
  }
}

async function getUserIdByUsername(username) {
  if (username) {
    const user = await User.findOne({ username: username }, "_id");
    return user;
  } else {
    return null;
  }
}

module.exports = { storeUser, getUserIdByUsername };
