var express = require("express");
var router = express.Router();
var passport = require("passport");
var requireAuth = passport.authenticate("jwt", { session: false });
const mongoose = require("mongoose");
var QuestionModel = require("../../Kafka-Backend/Models/questionsdetail");
var AnswerModel = require('../../Kafka-Backend/Models/answersdetail');

router.get("/", (req, res) => {
    console.log();
    QuestionModel.find()
        .populate("answers", ["answer", "upVote", "answerDate", "answerOwner"])
        //.populate({ path: 'answers', populate: { path: 'answers.answerOwner', select: 'email' } })
        //select: "answer upVote answerDate answerOwner" })
        // .populate('answerOwner', ["email"])
        .then(question => {
            console.log(question);
            res.json(question);
        });
});



router.get("/questions", passport.authenticate("jwt", { session: false }), (req, res) => {
    console.log("Inside Get-content questions");


    var params = {};
    console.log("USER", req.user.id)
    console.log("YEAR", req.query.year)
    console.log("YEAR", req.query.sort)

    var ordering = -1;
    if (req.query.sort === "OldestFirst") {
        ordering = 1;
    }

    if (req.user.id) {
        let user = req.user.id;
        params.user = mongoose.Types.ObjectId(user);
    }

    if (req.query.year) {

        var strtDate = new Date(2000, 1, 1, 0, 0, 0);
        var endDate = new Date();
        if (req.query.year == "All Time") {
        }
        else {
            endDate = new Date(req.query.year, 12, 31, 0, 0, 0);
        }

        params.postDate = {
            $gte: strtDate, //Date("2019-01-01T00:00:00.000Z"),
            $lt: endDate, //Date("2020-01-01T00:00:00.000Z")
        };
    }

    QuestionModel.find(params)
        .sort({ postDate: ordering })
        .then(questions => {
            console.log("success Get-content questions")

            res.json(questions);
        })
        .catch(err => {
            console.log("Error while fetching content questions", err);
        }
        );

}
);

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

router.get("/answers", passport.authenticate("jwt", { session: false }), (req, res) => {
    console.log("Inside Get-content answers");

    var params = {};
    console.log("USER", req.user.id)
    console.log("YEAR", req.query.year)


    var ordering = -1;
    if (req.query.sort === "OldestFirst") {
        ordering = 1;
    }

    if (req.user.id) {
        let user = req.user.id;
        params.answerOwner = mongoose.Types.ObjectId(user);
    }

    if (req.query.year) {

        var strtDate = new Date(2000, 1, 1, 0, 0, 0);
        var endDate = new Date();
        if (req.query.year == "All Time") {
        }
        else {
            endDate = new Date(req.query.year, 12, 31, 0, 0, 0);
        }

        params.answerDate = {
            $gte: strtDate, //Date("2019-01-01T00:00:00.000Z"),
            $lt: endDate, //Date("2020-01-01T00:00:00.000Z")
        };
    }

    AnswerModel.find(params, { question: 1, _id: 0 })
        .then(questionsIds => {
            if (!questionsIds) { }

            console.log("success Get-content answers", questionsIds)

            var questionsIdsArray = [];

            questionsIdsArray = questionsIds.map(x => x.question);

            var unique = questionsIdsArray[0];//.filter((v, i, a) => a.indexOf(v) === i);
            console.log("unique", unique);

            QuestionModel.find({ _id: { $in: questionsIdsArray } })
                .sort({ postDate: ordering })
                .then(questions => {
                    console.log("success Get-content questions")
                    console.log(questions);
                    res.json(questions);
                })
                .catch(err => {
                    console.log("Error while fetching content questions", err);
                }
                )

        })
        .catch(err => {
            console.log("Error while fetching content answers", err);
        }
        )
}
);

router.get("/questionsfollowed", passport.authenticate("jwt", { session: false }), (req, res) => {
    console.log("Inside Get-content questionsbookmarked");

    var params = {};
    console.log("USER", req.user.id)
    console.log("YEAR", req.query.year)


    var ordering = -1;
    if (req.query.sort === "OldestFirst") {
        ordering = 1;
    }

    // if (req.user.id) {
    //     let user = req.user.id;
    //     params.user = mongoose.Types.ObjectId(user);
    // }

    if (req.query.year) {

        var strtDate = new Date(2000, 1, 1, 0, 0, 0);
        var endDate = new Date();
        if (req.query.year == "All Time") {
        }
        else {
            endDate = new Date(req.query.year, 12, 31, 0, 0, 0);
        }

        params.postDate = {
            $gte: strtDate, //Date("2019-01-01T00:00:00.000Z"),
            $lt: endDate, //Date("2020-01-01T00:00:00.000Z")
        };
    }

    console.log("req.query.year", params);
    QuestionModel.find({ postDate: params.postDate, followers: { "$in": [req.user.id] } })
        .sort({ postDate: ordering })
        .then(questions => {
            console.log(questions);
            res.json(questions);
        })
        .catch(err => {
            console.log("Error while fetching content nbookmarked questions", err);
        }
        )

}
);

module.exports = router;

