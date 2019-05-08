import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import "../../App.css";
import _ from "lodash";
import "./Topics.css";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import HomeSideBar from "../HomeSideBar/HomeSideBar";
//new vaibhav
import Questions from "../Questions/questions";
import TopicsRender from "./TopicsRender";
import Sample from "../Sample";
import { getQuestions } from "../../Actions/questionsAction";
import PropTypes from "prop-types";
import {getProfileName} from "../../Actions/profileAction";
import { Checkbox } from 'antd';
import CreateMessage1 from "../Message/CreateMessage1";
import DisplayAllMessages1 from "../Message/DisplayAllMessages1";
import ViewConversation1 from "../Message/ViewConversation1";
var fetchTopics = require("../../Actions/authAction").fetchTopics;

class Topics extends Component {
    constructor(props) {
        super(props);
        this.state = {};
      }
    
      componentDidMount() {
        this.props.fetchTopics();
      }
      
  render() {
    let topics1 = this.props.auth.topics;
    //new
    let checkprops = this.props;
    console.log("checkprops: ", checkprops, ">>", this.props.match.params, ">>", this.props.auth.topics);
    //0: {_id: "5ccd221d81478216c6592c43", 
    // topicName: "Science", 
    // topicImage: "https://qph.fs.quoracdn.net/main-thumb-t-2177-200-JiR07D1TQSfeQzRvWXomVaY4Poj2f8Yb.jpeg"}
   
    const { questions } = this.props.questions;
    const param_name =this.props.match.params;
    let sendImage="";
    for(let i=0; i<this.props.auth.topics.length;i++){
        if(this.props.auth.topics[i].topicName.includes(param_name.topicName)){
            console.log(this.props.auth.topics[i].topicImage)
            sendImage=this.props.auth.topics[i].topicImage;
        }
    }
    if (questions === null) return <div />;

    const questionsList = questions.map((question, index) => (
      <TopicsRender key={index} question={question} param_name={param_name} sendImage={sendImage} />
    ));

    return (
      <div className="container container-fluid">
        <div className="row">
          <div className="col-md-2">
            <HomeSideBar id={this.props.match.params.Id} />
          </div>

          <div className="col-md-8">
            <div className="card questionCard">
              
            </div>
            <div className="feed">{questionsList}</div>
          </div>

          <div className="col-md-2" />
        </div>
      </div>
    );
  }
}

Topics.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  questions: PropTypes.object.isRequired,
  getProfileName: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  loginStateStore: state.auth,
  questions: state.questions,
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getQuestions, getProfileName, fetchTopics }
)(withRouter(Topics));
