const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var answersdetail = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  //need reference of question too..check how to add that
  answer: { type: String },
  answerOwner: { type: String },
  isAnonymous: { type: Boolean },
  question: { type: Schema.Types.ObjectId, ref: "questionsdetail" },
  upVote: [{ type: Schema.Types.ObjectId, ref: "userDetails" }],
  downVote: [{ type: Schema.Types.ObjectId, ref: "userDetails" }],
  bookmarked: [{ type: Schema.Types.ObjectId, ref: "userDetails" }],
  comment: [
    {
      userid: { type: Schema.Types.ObjectId, ref: "userDetails" },
      comment: { type: String }
    }
  ],
  answerDate: { type: Date },
});

module.exports = mongoose.model("answersdetail", answersdetail);
