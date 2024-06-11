const express = require("express");
const router = express.Router;

const userController = require("../controllers/user-controller");
const messageController = require("../controllers/message-controller");

// sign-up form
router.get("/members-only/sign-up", userController.user_create_get);
router.post("/members-only/sign-up", userController.user_create_post);

// login form
