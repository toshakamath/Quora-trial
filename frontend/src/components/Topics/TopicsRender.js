import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import _ from "lodash";
import "./Topics.css";

const topics = ({ question, param_name, sendImage }) => {
  //let answer = {}

  var max = -Infinity;
  var index = -1;
  question.answers.forEach(function(a, i) {
    if (a.upVote.length > max) {
      max = a.length;
      index = i;
    }
  });

  // diff is: Thu Jul 05 1973 04:00:00 GMT+0300 (EEST)
  
  let user= (question.answers[index]||{}).answerOwner;
  console.log("USER", user);

  const maxUpVotedAnswer = (question.answers[index]||{}).answer;
  const answerDate = (question.answers[index]||{}).answerDate;
  var displayAsweredTime = "";
  var answeredDate = new Date(answerDate);
  var currentDate = new Date();
  var diff = new Date(currentDate.getTime() - answeredDate.getTime());

  if (diff.getUTCFullYear() - 1970 > 0) {
    displayAsweredTime = diff.getUTCFullYear() - 1970 + " years ago";
  } else if (diff.getUTCMonth() > 0) {
    displayAsweredTime = diff.getUTCMonth() + " months ago";
  } else if (diff.getUTCDate() - 1 > 0) {
    displayAsweredTime = diff.getUTCDate() - 1 + " days ago";
  } else if (diff.getUTCHours() > 0) {
    displayAsweredTime = diff.getUTCHours() + " hours ago";
  } else if (diff.getMinutes() - 1 > 0) {
    displayAsweredTime = diff.getMinutes() + " minutes ago";
  } else if (diff.getUTCSeconds() - 1 > 0) {
    displayAsweredTime = diff.getUTCSeconds() + " seconds ago";
  }

if((question.topic||[]).includes(param_name.topicName)){
  return (
      <div>
          <div className="card questionCard">
        <h2><img src={sendImage} alt={param_name.topicName} style={{width:"100px", height:"100px", marginRight:"20px", borderRadius:"10px"}}/>
        {param_name.topicName}
        <button style={{marginLeft:"20px"}} type="button" class="btn btn-light btn-sm"><i class="fas fa-tasks"></i> Follow</button>
        </h2>
        </div>
    <div className="card cardstyle">
      {/* <img className="card-img-top" src="..." alt="Card image cap" /> */}
      <div className="card-body">
        <h5 className="card-title">Topic: {question.topic} </h5>

        <a href={"/" + question._id} className="questions">
          <h5 className="card-title">
            <b>{question.question}</b>
          </h5>
        </a>
        <a style={{fontSize:"14px", color:"blue"}} href={question.questionlink} className="questions">
          {question.questionlink}
          </a>

        <h6 style={{marginTop:"10px"}} className="userInfo card-subtitle mb-2 text-muted">{user}</h6>
        <h6 className="userInfo card-subtitle mb-2 text-muted">
          Answered: {displayAsweredTime}
        </h6>
        <a
          className="answers card-link collapsed"
          data-toggle="collapse"
          href={"#" + question._id}
          aria-expanded="false"
          aria-controls={question._id}
        >
          <div id="summary">
            <p className="card-text collapse" id={question._id}>
              {maxUpVotedAnswer}
              <a
                className="collapsed"
                data-toggle="collapse"
                href={"#" + question._id}
                aria-expanded="false"
                aria-controls={question._id}
              />
              <div className="buttonbar">
                <button className="btn btn-light" id="upvote">
                  <i
                    className="fa fa-arrow-up"
                    aria-hidden="true"
                    id="upvotearrow"
                  />
                  &nbsp; Upvote ()
                </button>
                <div className="bookmarkcheckbox">
                  <input
                    type="checkbox"
                    id="checkbox"
                    name="cc"
                    className="bookmarkcb"
                  />
                  <label htmlFor="checkbox" id="labelbookmark">
                    Bookmark
                  </label>
                </div>
              </div>
            </p>
          </div>
        </a>
      </div>
    </div>
    </div>
  );
        }
        else{
            return(
                <div></div>
            );
        }
};

export default topics;
