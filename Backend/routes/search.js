var express = require("express");
var router = express.Router();
var passport = require("passport");
var requireAuth = passport.authenticate("jwt", { session: false });
var userDetails = require("../../Kafka-Backend/Models/userDetails");
var question = require("../../Kafka-Backend/Models/questionsDetail");
var topic = require("../../Kafka-Backend/Models/topic");
ObjectId = require("mongodb").ObjectID;

router.post("/", async function(req, res) {
  console.log("Inside search Get Request", req.body);

  console.log("Req Body : ", req.body.searchItem);

  let resp = {
    profile: [],
    question: [],
    topics: []
  };

  user = await userDetails.find({
    firstName: { $regex: ".*" + req.body.searchItem + ".*" }
  });
  console.log("userDONE");
  if (!!user && user.length) {
    console.log(user);
    resp.profile = user; //+" "+user.lastName)
  } else {
    console.log("error");
  }

  question = await question.find({
    question: { $regex: ".*" + req.body.searchItem + ".*" }
  });
  console.log("questioDONE");
  if (!!question && question.length) {
    console.log(question);
    resp.question = question; //+" "+user.lastName)
  } else {
    console.log("error");
  }

  topic = await topic.find({
    topicName: { $regex: ".*" + req.body.searchItem + ".*" }
  });
  console.log("topicDONE");
  if (!!topic && topic.length) {
    resp.topic = topic; //+" "+user.lastName)
  } else {
    console.log("error");
  }
  console.log("All DOne");
  res.status(200).json(resp);

  // userDetails
  //   .find({ firstName: { $regex: ".*" + req.body.searchItem + ".*" } })
  //   .then(user => {
  //     user.map(user => {
  //       resp.profile.push(user); //+" "+user.lastName)
  //       console.log("inisde user details find ", resp);
  //     });
  //   })
});

module.exports = router;
