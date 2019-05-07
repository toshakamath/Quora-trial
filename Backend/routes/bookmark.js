var express = require('express');
var router = express.Router();
var passport = require('passport');
var requireAuth = passport.authenticate('jwt', { session: false });
var answerdetails = require('../../Kafka-Backend/Models/answersdetail');
ObjectId = require('mongodb').ObjectID;

router.post('/', requireAuth, function (req, res) {

    console.log("Inside Bookmark post Request");
    console.log("Req Body : ", req.body);

    answerdetails.findOne({ _id: req.body.answerid }).then(answer => {
        // Req Body :  { bookmarked: false, answerid: '5cd13320caefe969946763d8' }
        // console.log( );
        if (answer) {
            var votes = {}

            if (req.body.answerid){
                console.log( "inside first if")
             votes.bookmarked = answer.bookmarked;
            }
            // if (votes.bookmarked) {
            //     votes.bookmarked.push((req.user.id))
            // }

            if (!req.body.bookmarked) {
                console.log( "inside if loop")
                var index = votes.bookmarked.indexOf(req.user.id);
                if (index !== -1) votes.bookmarked.splice(index, 1);
            }
            else {
                console.log("inside else loop" )
                votes.bookmarked.push((req.user.id))
            }

            const updates = {
                bookmarked: votes.bookmarked
            }
            console.log( "UPDATES", updates)
            answerdetails
                .findOneAndUpdate(
                    { _id: req.body.answerid },
                    { $set: updates },
                    { new: true }
                )
                .then(answer => {
                    res.status(200).json({ message: "Bookmarked updated successfully" });
                });
        } else {
            res
                .status(404)
                .json({ message: "error in Bookmark:" + err });
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

router.get('/getbookmarked', requireAuth, function (req, res) {
    console.log("bookmark req query: ",req.query);
    console.log("bookmark req user id: ",req.user.id);
    answerdetails.findOne({
        bookmarked:{
              $in: [req.user.id]
        }   
        })
        .populate("question", ["question", "postDate"])
        .then(answers => {
            if (answers) {
                console.log(answers);
                res.status(200).json({message: "Got bookmarks from backend", answers: answers});
            }
        });

});

router.get('/', requireAuth, function (req, res) {

    console.log("Inside Bookmark post Request");
    console.log("Req Body : ", req.body);

    answerdetails.findOne({ _id: req.query.answerid }).then(answer => {

        if (answer) {

            console.log(answer);
            console.log(answer.bookmarked.length);
            res.status(200).json({ message: "BookMark Count", bookmarked: answer.bookmarked.length });
            console.log("Answerid");

        }
    });

});

module.exports = router;