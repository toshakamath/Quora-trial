var express = require("express");
var router = express.Router();
var passport = require("passport");
var requireAuth = passport.authenticate("jwt", { session: false });
var userDetails = require("../../Kafka-Backend/Models/userDetails");
var question = require("../../Kafka-Backend/Models/questionsDetail");
var topic = require("../../Kafka-Backend/Models/topic");
ObjectId = require("mongodb").ObjectID;

router.post("/", function(req, res) {
  console.log("Inside search Get Request", req.body);

  console.log("Req Body : ", req.body.search);

  let resp = [];

  userDetails
    .find({ firstName: { $regex: ".*" + req.body.search + ".*" } })
    .then(user => {
      user.map(user => {
        resp.push(user.firstName); //+" "+user.lastName)
      });

      question
        .find({ question: { $regex: ".*" + req.body.search + ".*" } })
        .then(question => {
          question.map(question => {
            resp.push(question.question);
          });
        });

      console.log("this is response after question", resp);

      topic
        .find({ topicName: { $regex: ".*" + req.body.search + ".*" } })
        .then(topic => {
          console.log(topic);

          // console.log(topic.topicName);
          topic.map(topic => {
            console.log(topic.topicName);

            resp.push(topic.topicName);
          });
          res.status(200).json({ Search: resp });
          console.log(resp);
        });
    });
});

module.exports = router;
