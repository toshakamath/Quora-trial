var express = require("express");
var router = express.Router();
var passport = require("passport");
var requireAuth = passport.authenticate("jwt", { session: false });
const mongoose = require("mongoose");
var QuestionModel = require("../../Kafka-Backend/Models/questionsDetail");
var AnswerModel = require('../../Kafka-Backend/Models/answer');

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


router.get("/questions", (req, res) => {
    console.log("Inside Get-content questions");

    var params = {};

    if (req.query.userid) {
        let user = req.query.userid;
        params.user = mongoose.Types.ObjectId(user);
    }

    if (req.query.year) {

        var strtDate = new Date(req.query.year, 1, 1, 0, 0, 0);
        var endDate = new Date();

        params.postDate = {
            $gte: strtDate, //Date("2019-01-01T00:00:00.000Z"),
            $lt: endDate, //Date("2020-01-01T00:00:00.000Z")
        };
    }

    QuestionModel.find(params)
        .then(questions => {
            console.log("success Get-content questions")

            res.json(questions);
        })
        .catch(err => {
            console.log("Error while fetching content questions", err);
        }
        )
}
);

router.get("/answers", (req, res) => {
    console.log("Inside Get-content answers");

    var params = {};

    if (req.query.userid) {
        let user = req.query.userid;
        params.answerOwner = mongoose.Types.ObjectId(user);
    }

    if (req.query.year) {

        var strtDate = new Date(req.query.year, 1, 1, 0, 0, 0);
        var endDate = new Date();

        params.answerDate = {
            $gte: strtDate,
            $lt: endDate,
        };
    }

    AnswerModel.find(params, { question: 1, _id: 0 })
        .then(questionsIds => {
            if (!questionsIds) { }

            console.log("success Get-content answers", questionsIds)
            var questionsIdsArray = [];
            questionsIdsArray = questionsIds.map(x => x.question);


            QuestionModel.find({ _id: { $in: questionsIdsArray } })
                .then(questions => {
                    console.log("success Get-content questions")

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

module.exports = router;

