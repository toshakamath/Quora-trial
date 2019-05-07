var express = require('express');
var router = express.Router();
var passport = require('passport');
var requireAuth = passport.authenticate('jwt', {session: false});
var answerdetails = require('../../Kafka-Backend/Models/answerdetails');
ObjectId = require('mongodb').ObjectID;

router.post('/', requireAuth, function(req,res){

console.log("Inside Bookmark post Request");

console.log("Req Body : ",req.body);

answerdetails.findOne({ _id: req.body.answerid }).then(answer => {

      if (answer) {
          var votes = {} 

          if(req.body.answerid) votes.bookmark = answer.bookMark;

          if(votes.bookmark)
          {
             votes.bookmark.push((req.user.id))
          }

          const booked = {
            bookMark : votes.bookmark
          }

        answerdetails
          .findOneAndUpdate(
            { _id: req.body.answerid  },
           { $set: booked},
            { new: true }
          )
          .then(answer => {
            res.status(200).json({ message: "Bookmarked successfully" });
          });
      } else {
        res
        .status(404)
        .json({ message: "error in Bookmark:" + err });
      }
  });
});

router.get('/', requireAuth, function(req,res){

  console.log("Inside Bookmark post Request");
  
  console.log("Req Body : ",req.body);
  
  
  answerdetails.findOne({ _id: req.query.answerid }).then(answer => {
  
    if (answer) {

        console.log(answer);
        console.log(answer.bookMark.length);
        res.status(200).json({ message: "BookMark Count",bookMark: answer.bookMark.length});
        console.log("Answerid");
        
     }
 }); 

  });

module.exports = router;