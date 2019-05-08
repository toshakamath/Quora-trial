var express = require("express");
var router = express.Router();
var passport = require("passport");
var requireAuth = passport.authenticate("jwt", { session: false });
const mongoose = require("mongoose");
var Question = require("../../Kafka-Backend/Models/questionsdetail");
var userDetails = require("../../Kafka-Backend/Models/userDetails");
var Answers = require("../../Kafka-Backend/Models/answersdetail");

/*  GET one question with all its answers */
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

            let answerTemp = JSON.parse(JSON.stringify(answerResult));
            let userarray = [];
            let userInfo = null;

            // for (i = 0; i < answerResult.length; i++) {
            //   console.log("USER ID", answerResult[i].answerOwner);
            //   userDetails.findById(
            //     { _id: answerResult[i].answerOwner },
            //     (err2, userInfo) => {
            //       console.log("USERIFNO", userInfo);
            //       if (err2) {
            //         console.log("ERROR", err2);
            //       } else {
            //         if (!!userInfo) {
            //           answerTemp[i].username = userInfo.firstName;
            //           userarray.push(answerTemp[i]);
            //         } else {
            //           userarray.push(answerTemp[i]);
            //         }
            //       }
            //       // answerTemp[i].username = userInfo.firstName;
            //     }
            //   );
            // }
            // console.log("FIANL DATA", answerResult);

            let returnObj = {
              questionDetails: questionResult,
              answerDetails: answerResult
            };

            console.log("final object", returnObj);
            res.status(200).send(returnObj);
          }

          // Answers.findOne({_id: answerResult})

          //Laxmikant's changes to increase visitor count check how to increase a count
          const booked = {};
          console.log("Visitor");
          console.log(questionResult.visitor);
          const abc = questionResult.visitor + 1;
          console.log(abc);

          booked.visitor = abc;
          console.log(booked);
          Question.findOneAndUpdate(
            { _id: req.query.questionId },
            { $set: booked },
            { new: true }
          ).then(answer => {
            console.log("Increases successfully successfully");
            console.log(answer);
          });
        }
      );
    }
  });
});

module.exports = router;