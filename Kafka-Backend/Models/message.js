const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var message = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
    originalreceiver: {type:String},
    originalsender:{type:String},
    subject: {type:String},
    messages: [{sender: {type:String}, receiver: {type:String}, date: {type:Date}, message:{type:String}}],
    date: {type:Date}
    });

    module.exports = mongoose.model("message",message);
