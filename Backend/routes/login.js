//Signup.js - Signup route module
var express = require("express");
var router = express.Router();
const mysql = require("mysql");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const connection = require("../../Kafka-Backend/connection");
var User = require("../../Kafka-Backend/Models/userDetails");

//Kafka
//var kafka = require('../kafka/client');

router.post("/", (req, res) => {
  console.log("Inside Login Request");
  console.log("email:" + req.body.email);
  //assigning email from body
  const email = req.body.email;
  const password = req.body.password;
  //mysql check
  connection.query(
    "SELECT * FROM userDetails WHERE emailid = ?",
    [email],
    function(error, results, fields) {
      if (error) {
        console.log(error);
        res.json({
          status: false,
          message: "there are some error with query:" + error
        });
      } else {
        if (results.length > 0) {
          console.log("user found");
          bcrypt.compare(password, results[0].password, function(err, ress) {
            if (!ress) {
              res.json({
                status: false,
                message: "Email and password does not match:" + err
              });
            } else {
              User.findOne({ email: req.body.email })
                .then(user => {
                  //initialize the payload for tokenn
                  console.log("mongo user" + user);
                  const payload = {
                    id: user.id,
                    email: user.email,
                    name: user.firstName,
                    profileImage: user.profileImage
                  };
                  //Sign the token with payload
                  jwt.sign(
                    payload,
                    "secret",
                    { expiresIn: "1h" },
                    (err, token) => {
                      res.json({
                        token: "Bearer " + token
                      });
                      console.log("Bearer " + token);
                    }
                  );
                })
                .catch(err => {
                  console.log("error in mongo user find:" + err);
                });
            }
          });
        } else {
          res.json({
            status: false,
            message: "Email does not exits"
          });
        }
      }
    }
  );
});

//Laxmi's Login with kafka

///Users/sachinwaghmode/Desktop/Quora-Team/Kafka-Backend/connection.js

//Route to handle Post Request Call
// router.post("/", function(req, res) {
//   console.log("Inside Login Post Request");
//   console.log("Req Body : ", req.body);

//   kafka.make_request('login', req.body, function(err, result){

//     console.log('In results Signup');
//     console.log('Results: ', result);

//     if(err){
//       console.log('Unable to Login to the System.', err.message);
//       res.writeHead(400, {
//           'Content-type': 'text/plain'
//       });
//       res.end('Error in Login the application');
//     }
//     else{
//       console.log('logged in successfully.', result);
//       res.writeHead(200,{
//           'Content-type' : 'application/json'
//       });

//       const payload = {
//         id: result
//       };
//       //Sign the token with payload
//                   jwt.sign(
//                     payload,
//                     "secret",
//                     { expiresIn: "1h" },
//                     (err, token) => {
//                       res.json({
//                         token: "Bearer " + token
//                       });
//                       console.log("Bearer " + token);
//                     }
//                   );

//       // var token = jwt.sign({sjsuid:result.sjsuid}, secret, {
//       //   expiresIn: 10080 // in seconds
//       // });
//      // console.log(token);

//       // var data = {
//       //   result : result,
//       //   Token : token
//       // }

//       res.end(JSON.stringify(result));
//     }

//     if(err){
//         console.log("Unable to fetch user details. Error in Signup.", err);
//         res.writeHead(400, {
//             'Content-type': 'text/plain'
//         });
//         res.end('Error in fetching user details!');
//     }
//   });

// let sql = "SELECT emailid,password FROM userDetails WHERE emailid = ?";

// console.log(req.body.email);

// connection.query(sql, req.body.email, function(error, results, fields) {

//   if (error || results == null || results.length < 1) {
//     console.log(error);
//     res.value =
//       "The email and password you entered did not match our records. Please try again.";
//     console.log(res.value);

//   } else {
//     if (bcrypt.compareSync(req.body.password, results[0].password)) {
//       console.log("Valid Credentials");
//       res.code = "200";
//       res.value = results;
//       console.log("login result", results);

//       email = req.body.email;
//       //Find user Query
//       console.log("trying mongo");
//       User.findOne({ email }).then(user => {
//         if (!user) {
//           return res.status(404).json({ email: "User not found" });
//         }

//         const payload = {
//           id: user.id
//         };
//         //sign Token
//         jwt.sign(payload, "secret", { expiresIn: "1h" }, (err, token) => {
//           res.json({
//             token: "Bearer " + token
//           });
//           console.log("Bearer " + token);
//         });
//       });

//res.status(200).json(doc);
//  callback(null, res);
//     } else {
//       console.log("InValid Credentials");
//       res.code = "400";

//       //callback(null, res);
//     }
//   }
// });
//});

module.exports = router;
