//var Model = require('../DataBaseConnection');
var bcrypt = require('bcrypt-nodejs');
var mongooseTypes = require('mongoose').Types;
var mysql = require('mysql'); 
var connection = require("../../Kafka-Backend/connection");
var User = require("../../Kafka-Backend/Models/userDetails");
const jwt = require("jsonwebtoken");


var logincheck = [
    {"finalstatus" : false, "facultyfnd" : false, "pwdvalidity" : false}
  ]

function handle_request(message, callback){

    console.log('Inside Kafka Backend Login/SignIn');
    console.log('Message: ', message);


  const email = message.email;
  const password = message.password;
  console.log(message.email)
  //mysql check
  connection.query(
    "SELECT * FROM userDetails WHERE emailid = ?",
    [email],
    function(error, results, fields) {

      console.log(results)
      console.log(error)
      if (error) {
        console.log(error);

        callback(null, null);   
      } else {
        if (results.length > 0) {
          console.log("user found");
          bcrypt.compare(password, results[0].password, function(err, ress) {
            if (!ress) {
              callback(null, null);  

            } 
            else {
              User.findOne({ email: message.email })
                .then(user => {
                  //initialize the payload for tokenn
                  console.log("mongo user" + user);
                  const payload = {
                    id: user.id,
                    email: user.email,
                    name: user.firstName + user.lastName,
                    profileImage: user.profileImaget
                  };
              //    Sign the token with payload
                  jwt.sign(
                    payload,
                    "secret",
                    { expiresIn: "1h" },
                    (err, token) => {
                      console.log("Bearer " + token);
                      callback(null, token);  

                    }
                  );
                })
                .catch(err => {
                  console.log("error in mongo user find:" + err);
                });
            }
          });
        } else {
          callback(null, null);  
        }
      }
    }
  );




// let sql = "SELECT * FROM userDetails WHERE emailid = ?";

// connection.query(sql,message.emailid, function (error, results, fields) {
  
//   if (error || results == null || results.length < 1){
//     console.log(error);
//     callback(null, results);
//   }
//   else{
//     if(bcrypt.compareSync(message.password, results[0].password))
//     {              
//       console.log("Valid Credentials");    
//       console.log("login result", results);
//       callback(null, results);         
//   }
//   else{
//       console.log("InValid Credentials");
//       callback(null, results);
//      }
//     }
//   }); 
}

exports.handle_request = handle_request;