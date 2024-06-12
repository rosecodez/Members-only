const express = require("express");
const router = express.Router();

const userController = require("../controllers/user-controller");
const messageController = require("../controllers/message-controller");

// sign-up form
router.get("/sign-up", userController.user_create_get);
router.post("/sign-up", userController.user_create_post);

// log-in form
router.get("/log-in", userController.user_login_get);
router.post("/log-in", userController.user_login_post);

// log-out form
router.get("/log-out", userController.user_logout_get);

module.exports = router;
