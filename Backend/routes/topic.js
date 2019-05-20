var express = require("express");
var router = express.Router();
var passport = require("passport");
var requireAuth = passport.authenticate("jwt", { session: false });
const mongoose = require("mongoose");
var Model = require("../../Kafka-Backend/Models/userDetails");
var Topic = require("../../Kafka-Backend/Models/topic");

//post a new question from a user
router.post("/", function(req, res) {
  console.log("Inside topic Post Request");
  console.log("Req Body : ", req.body);
  Model.findOneAndUpdate(
    { _id: req.body.userId },
    { $set: { topics: req.body.topics } },
    { useFindAndModify: false, new: true },
    (err1, modelResult) => {
      if (err1) {
        console.log("Error in finding the user", err1);
        res.status(400).send({ message: "Error in Adding the interests" });
      } else {
        console.log(
          "Topics added to the userDetails Schema. Updated output",
          modelResult
        );
        res.status(200).json({ message: "Topics Added Successfully." });
      }
    }
  );
});

router.get("/", function(req, res) {
  console.log("Inside Topic Get Request", req.query.email);
  Model.findOne({ email: req.query.email }, "topics", (err1, result) => {
    if (err1) {
      console.log("Error in finding the user", err1);
      res.status(400).send({ message: "Error in Adding the interests" });
    } else {
      console.log(
        "Topics added to the userDetails Schema. Updated output",
        result
      );
      res.status(200).send(result);
    }
  });
});

// router.get("/all", function(req, res) {
//   console.log("Inside Topic Get Request", req);
//   Topic.find({}, "topics", (err1, result) => {
//     if (err1) {
//       console.log("Error in finding the user", err1);
//       res.status(400).send({ message: "Error in Adding the interests" });
//     } else {
//       console.log("Topics rendered: ",result);
//       res.status(200).send(result);
//     }
//   });
// });

router.get("/all", function(req, res) {
  console.log("Inside Topic Get Request", req);
  Topic.find({}).then(
    result => {
      console.log("Topics rendered: ", result);
      res.status(200).send(result);
    },
    err1 => {
      console.log("Error in finding the user", err1);
      res.status(400).send({ message: "Error in Adding the interests" });
    }
  );
});

module.exports = router;
