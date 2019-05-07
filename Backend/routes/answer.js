var express = require("express");
var router = express.Router();
var passport = require("passport");
var requireAuth = passport.authenticate("jwt", { session: false });
const mongoose = require("mongoose");
var Answer = require("../../Kafka-Backend/Models/answer");
var Question = require("../../Kafka-Backend/Models/questionsDetail");

router.get("/", (req, res) => {
  const errors = {};
  console.log(req.query);

  console.log("fields ans", answersFields);

  Answer.find(answersFields)

    .then(answers => {
      if (!answers) {
        errors.noprofile = "There is no answers present for this search";
        res.status(404).json(errors);
      } else {
        console.log("answers", answers);
        res.json(answers);
      }
    })
    .catch(err => res.status(404).json(err));
});

router.post("/", requireAuth, function (req, res) {
  console.log("Inside answer Post Request");
  //if (req.session.user) {
  console.log("Inside answer Post Request");
  console.log("Req Body : ", req.body);

  console.log(req.body.question);
  // req.body.question = "abc";

  // req.body.question = "abc";
  req.body.questionOwner = "Lucky";
  req.body.isAnonymous = true;
  req.body.topic = "abc";
  // req.body.question = "5cbf8898e35ac3ef9251d64b";

  var user = new Answer({
    _id: new mongoose.Types.ObjectId(),
    answer: req.body.editorHtml,
    answerOwner: req.user.id,
    question: req.body.question,
    upVote: "5cbf8764ad4cd7eed70e105d",
    isAnonymous: req.body.isAnonymous,
    answerDate: Date.now()
  });

  console.log("answer details", user);
  user.save().then(
    doc => {
      console.log("Answer saved successfully.", doc);
      res.value = "Answer saved successfully.";
      // res.end(JSON.stringify(res.value));
      Question.findOne({ _id: req.body.question }).then(question => {
        question.answers.unshift(doc._id)
        question.save().then(question => res.status(200).json({ message: "success" }))
      })
    },
    err => {
      console.log("Unable to save Answer details.", err);
      res.value = "Unable to save Answer details.";
      res.end(JSON.stringify(res.value));
    }
  );
});

module.exports = router;
