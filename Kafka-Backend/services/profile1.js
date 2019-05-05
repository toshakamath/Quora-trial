var mongooseTypes = require('mongoose').Types;
const mongoose = require("mongoose");
ObjectId = require('mongodb').ObjectID;

//load credential model
const Profile = require("../Models/credentials");

//laod userDetails model
const User = require("../../Kafka-Backend/Models/userDetails");

function handle_request(message, callback){
    console.log('Inside Kafka Backend Profile');
    console.log('Message: ', message);

        const errors = {};

  Profile.find()
    .populate("user", ["firstName,lastName,email"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "There are no profiles";
       // return res.status(404).json(errors);
        callback(null, null);
      }
    //  res.json(profiles);
      callback(null, profiles);

}).catch(err=>console.log("user err"+err)) 
}

exports.handle_request = handle_request;