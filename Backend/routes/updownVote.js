var express = require("express");
var router = express.Router();
var passport = require("passport");
var requireAuth = passport.authenticate("jwt", { session: false });
var answerdetails = require("../../Kafka-Backend/Models/answersdetail");
var userDetails = require("../../Kafka-Backend/Models/userDetails");
ObjectId = require("mongodb").ObjectID;

router.post("/", function(req, res) {
  console.log("Inside question Post Request");

  console.log("Req Body : ", req.body);

  let user_id = "";
  //var userCollection = dbase.collection("counters");
  answerdetails.findOne({ _id: req.body.answerid }).then(answer => {
    if (answer) {
      console.log(answer);

      var votes = {};

      if (req.body.upVote) votes.upVote = answer.upVote;
      if (req.body.downVote) votes.downVote = answer.downVote;

      console.log("Answerid");
      console.log(votes);

      userDetails.findOne({ email: req.body.email }, (err2, userResult) => {
        if (err2) {
          console.log("Unable to find user");
          res.json({ message: "Unable to find user" });
        } else {
          user_id = userResult._id;
          console.log("Entered inside user details ", user_id);
          if (votes.upVote) {
            votes.upVote.push(user_id);
          }

          if (votes.downVote) {
            votes.downVote.push(user_id);
          }
          console.log("Entered inside votes ", votes);

          answerdetails
            .findOneAndUpdate(
              { _id: req.body.answerid },
              // { $set: { upVote: answer.upVote + req.user.id } },
              { $set: votes },
              { new: true }
            )
            .then(answer => {
              console.log("this i answer ", answer.upVote.length);
              res.status(200).json({
                message: "UpVote/DownVote did successfully",
                upVoteCount: answer.upVote.length,
                downVoteCount : answer.downVote.lenght
              });
            });
        }
      });
    } else {
      res.status(404).json({ message: "error in updating upVote/DownVote:" });
    }
  });
});

router.get("/", requireAuth, function(req, res) {
  console.log("Inside question Get Request");

  console.log("Req Body : ", req.query);

  answerdetails.findOne({ _id: req.query.answerid }).then(answer => {
    if (answer) {
      console.log(answer);
      console.log(answer.upVote.length);
      res.status(200).json({
        message: "UpVote and DownVote Count",
        upVote: answer.upVote.length,
        downVote: answer.downVote.length
      });
      console.log("Answerid");
    }
  });
});

module.exports = router;
