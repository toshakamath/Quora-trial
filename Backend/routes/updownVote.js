var express = require('express');
var router = express.Router();
var passport = require('passport');
var requireAuth = passport.authenticate('jwt', {session: false});
var answerdetails = require('../../Kafka-Backend/Models/answerdetails');
ObjectId = require('mongodb').ObjectID;

router.post('/', requireAuth, function(req,res){

console.log("Inside question Post Request");

console.log("Req Body : ",req.body.answerid);

//var userCollection = dbase.collection("counters");
answerdetails.findOne({ _id: req.body.answerid }).then(answer => {

      if (answer) {
          console.log(answer);

          var votes = {} 

          if(req.body.upVote) votes.upVote = answer.upVote;
          if(req.body.downVote) votes.downVote = answer.downVote;

          console.log("Answerid");
          console.log(votes);

          if(votes.upVote)
          {
             votes.upVote.push(ObjectId(req.user.id))
          }

          if(votes.downVote)
          {
             votes.downVote.push(ObjectId(req.user.id))
          }

        // Update
        answerdetails
          .findOneAndUpdate(
            { _id: req.body.answerid  },
           { $set: votes},
            { new: true }
          )
          .then(answer => {
            res.status(200).json({ message: "UpVote/DownVote did successfully" });
          });
      } else {
        res
        .status(404)
        .json({ message: "error in updating upVote/DownVote:" + err });
      }
  });
});

router.get('/', requireAuth, function(req,res){

  console.log("Inside question Get Request");
  
  console.log("Req Body : ", req.query);
  
  answerdetails.findOne({ _id: req.query.answerid }).then(answer => {
  
        if (answer) {

            console.log(answer);
            console.log(answer.upVote.length);
            res.status(200).json({ message: "UpVote and DownVote Count",upVote: answer.upVote.length, downVote: answer.downVote.length });
            console.log("Answerid");
            
         }
     }); 

     
  });

module.exports = router;