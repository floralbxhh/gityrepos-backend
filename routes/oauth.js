const asyncHandler = require("express-async-handler");
const userCtrl = require("../controllers/user.controller");
const oauthCtrl = require("../controllers/oauth.controller");
const {encrypt, decrypt} = require("../helpers/encryption")

const router = require("express").Router();
module.exports = router;

router.get("/", asyncHandler(async(req, res) => {
  //Make sure we have the 'code' query parameter
  if (req.query.code) {
    const token = await oauthCtrl.getUserToken(req.query.code);
    const cryptedToken = encrypt(token);
    res.json({ success: true, cryptedKey: cryptedToken });
  } else{
    res.status(400).json({ success: false, message: "bad request" });
  }
}));

router.put(
  "/authenticate",
  asyncHandler(async (req, res) => {
    if (req.body.cryptedKey) {
      const token = decrypt(req.body.cryptedKey);
      const userData = await oauthCtrl.getUserData(token);
      const user = await storeUser(userData);

      console.log(userData);

      res.json({ success: true, userdata: user });
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
