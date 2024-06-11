const express = require("express");
const router = express.Router();

const userController = require("../controllers/user-controller");
const messageController = require("../controllers/message-controller");

// sign-up form
router.get("/sign-up", userController.user_create_get);
router.post("/sign-up", userController.user_create_post);

// log-in form
module.exports = router;
