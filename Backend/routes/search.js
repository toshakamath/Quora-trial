var express = require("express");
var router = express.Router();
var passport = require("passport");
var requireAuth = passport.authenticate("jwt", { session: false });
var userDetails = require("../../Kafka-Backend/Models/userDetails");
var question = require("../../Kafka-Backend/Models/questionsdetail");
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

  await userDetails.find(
    { firstName: { $regex: ".*" + req.body.searchItem + ".*" } },
    (err1, profileResult) => {
      if (err1) {
        console.log("Error 1", err1);
        res.status(400).json({ message: "No userDetails with such keyword" });
      } else {
        console.log("User Done ");
        console.log("User ", profileResult);
        resp.profile = profileResult;
      }
    }
  );

  await topic.find(
    { topicName: { $regex: ".*" + req.body.searchItem + ".*" } },
    (err2, topicResult) => {
      if (err2) {
        console.log("Error2", err2);
        res.status(400).json({ message: "No topics with such keyword" });
      } else {
        console.log("topic Done ");
        console.log("Result 2 ", topicResult);
        resp.topics = topicResult;
      }
    }
  );

  await question.find(
    { question: { $regex: ".*" + req.body.searchItem + ".*" } },
    (err3, questionResult) => {
      if (err3) {
        console.log("Error2", err3);
        res.status(400).json({ message: "No questions with such keyword" });
      } else {
        console.log("question Done ");
        console.log("Result 3 ", questionResult);
        resp.question = questionResult;
      }
    }
  );

  res.status(200).json(resp);
});

module.exports = router;
