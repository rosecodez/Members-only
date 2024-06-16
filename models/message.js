const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  title: { type: String, require: true },
  timestamp: { type: Date, require: true },
  text: { type: String, require: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  username: { type: String, required: true },
});

messageSchema.virtual("url").get(function () {
  return `/members-only/message/${this._id}`;
});

messageSchema.virtual("timestamp_formatted").get(function () {
  return DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model("message", messageSchema);
