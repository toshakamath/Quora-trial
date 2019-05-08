//var Model = require('../DataBaseConnection');
var bcrypt = require('bcrypt-nodejs');
var mongooseTypes = require('mongoose').Types;
var mysql = require('mysql'); 
const connection = require("../connection");


var logincheck = [
    {"finalstatus" : false, "facultyfnd" : false, "pwdvalidity" : false}
  ]

function handle_request(message, callback){
    console.log('Inside Kafka Backend Login/SignIn');
    console.log('Message: ', message);

// this process will avoid SQL injection attack
let sql = "SELECT emailid,password FROM userDetails WHERE emailid = ?";

connection.query(sql,message.emailid, function (error, results, fields) {
  
  if (error || results == null || results.length<1){
    console.log(error);
    //res.value = "The email and password you entered did not match our records. Please try again.";
    //console.log(results.value);
    callback(null, results);
  }
  else{
    if(bcrypt.compareSync(message.password, results[0].password))
    {              
      console.log("Valid Credentials");    
     // res.code = "200";
      //res.value = results;
      console.log("login result", results);
      callback(null, results);         
  }
  else{
      console.log("InValid Credentials");
     // res.code = "400";
      callback(null, results);
     }
    }
  }); 
}

exports.handle_request = handle_request;