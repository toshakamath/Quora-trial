const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const upload = require("./aws-config");

const singleUpload = upload.single("image");

//var kafka = require('../kafka/client');
//load credential model
const Profile = require("../../Kafka-Backend/Models/credentials");
//laod userDetails model
const User = require("../../Kafka-Backend/Models/userDetails");
//load validation
const validateProfileInput = require("../validation/profile");
const validateExperienceInput = require("../validation/experience");
const validateEducationInput = require("../validation/education");
var requireAuth = passport.authenticate("jwt", { session: false });
const fileUpdload = require("express-fileupload");
router.use(
  fileUpdload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: true,
    tempFileDir: `${__dirname}/../public/temp`,
    responseOnLimit: "File size limit has been reached"
  })
);

router.post("/profileImage", requireAuth, (req, res) => {
  let uploadFile = req.files.file;
  const fileName = req.files.file.name;
  console.log("filename:" + req.files.file.name);
  console.log(req.body.assignmentName);
  console.log("reqparams:" + req.params.id);
  console.log(fileName);
  console.log(uploadFile);
  uploadFile.mv(`${__dirname}/../public/files/${fileName}`, function(err) {
    if (err) {
      return res.status(500).send(err);
    }
    console.log("path:" + `${__dirname}/../public/files/${fileName}`);
  });

  profileFields = {};

  profileFields.profileImage = fileName;
  User.findOneAndUpdate(
    { _id: req.user.id },
    { $set: profileFields },
    { new: true }
  ).then(profile => res.json(profile));
});

//redis database
// const redis = require("redis");

// var cache = require('lru-cache')({
//   max : 100,                   // The maximum number of items allowed in the cache
//   max_age : 1000 * 60 * 60     // The maximum life of a cached item in milliseconds
// });

//autmtically connects localhost:6379
// const client = redis.createClient();
//file upload
// const fileUpdload = require("express-fileupload");

//edit name
router.post("/user", requireAuth, (req, res) => {
  console.log(req.body);
  const profileFields = {};
  if (req.body.firstname) profileFields.firstName = req.body.firstname;
  User.findOneAndUpdate(
    { _id: req.user.id },
    { $set: profileFields },
    { new: true }
  ).then(user => {
    console.log("new user:" + user.firstName);
    res.status(200).json(user);
  });
});

//get current user's profile

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // client.get(req.user.id, function (err, value) {

    //   if (err) {
    //     return console.log(err);
    //   }
    //   if (value) {
    //     console.log("Redis Cache has required value :", value);
    //     res.status(200).json(value);
    //   } else {

    const errors = {};
    console.log("USERID : :: : :  > > > ", req.user.id);
    Profile.findOne({ user: req.user.id })
      .populate("user")
      .populate("following")
      .populate("followers")
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.json({ message: "hello" });
        } else {
          console.log("I am coming here and lets try for REDIS now");
          console.log(req.user.id);
          console.log(profile);
          // client.set(req.user.id, JSON.stringify(profile), function(err) {
          //   if (err) callback(err);
          //   else {
          //     console.log("REDIS Set successful");
          //   }
          // });

          console.log("profile==", profile);
          res.status(200).json(profile);
        }
      })
      .catch(err => res.status(404).json(err));
    // };
  }
);
//@route  GET /profile/all
//@desc   get all profiles
//@access public (anyone can see this user profile)

router.get("/all", (req, res) => {
  const errors = {};

  Profile.find()
    .populate("user")
    .then(profiles => {
      if (!profiles) {
        //errors.noprofile = "There are no profiles";
        return res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: "There are no profiles" }));
});

//@route  GET /profile/handle/:handle
//@desc   get profile by handle
//@access public (anyone can see this user profile)

router.get("/handle/:handle", (req, res) => {
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["firstName", "lastName", "email"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

//@route  GET /profile/user/:user_id
//@desc   get profile by userId
//@access public (anyone can see this user profile)

router.get("/user/:user_id", (req, res) => {
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["firstName", "lastName", "email"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: "There is no profile for this user" })
    );
});

// client.get(req.user.id , function(err, value) {

//   if(err){
//     return console.log(err);
//   }

//   if(value)
//   {
//     console.log("Redis Cache has required value :", value);
//     res.status(200).json(value);
//   }
//   else
//   {
//     console.log('i am in req.body: ', req.user.id );

//     kafka.make_request('profile', req.user, function(err, result){

//     console.log('In results Signup');
//     console.log('Results: ', result);

//     if(err){
//       console.log('Unable to fetch User details from the System.', err.message);
//       res.writeHead(400, {
//           'Content-type': 'text/plain'
//       });
//       res.end('Error in profile detail fetch the application');
//     }
//     else{
//       console.log('profile fetched in successfully.', result);
//       res.writeHead(200,{
//           'Content-type' : 'application/json'
//       });

//       res.end(JSON.stringify(result));
//      }
//     });
//    }
//   });
// })

// router.get(
//   "/",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     const errors = {};
//     Profile.findOne({ user: req.user.id })
//       .then(profile => {
//         console.log(req.user.id );
//         if (!profile) {
//           errors.noprofile = "There is no profile for this user";
//           return res.status(404).json(errors);
//         }
//         res.status(200).json(profile);
//       })
//       .catch(err => res.status(404).json(err));
//   }
// );

//create or edit user profile
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //get fields
    console.log(req.body);
    // const { errors, isValid } = validateProfileInput(req.body);
    // //check validation
    // if (!isValid) {
    //   //return error

    //   return res.status(400).json(errors);
    // }

    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.location) profileFields.location = req.body.location;

    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    //profile field handle
    console.log("new handle" + profileFields.handle);
    //skills- split into array
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }
    if (typeof req.body.topics !== "undefined") {
      profileFields.topics = req.body.topics.split(",");
    }
    //Topics -split into array
    if (typeof req.body.topics !== "undefined") {
      profileFields.topics = req.body.topics.split(",");
    }
    //
    if (req.body.city) profileFields.city = req.body.city;
    if (req.body.state) profileFields.state = req.body.state;
    if (req.body.zipCode) profileFields.zipCode = req.body.zipCode;
    // if(req.body.profileImage)profileFields.profileImage=req.body.profileImage;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => {
          console.log("bio called:" + profile.bio);
          res.json(profile);
        });
        //radis update
      } else {
        //create
        //check if the handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            //errors.handle = "handle already exists";
            //res.staus(400).json(errors);
          }
          //save new profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);
//@route  POST /profile/experience
//@desc   Add Experience
//@access private

router.post("/experience", requireAuth, (req, res) => {
  const { errors, isValid } = validateExperienceInput(req.body);
  //check validation
  if (!isValid) {
    //return any errors with 404 status
    return res.status(400).json(errors);
  }
  Profile.findOne({ user: req.user.id }).then(profile => {
    const newExp = {
      title: req.body.title,
      company: req.body.company,
      location: req.body.location,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current,
      description: req.body.description
    };

    //Add in to experience array

    profile.experience.unshift(newExp);
    profile.save().then(profile => res.json(profile));
  });
});

//@route  POST /profile/education
//@desc   Add education
//@access private
router.post("/education", requireAuth, (req, res) => {
  const { errors, isValid } = validateEducationInput(req.body);
  //check validation
  if (!isValid) {
    //return any errors with 404 status
    return res.status(400).json(errors);
  }
  Profile.findOne({ user: req.user.id }).then(profile => {
    const newEdu = {
      school: req.body.school,
      concentration: req.body.concentration,
      degree: req.body.degree,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current,
      description: req.body.description
    };

    //Add in to experience array

    profile.education.unshift(newEdu);
    profile.save().then(profile => res.json(profile));
  });
});

//@route  DELETE /profile/experience/:exp_id
//@desc   delete eexperience
//@access private

router.delete("/experience/:exp_id", (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      //Get remove index

      const removeIndex = profile.experience
        .map(item => item.id)
        .indexOf(req.params.exp_id);

      profile.experience.splice(removeIndex, 1);
      profile.save().then(profile => res.status(200).json(profile));
    })
    .catch(err => res.status(404).json({ profile: "unable to find profile" }));
});

//@route  DELETE /profile/education/:edu_id
//@desc   delete eexperience
//@access private

router.delete("/education/:edu_id", requireAuth, (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      //Get remove index

      const removeIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.edu_id);

      profile.education.splice(removeIndex, 1);
      profile.save().then(profile => res.status(200).json(profile));
    })
    .catch(err =>
      res.status(404).json({ profile: "unable to find profile" + err })
    );
});

//@route  DELETE /profile
//@desc   delete user and profile
//@access private

router.delete("/", requireAuth, (req, res) => {
  Profile.findByIdAndRemove({ user: req.user.id }).then(() => {
    User.findOneAndRemove({ _id: req.user.id }).then(() => {
      res.status(200).json({ success: "true" });
    });
  });
});
//@route  POST /profileImage
//@desc   Add ProfileImage
//@access private
// router.post("/profileImage", requireAuth, (req, res) => {
//   let uploadFile = req.files.file;
//   const fileName = req.files.file.name;
//   console.log("filename:" + req.files.file.name);
//   console.log(req.body.assignmentName);
//   console.log("reqparams:" + req.params.id);
//   console.log(fileName);
//   console.log(uploadFile);
//   uploadFile.mv(
//     `${__dirname}/../public/files/assignments/${fileName}`,
//     function(err) {
//       if (err) {
//         return res.status(500).send(err);
//       }
//       console.log("path:" + `${__dirname}/../public/files/${fileName}`);
//     }
//   );

//   profileFields = {};

//   profileFields.profileImage = fileName;
//   Profile.findOneAndUpdate(
//     { user: req.user.id },
//     { $set: profileFields },
//     { new: true }
//   ).then(profile => res.json(profile));
// });

//@route  POST /follow
//@desc   Follow
//@access private
router.post("/follow", requireAuth, (req, res) => {
  console.log(req.user.id);

  console.log("follow");
  Profile.findOne({ user: req.body.userId })
    .then(profile => {
      const count = profile.followers
        .map(follower => follower)
        .indexOf(req.user.id);
      console.log(count);
      if (count >= 0) {
        res.status(300).json("already followed");
      } else {
        // const follower = {
        //   user: req.user.id
        // };
        profile.followers.unshift(req.user.id);
        profile
          .save()
          .then(profile => {
            console.log("in ");
            console.log(req.user.id);
            Profile.findOne({ user: req.user.id })
              .then(profile => {
                console.log(profile);
                console.log("found");
                // const following = {
                //   user: req.body.userId
                // };

                profile.following.unshift(req.body.userId);

                profile
                  .save()
                  .then(profile => {
                    console.log("followed" + profile);
                    res.status(200).json(profile);
                  })
                  .catch(err => {
                    console.log("unable to follow");
                  });
              })
              .catch(err => {
                console.log("user not found");
              });
          })
          .catch(err => {
            console.log("unable to find");
          });
      }
    })
    .catch(err => {
      console.log("unable to find first profile");
    });
});

module.exports = router;
// AWS.config.update({
//   accessKeyId: "AKIAIXOBVMK5U5Y57TPQ",
//   SecretAccessKey: "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"
// });
// // configure AWS to work with promises
// AWS.config.setPromisesDependency(bluebird);
// // create S3 instance
// const s3 = new AWS.S3();
// // abstracts function to upload a file returning a promise
// const uploadFile = (buffer, name, type) => {
//   const params = {
//     ACL: "public-read",
//     Body: buffer,
//     Bucket: quora - trail - bucket,
//     ContentType: type.mime,
//     Key: `${name}.${type.ext}`
//   };
//   return s3.upload(params).promise();
// };

router.get("/views", (req, res) => {
  var dat = new Date();
  dat.setDate(dat.getDate() - 30);
  console.log("new Date() - 30", dat);
  var dat1 = new Date();
  dat1.setDate(dat1.getDate());

  Profile.findOne(
    { _id: "5cc2ae2eae364b1c5c1ea4ad" },
    { profileViews: 1, _id: 0 }
  )
    .then(views => {
      if (!views) {
        errors.views = "There is no views";
        res.status(404).json(errors);
      }

      var datesArray = [];

      for (i = 0; i < 30; i++) {
        var currentDate = new Date();

        currentDate.setDate(currentDate.getDate() - i);
        const p = currentDate.toISOString().slice(0, 10);
        var foo = {};
        foo = {
          day: p,
          count: 0
        };
        datesArray.push(foo);
      }

      views.profileViews.map(x => {
        datesArray.map(y => {
          var m = new Date(x.time);
          var z = new Date(y.day);

          if (
            m.getFullYear() === z.getFullYear() &&
            m.getMonth() === z.getMonth() &&
            m.getDate() === z.getDate()
          ) {
            y.count = y.count + 1;
          }
        });
      });

      datesArray.map(x => {
        console.log("datedatatat", x);
      });

      // var questionsIdsArray = [];
      // questionsIdsArray = views.profileViews.map(x => x.time);

      res.json(datesArray);
    })
    .catch(err => res.status(404).json(err));
});
