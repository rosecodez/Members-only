const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  username: { type: String, require: true },
  password: { type: String, require: true },
  membershipStatus: { type: String, require: true },
});

userSchema.virtual("url").get(function () {
  return `/members-only/user/${this._id}`;
});

module.exports = mongoose.model("user", userSchema);
