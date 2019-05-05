const mysql = require("mysql");
const mongoose = require("mongoose");

//My SQl create connection
const db = mysql.createConnection({
  host: "quora273instance.ckkymcjvc8eq.us-east-2.rds.amazonaws.com",
  port: 3306,
  user: "quoraadmin",
  password: "quora273",
  database: "quora273db"
});

// MYSQL connect to database
db.connect(function(err) {
  if (!err) {
    console.log("MySQL connected ... ");
  } else {
    console.log("Error connecting MySQl ... ", err);
  }
});

// Mongo db Connection
mongoose
  .connect(
    "mongodb+srv://canvas:canvas@cluster0-llr4m.mongodb.net/Quora?retryWrites=true",
    { useNewUrlParser: true }
  )
  .then(() => console.log("Mongo connected"))
  .catch(err => console.log("error in Mongo connection:" + err));

//export My Sql Connection
module.exports = db;

//Older mongo connection string from Laxmikant
// mongoose
//   .connect(
//     "mongodb+srv://canvas:canvas@cluster0-llr4m.mongodb.net/Quora?retryWrites=true",
//     { useNewUrlParser: true }
//   )
//   .then(() => console.log("Mongo COnnected"))
//   .catch(err => console.log(err));
