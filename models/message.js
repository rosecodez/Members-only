const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  title: { type: String, require: true },
  timestap: { type: String, require: true },
  text: { type: String, require: true },
});

messageSchema.virtual("url").get(function () {
  return `/members-only/message/${this._id}`;
});

module.exports = mongoose.model("user", messageSchema);
