import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import "../../App.css";
import "./Content.css";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import HomeSideBar from "../HomeSideBar/HomeSideBar";
//new vaibhav
import Questions from "./ContentQuestions";
import { getQuestions } from "../../Actions/questionsAction";
import PropTypes from "prop-types";
import { getProfileName } from "../../Actions/profileAction";
import ContentSideBar from "../ContentSideBar/ContentSideBar";

import { getContentQuestions, getContentAnswers, getContentFollowedQuestions } from "../../Actions/contentAction";


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    console.log("TEST METHOD : getContentQuestions, getContentAnswers");
    this.props.getContentQuestions("All Time", "All Types", "");
    this.props.getContentAnswers("All Time", "All Types", "");
    this.props.getContentFollowedQuestions("All Time", "All Types", "");
  }

  render() {

    const { questions } = this.props.content;

    const { answers } = this.props.content;

    const { followedQuestions } = this.props.content;

    if (questions === null) return <div />;

    const questionsList = questions.map(question => (
      <Questions question={question} />
    ));

    if (answers === null) return <div />;

    const answersList = answers.map(answer => (
      <Questions question={answer} />
    ));

    if (followedQuestions === null) return <div />;

    const followedQuestionsList = followedQuestions.map(followedQuestion => (
      <Questions question={followedQuestion} />
    ));


    return (
      <div className="container container-fluid">
        <div className="row">
          <div className="col-md-2">
            <ContentSideBar id={this.props.match.params.Id} />
          </div>

          <div className="col-md-8">
            <p><b style={{ fontSize: "15px" }}>Your Content</b></p>
            <div>
              <p><b style={{ fontSize: "12px" }}>Your Questions</b></p>
              <div>{questionsList}</div>

              <p><b style={{ fontSize: "12px" }}>You Answered</b></p>
              <div>{answersList}</div>

              <p><b style={{ fontSize: "12px" }}>You Followed</b></p>
              <div>{followedQuestionsList}</div>
            </div>
          </div>
          <div className="col-md-2" />
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  getContentFollowedQuestions: PropTypes.func.isRequired,
  getContentQuestions: PropTypes.func.isRequired,
  getContentAnswers: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  content: PropTypes.object.isRequired,
  getProfileName: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  loginStateStore: state.auth,
  content: state.content,
  contentAnswered: state.contentAnswered,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getContentQuestions, getProfileName, getContentAnswers, getContentFollowedQuestions }
)(withRouter(Home));
