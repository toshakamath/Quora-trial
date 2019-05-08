import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./TopicSideBar.css";
import { connect } from "react-redux";
import _ from "lodash";
var fetchTopics = require("../../Actions/authAction").fetchTopics;

class TopicSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchTopics();
  }

  topicsList() {
    let topics = this.props.auth.topics;
    return _.map(topics, topic => (
      <li className="topicList">
        <Link to={`/questions/${topic.topicName}`} className="swictherLink">
          <div className="switcherImgWrapper">
            <div
              className="swictherImgTopics"
              style={{ backgroundImage: `url(${topic.topicImage})` }}
            />
          </div>
          <label className="topicname">{topic.topicName}</label>
        </Link>
      </li>
    ));
  }

  render() {
    console.log("sidebarprops:" + this.props.id);
    return (
      <div className="homeSidebarWrapper">
        <div className="homeSidebarInner">
          <ul className="sidebarList">{this.topicsList()}</ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { fetchTopics }
)(withRouter(TopicSideBar));
