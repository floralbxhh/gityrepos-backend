const asyncHandler = require("express-async-handler");
const userCtrl = require("../controllers/user.controller");
const oauthCtrl = require("../controllers/oauth.controller");

const router = require("express").Router();
module.exports = router;

router.get("/", (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENTID}&scope=user&allow_signup=false`
  );
});

router.get(
  "/authenticate",
  asyncHandler(async (req, res, next) => {
    //Make sure we have the 'code' query parameter
    if (req.query.code) {
      const token = await oauthCtrl.getUserToken(req.query.code);

      const userData = await oauthCtrl.getUserData(token);

      const user = await storeUser(userData);

      res.json({ success: true, data: user });
    } else {
      res.status(400).json({ success: false, message: "bad request" });
    }
  })
);

async function storeUser(userData) {
  let user = (({ login, id, name, email, avatar_url }) => ({
    username: login,
    githubUserId: id,
    fullname: name,
    email: email,
    avatarUrl: avatar_url,
  }))(userData);

  let userObj = await userCtrl.storeUser(user);

  return userObj;
}
