const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  title: { type: String, require: true },
  timestamp: { type: Date, require: true },
  text: { type: String, require: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

messageSchema.virtual("url").get(function () {
  return `/members-only/message/${this._id}`;
});

module.exports = mongoose.model("message", messageSchema);
