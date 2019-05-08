var express = require("express");
var router = express.Router();
var passport = require("passport");
var requireAuth = passport.authenticate("jwt", { session: false });
const mongoose = require("mongoose");
var Answer = require("../../Kafka-Backend/Models/answersdetail");
var Question = require("../../Kafka-Backend/Models/questionsdetail");

router.get("/", (req, res) => {
  const errors = {};
  console.log(req.query);
  //  const answersFields = {};

  //answersFields.answer = "abc";
  //answersFields._id = "5cbfb135f2a460f63f4fee8c";
  //answersFields.isAnnonymous = "true";

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
  Answer.findOne({ _id: req.body.answerid })
  .then(answer => {
    console.log("ANSWER: ", answer);
    if(answer)
    {
      console.log("In Edit ANswer");
      answer =  req.body.answer;
      Answer
      .findOneAndUpdate({
         _id: req.body.answerid 
        },
        { 
          $set: {
            answer: req.body.editorHtml,
            isAnonymous: req.body.isAnonymous
          }
        },
        { new: true }
      )
      .then(answer => {
        console.log("ANSWER: ", answer)
        res.status(200).json({ message: "Edited answer successfully", updatedAnswer: answer });
      });
    }
  else{
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
  }
 });
});

module.exports = router;
