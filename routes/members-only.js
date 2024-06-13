const express = require("express");
const router = express.Router();

const userController = require("../controllers/user-controller");
const messageController = require("../controllers/message-controller");

// 1.user controller
// sign-up form
router.get("/sign-up", userController.user_create_get);
router.post("/sign-up", userController.user_create_post);

// log-in form
router.get("/log-in", userController.user_login_get);
router.post("/log-in", userController.user_login_post);

// log-out
router.get("/log-out", userController.user_logout_get);

// display user detail
router.get("/user-details", userController.user_details_get);

// 2. message controller
router.get("/new-message", messageController.message_create_get);
router.post("/new-message", messageController.message_create_post);
router.get("/message-list", messageController.message_list);

module.exports = router;
