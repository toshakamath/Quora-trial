var express = require('express');
var router = express.Router();
var passport = require('passport');
var requireAuth = passport.authenticate('jwt', {session: false});
var Model = require('../../Kafka-Backend/Models/answersdetail');


//added post method as of now as I am getting call from postman. please chnage itto GET
router.get('/', function(req,res){

  console.log("Inside question Get Request");

  console.log("Req Body : ",req.body);
  request = "abc";
  console.log(request);
Model.find({
    'answer': request
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