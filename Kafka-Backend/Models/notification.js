const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var notification = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
    user: { type: Schema.Types.ObjectId, ref: "userDetails" },
    question:{type: Schema.Types.ObjectId, ref: "questionsdetail"},
    date: {type:Date}
    });

module.exports = mongoose.model("notification",notification);