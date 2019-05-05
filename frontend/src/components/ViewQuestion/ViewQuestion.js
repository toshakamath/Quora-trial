import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Switch, Route } from "react-router-dom";
import Pagination from "react-paginating";
import _ from "lodash";
import Axios from "axios";

class ViewQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionDetails: {},
      answerDetails: [],
      len: 0
    };
  }

  componentDidMount() {
    let questionid = this.props.match.params.questionid;
    Axios.get(window.base_url + "/getonequestion", {
      params: { questionId: questionid }
    }).then(response => {
      console.log("final data", response.data);
      this.setState({
        questionDetails: response.data.questionDetails,
        answerDetails: this.state.answerDetails.concat(
          response.data.answerDetails
        ),
        len: response.data.questionDetails.answers.length
      });
    });
  }

  renderAnswers() {
    let answerList = this.state.answerDetails;
    return _.map(answerList, answer => (
      <li className="list-group-item">
      <img src="#"></img>
        <label  style={{display:'inline'}} >{answer.answerOwner}</label>
        <div style={{ float: "right" }}>Answerd On : {answer.answerDate}</div>
        <br/>
        <p>{answer.answer}</p>
        <button>
            <i className="fa fa-arrow-up" aria-hidden="true" id="upvotearrow" />
            Upvote
          </button>
      </li>
    ));
  }

  render() {
    let cid = this.props.match.params.cid;

    return (
      <div>
        <div className="row">
        <div className="col-2"/>
        <div className="col-6">
          <ul className="list-group list-group-flush" id="questionbody">
            <li className="list-group-item" id="question">
              <div className="questionheader">
                Topic : {this.state.questionDetails.topic}
              </div>
              <br />
              <b>{this.state.questionDetails.question}</b>
              <br />
              <i class="fa fa-pencil-square-o" id="answerquestion" />
              <span>Answer</span>
              <i class="fa fa-rss" aria-hidden="true" /> Follow
              <div style={{ float: "right" }}>
                <i class="fa fa-comment-o" aria-hidden="true" />
                Comment
              </div>
              <br />
              <span>{this.state.len} Answer(s)</span>
            </li>
            {this.renderAnswers()}
          </ul>
          </div>
          <div className="col-4">
          Related Questions </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(
  mapStateToProps,
  {}
)(ViewQuestion);
