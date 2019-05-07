var express = require("express");
var router = express.Router();
var passport = require("passport");
var requireAuth = passport.authenticate("jwt", { session: false });
const mongoose = require("mongoose");
var Question = require("../../Kafka-Backend/Models/questionsdetail");


router.post("/", requireAuth, function (req, res) {
  console.log("Inside question post Request");

  console.log("Req Body : ", req.body);
  // const d = new Date().toISOString().slice(0, 10);

  //search whether a question alread exists
  Question.findOne({ question: req.body.question })
    .then(question => {
      if (question) {
        res.status(400).json("we have found a similar question");
      } else {
        var question = new Question({
          _id: new mongoose.Types.ObjectId(),
          question: req.body.newquestion,
          questionlink: req.body.questionlink,
          isAnonymous: req.body.isAnonymous,
          user: req.user.id,
          topic: req.body.topicsSelected,
          postDate: new Date()
        });
        console.log(question);

        //add a new question if not already exists
        question
          .save()
          .then(question => {
            res.status(200).json({ message: "Question posted successfully" });
            console.log("Saved Question:" + question);
          })
          .catch(err => {
            res
              .status(404)
              .json({ message: "error in creating question:" + err });
            console.log(err);
          });
      }
    })
    .catch(err => {
      res.status(404).json({ message: "error while creating a question" });
    });
});

// router.get("/", requireAuth, (req, res) => {
//   console.log(req.user.id);
//   Question.find({ user: req.user.id }).then(question => {
//     console.log(question);
//   });
// });

router.get("/", (req, res) => {
  console.log();
  Question.find()
    .populate("answers", ["answer", "upVote", "answerDate", "answerOwner"])
    //.populate({ path: 'answers', populate: { path: 'answers.answerOwner', select: 'email' } })
    //select: "answer upVote answerDate answerOwner" })
    // .populate('answerOwner', ["email"])
    .then(question => {
      console.log(question);
      res.json(question);
    });
});



module.exports = router;


router.get("/content", (req, res) => {
  console.log("Inside Get-content questions");

  var params = {};

  if (req.query.userid) {
    let user = req.query.userid;
    params.user = mongoose.Types.ObjectId(user);
  }

  Question.find(params)
    .then(questions => {
      console.log("success Get-content questions")

      res.json(questions);
    })
    .catch(err => {
      console.log("Error while fetching content questions", err);
    }
    )
}
);



//Laxmikant question post query

// Question.findOne(
//   {
//     question: req.body.question
//   },
//   (err, user) => {
//     if (err) {
//       console.log("Unable to fetch Question details.", err);
//       res.end(JSON.stringify(user));
//     }

//     if (user) {
//       res.value = "The question is already present in database.";
//       res.end(JSON.stringify(res.value));
//     } else {
//       req.body.question = "abc";
//       req.body.questionOwner = "Lucky";
//       req.body.topic = "topic";
//       req.body.postDate = "2019/12/12";

//       var user = new Model({
//         _id: new mongoose.Types.ObjectId(),
//         question: req.body.question,
//         questionOwner: req.user.id,
//         topic: req.body.topic,
//         postDate: Date.now()
//       });

//       user.save().then(
//         doc => {
//           console.log("Question saved successfully.", doc);
//           res.value = "Question saved successfully.";
//           res.end(JSON.stringify(res.value));
//         },
//         err => {
//           console.log("Unable to save Question details.", err);
//           res.value = "Unable to save Question details.";
//           res.end(JSON.stringify(res.value));
//         }
//       );
//     }
//   }
// );
