//import the require dependencies
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const passport = require("passport");
const port = process.env.PORT || 3001;
// app.use(bodyParser.json());
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.raw({limit: "50mb"}));

app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
//import Routes
const login = require("./routes/login");
const signup = require("./routes/signup");
const profile = require("./routes/profile");
const question = require("./routes/question");
const getonequestion = require("./routes/getonequestion");
const answer = require("./routes/answer");
const topic = require("./routes/topic");
const message = require("./routes/message");
const content = require("./routes/content");
const ROOT_URL2 = "http://localhost:3000";
const search = require("./routes/search");
const getallanswer = require("./routes/getallanswer");
const bookmark = require("./routes/bookmark");
const updownVote = require("./routes/updownVote");
const comment = require("./routes/comment");

const fs = require("fs");
var glob = require("glob");

const multer = require("multer");
const path = require("path");

app.set("view engine", "ejs");
app.use(cors({ origin: `${ROOT_URL2}`, credentials: true }));
app.use("/uploads", express.static("uploads"));
//use cors to allow cross origin resource sharing
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", `${ROOT_URL2}`); //A response that tells the browser to allow requesting code from the origin http://localhost:3000 to access a resource
  res.setHeader("Access-Control-Allow-Credentials", "true"); //to allow cookies
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

//Allow Access Control
require("./config/passport")(passport);

app.use(passport.initialize());

// app.use("/inbox/peopledetails", message.getPeopleDetails);
// app.use("/inbox/sendmessage", message.sendMessage);
// app.use("/inbox/displaymessages", message.displayMessages);
// app.use("/inbox/reply", message.replyMessages);

app.use(express.static(__dirname + "/public"));
//Storing documents/Images
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   }
// });

// const upload = multer({ storage });

// //app.post("/uploadprofile", upload.array("photos", 5), (req, res) => {
//   if (req.session.user) {
//     console.log("working on profiles");
//     console.log("req.body", req.body);
//     res.end();
//   }
// });

//use Routes
app.use("/inbox", message);
app.use("/login", login);
app.use("/signup", signup);
app.use("/topic", topic);
app.use("/profile", profile);
app.use("/question", question);
app.use("/getonequestion", getonequestion);
app.use("/search", search);
app.use("/answer", answer);
app.use("/content", content);
app.use("/getallanswer", getallanswer);
app.use("/bookmark", bookmark);
app.use("/updownVote", updownVote);
app.use("/comment", comment);

// app.use("/all", profile1);
//start your server on posrt 3001
//app.settings.env = "production";
// console.log("env mode", app.settings.env);
app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
