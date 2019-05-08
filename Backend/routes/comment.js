var express = require("express");
var router = express.Router();
var passport = require("passport");
var requireAuth = passport.authenticate("jwt", { session: false });
var answerdetails = require("../../Kafka-Backend/Models/answersdetail");
var userDetails = require("../../Kafka-Backend/Models/userDetails");
ObjectId = require("mongodb").ObjectID;

router.post("/", function(req, res) {
  console.log("Inside Bookmark post Request");

  console.log("Req Body : ", req.body);

  answerdetails.findOne({ _id: req.body.answerid }).then(answer => {
    if (answer) {
      var votes = {};
      userDetails.findOne({ email: req.body.email }, (err2, userResult) => {
        if (err2) {
          console.log("Unable to find user");
          res.json({ message: "Unable to find user" });
        } else {
          votes.comment = req.body.comment;
          votes.userid = userResult._id;
          var tableComment = answer.comment;
          tableComment.push(votes);

          var commnt = {
            comment: []
          };

          commnt.comment = tableComment;
          // Update
          answerdetails
            .findOneAndUpdate(
              { _id: req.body.answerid },
              { $set: commnt },
              { useFindAndModify: false, new: true }
            )
            .then(answer => {
              res.status(200).json({
                message: "Bookmarked successfully",
                comments: answer.comment,
                user: userResult.firstName
              });
              console.log("FINAL ANSWER", answer);
            });
        }
      });
    } else {
      res.status(404).json({ message: "error in Bookmark:" + err });
    }
  });
});

router.get("/", function(req, res) {
  console.log("Inside Bookmark post Request");

  console.log("Req Body : ", req.query);

  answerdetails.findOne({ _id: req.query.answerid }).then(async answer => {
    if (answer) {
      console.log("COMMENTS ", answer.comment[0]);
      let comm = JSON.parse(JSON.stringify(answer.comment));
      //console.log("COMM", comm[0]);
      let _u = null;
      let userarray = [];
      const a = [];
      for (let i = 0; i < comm.length; i++) {
        //console.log("findsing user ", comm[i].userid);
        _u = await userDetails.findOne({
          _id: comm[i].userid
        });
        //console.log("found user ", _u);
        if (!!_u) {
          comm[i].username = _u.firstName;
          userarray.push(comm[i]);
        }
      }
      //console.log("COMM ", comm[0].username);
      console.log("USER", userarray);

      res.status(200).json({ message: "BookMark Count", comments: userarray });
    }
  });
});

module.exports = router;