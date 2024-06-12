const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

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

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return done(null, false, {
          message: "Incorrect username or password.",
        });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, {
          message: "Incorrect username or password.",
        });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

exports.user_login_get = asyncHandler(async (req, res, next) => {
  res.render("log-in-form");
});

exports.user_login_post = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/members-only/log-in",
});

exports.user_logout_get = asyncHandler(async (req, res, next) => {
  req.logout();
  res.redirect("/");
});
