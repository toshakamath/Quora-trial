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
        Profile.findOne({ user: message._id })
          .then(profile => {  
            console.log("There is no profile for this user");
            if (!profile) {
              errors.noprofile = "There is no profile for this user";
              console.log("There is no profile for this user");
             // return res.status(404).json(errors);
              callback(null, null);
            }
            else{
              //res.status(200).json(profile);
              console.log("User Found");
              callback(null, res);
        }
    }).catch(err=>console.log("user err"+err)) 
}

exports.handle_request = handle_request;