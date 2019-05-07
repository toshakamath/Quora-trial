var express = require('express');
var router = express.Router();
var passport = require('passport');
var requireAuth = passport.authenticate('jwt', {session: false});
var answerdetails = require('../../Kafka-Backend/Models/answersdetail');
ObjectId = require('mongodb').ObjectID;
var questionsDetail = require('../../Kafka-Backend/Models/questionsdetail');

router.post('/', requireAuth, function(req,res){

console.log("Inside follower post Request");

console.log("Req Body : ",req.body.questionid);

//var userCollection = dbase.collection("counters");
questionsDetail.findOne({ _id: req.body.questionid }).then(question => {

      if (question) {
          console.log(question);
          
          // if(question.followers.inclueds)
          var votes = {} 

          votes.followers = question.followers;

          console.log("Answerid");

          if(votes.followers)
          {
             console.log("added")
             votes.followers.push((req.user.id))
          }

          const booked = {
            followers : votes.followers
          }

        // Update
        questionsDetail
          .findOneAndUpdate(
            { _id: req.body.questionid  },
           { $set: booked},
            { new: true }
          )
          .then(answer => {
            res.status(200).json({ message: "Followers added successfully" });
          });
      } else {
        res
        .status(404)
        .json({ message: "error in adding followers:" + err });
      }
  });
});

module.exports = router;