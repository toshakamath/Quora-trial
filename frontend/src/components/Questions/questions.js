import React, { Component } from "react";
import Axios from "axios";
import _ from "lodash";
import jwt_decode from "jwt-decode";
import { Collapse } from "reactstrap";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import "./questions.css";

var max = -Infinity;
var index = -1;
let class_name = "collapse";
let texttoshow = "(more)";

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      more: true,
      comment: [],
      data: {},
      upvotes: null,
      showcomments: false,
      answers: [],
      commentadded: false,
      mycomment: ""
    };
  }

  componentDidMount = () => {
    let upVoteCount = ((this.props.question.answers[index] || {}).upVote || [])
      .length;
    this.setState({ upvotes: upVoteCount });
    this.setState({
      answers: this.state.answers.concat(this.props.question.answers)
    });
  };

  showMore = () => {
    this.setState({ more: !this.state.more });
    if (this.state.more) {
      class_name = "expand";
      texttoshow = "";
    } else {
      class_name = "collapse";
    }
  };

  handleUpvote = e => {
    e.preventDefault();
    let token_saved = localStorage.getItem("token");
    let emailData = jwt_decode(token_saved);
    let id = {
      answerid: this.props.question.answers[index]._id,
      upVote: true,
      email: emailData.email
    };
    console.log(
      "this is ANSWER ID",
      this.props.question.answers[index].upVote.length
    );
    Axios.defaults.withCredentials = true;
    Axios.post(window.base_url + "/updownVote", id).then(response => {
      console.log("final data", response.data);
      this.setState({ upvotes: response.data.upVoteCount });
    });
  };

  handleChange = e => {
    this.setState({ mycomment: e.target.value });
  };

  handleComment = e => {
    e.preventDefault();
    console.log("entered SUBMIT", this.state.comment);
    let token_saved = localStorage.getItem("token");
    let emailData = jwt_decode(token_saved);
    let id = {
      answerid: this.props.question.answers[index]._id,
      comment: this.state.mycomment,
      email: emailData.email
    };
    Axios.post(window.base_url + "/comment", id).then(response => {
      console.log("final data", response.data);
      this.setState({ commentadded: true });
      console.log("DATA", this.state.data);
    });
  };

  viewComments = e => {
    e.preventDefault();
    console.log("This is value ", this.props.question.answers[index]._id);
    let aid = this.props.question.answers[index]._id;
    Axios.get(window.base_url + "/comment", { params: { answerid: aid } }).then(
      response => {
        this.setState({ comment: response.data });
        this.setState({ showcomments: true });
        console.log("Show ", this.state.showcomments);
      }
    );
  };

  renderComments = () => {
    let comments = this.state.comment.comments;
    return _.map(comments, comm => (
      <li id="viewallcomments" class="list-group-item">
        <span id="commentbox2">
        <i class="fa fa-comment" id="commenticon" aria-hidden="true"></i>
          {comm.username} : {comm.comment}
        </span>
      </li>
    ));
  };

  render() {
    console.log("DATA", this.props.question);
    let user = (this.props.question.answers[index] || {}).answerOwner;
    const { more } = this.state;
    this.props.question.answers.forEach(function(a, i) {
      if (a.upVote.length > max) {
        max = a.length;
        index = i;
      }
    });

    // diff is: Thu Jul 05 1973 04:00:00 GMT+0300 (EEST)

    const maxUpVotedAnswer = (this.props.question.answers[index] || {}).answer;
    const answerDate = (this.props.question.answers[index] || {}).answerDate;
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
    return (
      <div className="card cardstyle">
        {/* <img className="card-img-top" src="..." alt="Card image cap" /> */}
        <div className="card-body">
          <h15 id="topicname" className="card-title">
            Topic: {this.props.question.topic}{" "}
          </h15>

          <a href={"/question/" + this.props.question._id} className="questions">
            <h5 className="card-title" id="questiontitle">
              <b> {this.props.question.question}</b>
            </h5>
          </a>
          <h6 className="userInfo card-subtitle mb-2 text-muted">
            User Info : {user}
          </h6>

          <h6 className="userInfo card-subtitle mb-2 text-muted">
            Answered: {displayAsweredTime}
          </h6>
          <a
            className="more"
            onClick={this.showMore}
            aria-controls="example-collapse-text"
            aria-expanded={this.state.more}
          >
            {class_name === "collapse" ? (
              <p className="firstlines"> {maxUpVotedAnswer}</p>
            ) : (
              <p className="nolines" />
            )}
            {maxUpVotedAnswer && <span className="more">{texttoshow}</span>}
          </a>
          <div className={class_name}>
            <p>
              <span className="answerbody">{maxUpVotedAnswer}</span>
              <div>
                <button
                  className="btn btn-light"
                  id="upvote"
                  onClick={this.handleUpvote}
                >
                  <span className="upvotetext">
                    <i class="fa fa-arrow-up" id="upvote" aria-hidden="true" />
                    &nbsp;&nbsp; Upvote {this.state.upvotes}
                  </span>
                </button>
              </div>
              <hr />

              <form onSubmit={this.handleComment}>
                <div className="footer">
                  {this.state.commentadded ? (
                    <span id="commentbox3"> {this.state.mycomment} </span>
                  ) : (
                    <input
                      onChange={this.handleChange}
                      class="form-control"
                      id="commentbox"
                      type="text"
                      placeholder="Add a comment..."
                    />
                  )}
                  <a onClick={this.viewComments} className="commentlink">
                    <span className="viewcomments">View all</span>
                  </a>
                </div>
              </form>
              {this.state.showcomments && (
                <ul className="list-group">{this.renderComments()}</ul>
              )}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

Questions.propTypes = {
  //login: PropTypes.func.isRequired,
  //profile: PropTypes.func.isRequired,
  //auth: PropTypes.object.isRequired
  //errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default Questions;

// <p>{maxUpVotedAnswer}</p>
// <h6 className="userInfo card-subtitle mb-2 text-muted">User Info</h6>
