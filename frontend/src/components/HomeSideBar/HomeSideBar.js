import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./HomeSideBar.css";
import { connect } from "react-redux";
import _ from "lodash";
var fetchTopics = require("../../Actions/authAction").fetchTopics;

class HomeSideBar extends Component {
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
        <Link to={`/topic/${topic.topicName}`} className="swictherLink">
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
          <ul className="sidebarList">
            <li className="SwitcherItemWithImage">
              <Link to={`/home`} className="swictherLink">
                <div className="switcherImgWrapper">
                  <div className="swictherImg" />
                </div>
                <label>Feed</label>
              </Link>
            </li>
            {this.topicsList()}
            <li>
              <Link
                to={`/bookmarks`}
                className="swictherLink"
              >
                <div className="BookmarkswictherImg">
                  <i
                    className="fa fa-bookmark"
                    id="bookmark"
                    aria-hidden="true"
                  />
                </div>
                <label className="bookmarklabel">Bookmarks</label>
              </Link>
            </li>
          </ul>
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
)(withRouter(HomeSideBar));
