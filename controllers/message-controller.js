const Message = require("../models/message");
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

      const message = new Message({
        title: req.body.title,
        timestamp: new Date(),
        text: req.body.text,
        user: userId,
      });

      await message.save();
      res.redirect("/members-only/user-details");
    } catch (err) {
      next(err);
    }
  }),
];
