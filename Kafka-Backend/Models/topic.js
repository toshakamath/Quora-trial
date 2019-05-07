const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var topic = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  //Topic details
  topicsSelected: [
    { topicName: { type: String }, topicImage: { type: String } }
  ],
  followers: {  type: Schema.Types.ObjectId, ref: "userDetails"  },
  userId: { type: String }
});

module.exports = mongoose.model("topic", topic);
