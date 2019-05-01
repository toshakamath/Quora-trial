var express = require("express");
var router = express.Router();
var passport = require("passport");
var requireAuth = passport.authenticate("jwt", { session: false });
const mongoose = require("mongoose");
var Topic = require("../../Kafka-Backend/Models/topic");

//post a new question from a user
router.post("/", function(req, res) {
  console.log("Inside topic Post Request");
  console.log("Req Body : ", req.body);
  req.body._id = new mongoose.Types.ObjectId();
  Topic.create(req.body, (err, topicResult) => {
    if (err) {
      console.log("Error in creating the topics : ", err);
      res.status(400).json("error in adding topic");
    } else {
      console.log("Saved topic successfully with user id : ", topicResult);
      res.status(200).send({ message: "Topic added Successfully" });
    }
  });
});

module.exports = router;
