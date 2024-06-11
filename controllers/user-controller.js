const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

exports.user_create_get = asyncHandler(async (req, res, next) => {
  res.render("sign-up-form");
});

exports.user_create_post = [
  body("firstName", "First name must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("lastName", "Last name must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("username", "Username must be specified")
    .trim()
    .isLength({ min: 6 })
    .escape(),
  body("password", "Password must be specified")
    .trim()
    .isLength({ min: 10 })
    .escape(),
  body("password", "Password name must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // if there are errors, render sign up form again
      res.render("sign-up-form", {
        errors: errors.array(),
        user: req.body,
      });
      return;
    }
    try {
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        if (err) {
          return next(err);
        }

        const user = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          username: req.body.username,
          password: hashedPassword,
          membershipStatus: "non-member",
        });
        await user.save();
        res.redirect("/");
      });
    } catch (err) {
      return next(err);
    }
  }),
];
