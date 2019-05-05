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

  console.log("Req Body : ", req.body.searchItem);

  let resp = {
    profile: [],
    question: [],
    topics: []
  };

  userDetails
    .find({ firstName: { $regex: ".*" + req.body.searchItem + ".*" } })
    .then(user => {
      user.map(user => {
        resp.profile.push(user); //+" "+user.lastName)
        question
          .find({ question: { $regex: ".*" + req.body.searchItem + ".*" } })
          .then(question => {
            question.map(question => {
              resp.question.push(question);
            });
            topic
              .find({
                topicName: { $regex: ".*" + req.body.searchItem + ".*" }
              })
              .then(topic => {
                topic.map(topic => {
                  resp.topics.push(topic);
                });
                res.status(200).json({ Search: resp });
                console.log(resp);
                console.log("this is response after question", resp);
              });
          });
      });
    });
});

module.exports = router;
