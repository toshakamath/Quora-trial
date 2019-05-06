var express = require("express");
var router = express.Router();
var passport = require("passport");
var requireAuth = passport.authenticate("jwt", { session: false });
const mongoose = require("mongoose");
var Question = require("../../Kafka-Backend/Models/questionsDetail");
var Answers = require("../../Kafka-Backend/Models/answer");

/***  GET one question with all its answers ***/
router.get("/", (req, res) => {
  Question.findById(req.query.questionId, (err, questionResult) => {
    if (err) {
      console.log("there was an error in fetching one question", err);
      res.status(400);
    } else {
      console.log("Successfully found one question", questionResult.answers);
      Answers.find(
        { _id: { $in: questionResult.answers } },
        (err2, answerResult) => {
          if (err2) {
            console.log("Error in finding all answers ", err2);
            res.status(404);
          } else {
            console.log("Successfully found the answers ", answerResult);
            let returnObj = {
              questionDetails: questionResult,
              answerDetails: answerResult
            };
            console.log("final object", returnObj);
            res.status(200).send(returnObj);
          }
        }
      );
    }
  });
});

module.exports = router;
