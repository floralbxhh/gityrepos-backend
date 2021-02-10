const asyncHandler = require("express-async-handler");
const starredCtrl = require("../controllers/starred.controller");

const router = require("express").Router();

router.get("/", asyncHandler(starredCtrl.saveStarred));

module.exports = router;
