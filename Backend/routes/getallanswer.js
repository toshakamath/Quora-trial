var express = require('express');
var router = express.Router();
var passport = require('passport');
var requireAuth = passport.authenticate('jwt', {session: false});
var Answer = require("../../Kafka-Backend/Models/answersdetail");


router.get("/", (req, res) => {
    console.log("get call");
    Answer.find()
    .populate()
      .then(question => {
        console.log(question);
        res.json(question);
      });
  });


module.exports = router;