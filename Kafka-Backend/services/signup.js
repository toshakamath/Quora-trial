var Model = require("../../Kafka-Backend/Models/userDetails");
var bcrypt = require('bcrypt-nodejs');
var mongooseTypes = require('mongoose').Types;
var mysql = require('mysql'); 
const mongoose = require('mongoose');
var Schema = mongoose.Schema;//issue coming
var connection = require("../../Kafka-Backend/connection");

function handle_request(message, callback){

    console.log('Inside Kafka Backend Signup');
    console.log('Message: ', message);


// this process will avoid SQL injection attack
//message.emailid = "abc";
let sql = "SELECT emailid FROM userDetails WHERE emailid = ?";
connection.query(sql,message.email, function (error, results, fields) {

    console.log("results",results.length);

if (error){
    console.log(error);
}
else if(results.length > 0)
{
    console.log("User Already Exists");
    callback(null, null);
}
else{

    const hashedPassword = bcrypt.hashSync(message.password);
   //this will avoid SQL injection attack
   let sql = "INSERT INTO userDetails (emailid, password) VALUES  ? ";
   let inser_vals = [
        [message.email , hashedPassword]
   ];

   connection.query(sql, [inser_vals], function (error, results, fields) {
  
    if (error || results == null || results.length<1){
        console.log(error);
        res.value = "The User details entered are not valid";
        console.log(res.value);
        callback(null, res);
      }
      else{


        var user = new Model({
        _id: new mongoose.Types.ObjectId(),
        firstName: message.firstname,
        lastName: message.lastname,
        email: message.email,
        city: message.city,
        state: message.state,
        zipCode: message.zipCode,
        profileImage: message.profileImage,
        status: message.status
    });  

        
    user.save().then((doc) => {

        console.log("User saved successfully.", doc);
        callback(null, doc);
    
    }, (err) => {
        console.log("Unable to save user details.", err);
        callback(err, null);
    });

      }
    
       });
   }

});
       
}
  
exports.handle_request = handle_request;