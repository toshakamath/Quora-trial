import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import HomeSideBar from "../HomeSideBar/HomeSideBar";
import _ from "lodash";
import PropTypes from "prop-types";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: {}
    };
  }

  renderProfile() {
    let searchProfile = this.props.location.state.detail.profile;
    console.log("Profile", searchProfile);
    return _.map(searchProfile, profile => (
      <li className="list-group-item">
        <Link to={`/profile/${profile._id}`}>
          <label style={{ display: "inline" }}>{profile.firstName}</label>
        </Link>
      </li>
    ));
  }

  renderQuestions() {
    let searchQuestion = this.props.location.state.detail.question;
    console.log("Questions", searchQuestion);

    return _.map(searchQuestion, question => (
      <li className="list-group-item">
        <Link to={`/question/${question._id}`}>
          <label style={{ display: "inline" }}>{question.question}</label>
        </Link>
      </li>
    ));
  }

  renderTopics() {
    let searchTopics = this.props.location.state.detail.topics;
    console.log("searc topics", searchTopics);
    return _.map(searchTopics, topic => (
      <li className="list-group-item">
        <Link to={`/topics/${topic.topicName}`}>
          <label style={{ display: "inline" }}>{topic.topicName}</label>
        </Link>
      </li>
    ));
  }

  render() {
    console.log("entered inside search");
    return (
      <div className="container container-fluid">
        <div className="row">
          <div className="col-md-2">
            <HomeSideBar id={this.props.match.params.Id} />
          </div>

          <div className="col-md-8">
            <div className="card questionCard">
              <span className="feed">
                <h3>Topics : </h3>
              </span>
              <ul className="list-group list-group-flush" id="questionbody">
                {this.renderTopics()}
              </ul>
            </div>
            <div className="card questionCard">
              <span className="feed">
                <h3>Questions : </h3>
              </span>
              <ul className="list-group list-group-flush" id="questionbody">
                {this.renderQuestions()}
              </ul>
            </div>

            <div className="card questionCard">
              <span className="feed">
                <h3>Profile : </h3>
              </span>
              <ul className="list-group list-group-flush" id="questionbody">
                {this.renderProfile()}
              </ul>
            </div>
          </div>

          <div className="col-md-2" />
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  auth: PropTypes.object.isRequired,
  questions: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  loginStateStore: state.auth,
  questions: state.questions
});

export default connect(
  mapStateToProps,
  {}
)(withRouter(Search));
