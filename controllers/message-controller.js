const Message = require("../models/message");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const { getUserId } = require("./user-controller");

exports.message_create_get = asyncHandler(async (req, res, next) => {
  res.render("message-form");
});

exports.message_create_post = [
  body("title", "Title must be specified").trim().isLength({ min: 1 }).escape(),
  body("text", "Text must be specified").trim().isLength({ min: 1 }).escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("message-form", {
        errors: errors.array(),
        message: req.body.text,
      });
    }

    try {
      const userId = getUserId(req);
      const user = await User.findById(userId);
      const message = new Message({
        title: req.body.title,
        timestamp: new Date(),
        text: req.body.text,
        user: userId,
        username: user.username,
      });

      await message.save();
      res.redirect("/members-only/user-details");
    } catch (err) {
      next(err);
    }
  }),
];

exports.message_list = asyncHandler(async (req, res, next) => {
  try {
    const allMessages = await Message.find().sort({ timestamp: 1 }).exec();

    if (req.isAuthenticated()) {
      res.render("message_list_members", {
        messageList: allMessages,
        user: req.user,
      });
    } else {
      res.render("message_list_non_members", {
        messageList: allMessages,
        user: null,
      });
    }
  } catch (err) {
    next(err);
  }
});

exports.message_delete_get = asyncHandler(async (req, res, next) => {
  const message = await Message.findById(req.params.id);

  if (!message) {
    const err = new Error("Message not found");
    err.status = 404;
    return next(err);
  }

  res.render("delete_message", { message });
});

exports.message_delete_post = asyncHandler(async (req, res, next) => {
  await Message.findByIdAndDelete(req.params.id);
  res.redirect("/members-only/message-list");
});
