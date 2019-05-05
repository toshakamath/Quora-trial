const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
//var kafka = require('../kafka/client');

var requireAuth = passport.authenticate("jwt", { session: false });

//redis database
const redis = require("redis")

// var cache = require('lru-cache')({  
//   max : 100,                   // The maximum number of items allowed in the cache
//   max_age : 1000 * 60 * 60     // The maximum life of a cached item in milliseconds
// });

//autmtically connects localhost:6379
const client = redis.createClient();

//load credential model
const Profile = require("../../Kafka-Backend/Models/credentials");
//laod userDetails model
const User = require("../../Kafka-Backend/Models/userDetails");
//load validation
const validateProfileInput = require("../validation/profile");
const validateExperienceInput = require("../validation/experience");
const validateEducationInput = require("../validation/education");
//get current user's profile

router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
console.log("SOMETHING TO LOG");
  client.get(req.user.id, function (err, value) {

    if (err) {
      return console.log(err);
    }
    if (value) {
      console.log("Redis Cache has required value :", value);
      res.status(200).json(value);
    } else {

      const errors = {};
      Profile.findOne({ user: req.user.id })
        .then(profile => {

          if (!profile) {
            errors.noprofile = "There is no profile for this user";
            return res.status(404).json(errors);
          }
          else {


            console.log("I am coming here and lets try for REDIS now");
            console.log(req.user.id);
            console.log(profile);
            client.set(req.user.id, JSON.stringify(profile), function (err) {
              if (err) callback(err);
              else {
                console.log("REDIS Set successful");
              }
            });

            console.log("profile==", profile);
            res.status(200).json(profile);
          }
        })
        .catch(err => res.status(404).json(err));
    };
  });
  //@route  GET /profile/all
  //@desc   get all profiles
  //@access public (anyone can see this user profile)
  router.get("/all", (req, res) => {
    const errors = {};
    Profile.find()
      .populate("user", ["firstName,lastName,email"])
      .then(profiles => {
        if (!profiles) {
          errors.noprofile = "There are no profiles";
          return res.status(404).json(errors);
        }
        res.json(profiles);
      })
      .catch(err =>
        res.status(404).json({ profile: "There are no profiles" + err })
      );
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
    Profile.findOne({ user: req.params.user_id }).populate("user", ["firstName", "lastName", "email"]).then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile";
        res.status(404).json(errors);
      }
      res.json(profile);
    }).catch(err =>
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
})

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
    const { errors, isValid } = validateProfileInput(req.body);
    //check validation
    if (!isValid) {
      //return error

      return res.status(400).json(errors);
    }

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
        ).then(profile => res.json(profile));
        //radis update
      } else {
        //create
        //check if the handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "handle already exists";
            res.staus(400).json(errors);
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

module.exports = router;
