var express = require('express');
var router = express.Router();
var passport = require('passport');
var requireAuth = passport.authenticate('jwt', {session: false});
var Model = require('../../Kafka-Backend/Models/questionsdetail');

router.get('/', requireAuth, function (req, res) {

  console.log("Inside question Get Request");
  console.log("Req Body : ", req.body);

  Model.find({
    'topic': req.body.topic
  })
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.staus(400).json(err);
    });
});

module.exports = router;