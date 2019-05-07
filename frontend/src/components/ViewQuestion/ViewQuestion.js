import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Switch, Route } from "react-router-dom";
import Pagination from "react-paginating";
import _ from "lodash";
import Axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import "./ViewQuestion.css";
import jwt_decode from "jwt-decode";

class ViewQuestion extends Component {
  constructor(props) {
    super(props);
    this.contentEditable = React.createRef();
    this.state = {
      questionDetails: {},
      answerDetails: [],
      len: 0,
      // text: '',
      editorHtml: "",
      editorHtml2: "",
      theme: "snow",
      showFlag: false,
      showFlag2: false,
      identity: "public",
      identity2: "public",
      user_id: [],
      rawAnswer: "",
      editAnswerId: "",
      checked: false,
      upvotes: null,
      downvotes: null,
      commentadded: false,
      showcomments: false,
      comment: [],
      mycomment: ""
    };
  }

  componentDidMount() {
    let questionid = this.props.match.params.questionid;
    Axios.get(window.base_url + "/getonequestion", {
      params: { questionId: questionid }
    }).then(
      response => {
        console.log("FINALDATA BACKEND", response.data); //response.data.answerDetails[i].answerOwner
        //if answerOwner=loggedin user then display edit button
        //"5cd00a68da41ec298ee8dacd" > answerOwner  > John Doe>firstName > userdetails
        const decoded = jwt_decode(localStorage.getItem("token")).id;
        console.log("TokenTokenTokenToken: ", decoded);
        let answerOwnerArray = [],
          a = [];
        for (let i = 0; i < this.state.answerDetails.length; i++) {
          console.log(this.state.answerDetails[i].answerOwner);
          a = answerOwnerArray.concat(this.state.answerDetails[i].answerOwner);
        }
        console.log(a, " ", this.state.user_id);
        this.setState({
          questionDetails: response.data.questionDetails,
          answerDetails: this.state.answerDetails.concat(
            response.data.answerDetails
          ),
          len: response.data.questionDetails.answers.length,
          user_id: answerOwnerArray
        });
      },
      err => {
        console.log("response.data", err);
      }
    );
  }
  onSubmitAnswer = e => {
    e.preventDefault();
    let isAnonymous = false;
    if (this.state.identity == "public") isAnonymous = false;
    else if (this.state.identity == "anonymous") isAnonymous = true;

    console.log(
      "this.props.match.params._id: ",
      this.props.match.params.questionid
    );

    let data = {
      editorHtml: this.state.editorHtml,
      isAnonymous: isAnonymous,
      question: this.props.match.params.questionid
    };
    console.log("DATAAA: ", data);
    axios.defaults.withCredentials = true;
    const Token = localStorage.getItem("token");
    axios
      .post(window.base_url + `/answer`, data, {
        headers: { Authorization: Token }
      })
      .then(
        response => {
          console.log("Status Code : ", response.status);
          console.log("Data from node : ", response.data);
          this.props.history.push(
            `/question/${this.props.match.params.questionid}`
          );
        },
        err => {
          console.log("ERROR : ", err);
        }
      );
  };
  onSubmitAnswer2 = e => {
    let isAnonymous = false;
    if (this.state.identity2 == "public") isAnonymous = false;
    else if (this.state.identity2 == "anonymous") isAnonymous = true;

    console.log(
      "this.props.match.params._id: ",
      this.props.match.params.questionid
    );

    let data = {
      editorHtml: this.state.editorHtml2,
      isAnonymous: isAnonymous,
      question: this.props.match.params.questionid,
      answerid: this.state.editAnswerId
    };
    console.log("DATAAA: ", data);
    axios.defaults.withCredentials = true;
    const Token = localStorage.getItem("token");
    axios
      .post(window.base_url + `/answer`, data, {
        headers: { Authorization: Token }
      })
      .then(
        response => {
          console.log("Status Code : ", response.status);
          console.log("Data from node : ", response.data);
          this.props.history.push(
            `/question/${this.props.match.params.questionid}`
          );
        },
        err => {
          console.log("ERROR : ", err);
        }
      );
  };

  renderAnswers() {
    console.log("this.state.rawAnswer", this.state.rawAnswer);

    let print = () => {
      if (!this.state.showFlag2) return <div />;
      else {
        return (
          <div>
            <div>
              <ReactQuill
                theme={this.state.theme}
                onChange={this.handleChange2}
                defaultValue={this.state.rawAnswer}
                modules={ViewQuestion.modules}
                formats={ViewQuestion.formats}
                bounds={".app"}
                placeholder="Write your answer"
              />
            </div>
            <button class="btn btn-light btn-sm" onClick={this.onSubmitAnswer2}>
              Submit
            </button>
            <div class="custom-control">
              <input
                type="checkbox"
                class="custom-control-input"
                name="identity2"
                value="anonymous"
                id="anonymous"
                onChange={this.onChangeHandler2}
              />
              <label class="custom-control-label" for="anonymous">
                Anonymous
              </label>
            </div>
          </div>
        );
      }
    };

    let answerList = this.state.answerDetails;
    console.log("SOME DETAILSSSSSSSS: ", answerList);
    return _.map(answerList, answer => (
      <li className="list-group-item">
        <img src="#" />
        <label style={{ display: "inline" }}>{answer.answerOwner}</label>
        <div  style={{ float: "right" }}>Answered On : {answer.answerDate}</div>
        <br />
        <div
          id="setPhoto"
          className="setPhoto"
          dangerouslySetInnerHTML={{ __html: answer.answer }}
        />
        <br />
        <br />
        <button
          className="btn btn-light"
          id="upvote"
          onClick={e => this.handleUpvote(e, answer._id)}
        >
          <span className="upvotetext">
            <i class="fa fa-arrow-up" id="upvote" aria-hidden="true" />
            &nbsp; Upvote {this.state.upvotes}
          </span>
        </button>
        <button
          className="btn btn-light"
          id="upvote"
          onClick={e => this.handleDownvote(e, answer._id)}
        >
          <span className="upvotetext">
            <i class="fa fa-arrow-up" id="upvote" aria-hidden="true" />
            &nbsp;Downvote {this.state.downvotes}
          </span>
        </button>
        <span style={{ float: "right" }}>
          <div class="custom-control">
            <input
              type="checkbox"
              autocomplete="off"
              class="custom-control-input"
              name="topicsSelected"
              value={answer._id}
              id={answer._id}
              onChange={this.onBookmarkChange}
            />
            <label class="custom-control-label" for={answer._id}>
              <i class="far fa-bookmark" /> Bookmark
            </label>
          </div>
        </span>
        {jwt_decode(localStorage.getItem("token")).id == answer.answerOwner ? (
          <div>
            <button
              style={{ float: "right" }}
              value={answer.answer}
              name={answer._id}
              onClick={this.showRichTextEditor2}
            >
              Edit
            </button>
            {answer._id == this.state.editAnswerId && print()}
          </div>
        ) : (
          <div />
        )}
        <br />
        <hr />

        <form onSubmit={e => this.handleComment(e, answer._id)}>
          <div className="footer">
            {this.state.commentadded ? (
              <span id="commentbox3"> {this.state.mycomment} </span>
            ) : (
              <input
                onChange={e => this.handleChangeComment(e, answer._id)}
                class="form-control"
                id="commentbox"
                type="text"
                placeholder="Add a comment..."
              />
            )}
            <a
              onClick={e => this.viewComments(e, answer._id)}
              className="commentlink"
            >
              <span className="viewcomments">View all</span>
            </a>
          </div>
        </form>
        {this.state.showcomments && (
          <ul className="list-group">
            {e => this.renderComments(e, answer._id)}
          </ul>
        )}
      </li>
    ));
  }

  handleChangeComment = e => {
    this.setState({ mycomment: e.target.value });
  };
  handleComment = (e, answerid) => {
    e.preventDefault();
    console.log("entered SUBMIT", this.state.comment);
    let token_saved = localStorage.getItem("token");
    let emailData = jwt_decode(token_saved);
    let id = {
      answerid: answerid,
      comment: this.state.mycomment,
      email: emailData.email
    };
    Axios.post(window.base_url + "/comment", id).then(response => {
      console.log("final data", response.data);
      this.setState({ commentadded: true });
      console.log("DATA", this.state.data);
    });
  };

  viewComments = (e, answerid) => {
    e.preventDefault();
    console.log("This is value in view comments ", answerid);
    Axios.get(window.base_url + "/comment", {
      params: { answerid: answerid }
    }).then(response => {
      this.setState({ comment: response.data });
      this.setState({ showcomments: true });
      console.log("Show ", this.state.showcomments);
    });
  };

  renderComments = (e, answerid) => {
    e.preventDefault();
    let comments = this.state.comment.comments;
    return _.map(comments, comm => (
      <li id="viewallcomments" class="list-group-item">
        <span id="commentbox2">
          <i class="fa fa-comment" id="commenticon" aria-hidden="true" />
          {comm.username} : {comm.comment}
        </span>
      </li>
    ));
  };

  handleUpvote = (e, answer) => {
    e.preventDefault();
    let token_saved = localStorage.getItem("token");
    let emailData = jwt_decode(token_saved);
    let id = {
      answerid: answer,
      upVote: true,
      email: emailData.email
    };
    console.log("this is ANSWER ID", answer);
    Axios.defaults.withCredentials = true;
    Axios.post(window.base_url + "/updownVote", id).then(response => {
      console.log("final data", response.data);
      this.setState({ upvotes: response.data.upVoteCount });
    });
  };

  handleDownvote = (e, answer) => {
    e.preventDefault();
    let token_saved = localStorage.getItem("token");
    let emailData = jwt_decode(token_saved);
    let id = {
      answerid: answer,
      downVote: true,
      email: emailData.email
    };
    console.log("this is ANSWER ID", answer);
    Axios.defaults.withCredentials = true;
    Axios.post(window.base_url + "/updownVote", id).then(response => {
      console.log("final data", response.data);
      this.setState({ downvotes: response.data.downVoteCount });
    });
  };

  onBookmarkChange = e => {
    console.log(
      "SOMETHINGGGGG ",
      e.target.name,
      e.target.value,
      e.target.checked
    );
    axios.defaults.withCredentials = true;
    const Token = localStorage.getItem("token");
    let data = {};
    if (e.target.checked === true) {
      this.setState({
        checked: true
      });
      data = {
        bookmarked: true,
        answerid: e.target.value
      };
      console.log("Checked the box: ", data);
    } else if (e.target.checked === false) {
      this.setState({
        checked: false
      });
      data = {
        bookmarked: false,
        answerid: e.target.value
      };
      console.log("UNchecked the box: ", data);
    }
    axios
      .post(window.base_url + `/bookmark`, data, {
        headers: { Authorization: Token }
      })
      .then(
        response => {
          console.log("Status Code : ", response.status);
          console.log("Data from node : ", response.data);
          this.props.history.push(
            `/question/${this.props.match.params.questionid}`
          );
        },
        err => {
          console.log("ERROR : ", err);
        }
      );
  };

  handleChange = html => {
    this.setState({ editorHtml: html });
  };
  handleChange2 = html => {
    this.setState({ editorHtml2: html });
  };

  showRichTextEditor = e => {
    if (this.state.showFlag === true) {
      this.setState({
        showFlag: false
      });
    } else if (this.state.showFlag === false) {
      this.setState({
        showFlag: true
      });
    }
  };
  showRichTextEditor2 = e => {
    console.log("e.target.value: ", e.target.value);
    this.setState({
      rawAnswer: e.target.value,
      editAnswerId: e.target.name
    });

    console.log(this.state.showFlag2);
    if (this.state.showFlag2 === true) {
      this.setState({
        showFlag2: false
      });
    } else if (this.state.showFlag2 === false) {
      this.setState({
        showFlag2: true
      });
    }
  };
  onChangeHandler1 = e => {
    console.log(
      "SOMETHINGGGGG ",
      e.target.name,
      e.target.value,
      e.target.checked
    );
    if (e.target.checked === true) {
      this.setState({
        identity: "anonymous"
      });
    } else if (e.target.checked === false) {
      this.setState({
        identity: "public"
      });
    }
  };
  onChangeHandler2 = e => {
    console.log(
      "SOMETHINGGGGG ",
      e.target.name,
      e.target.value,
      e.target.checked
    );
    if (e.target.checked === true) {
      this.setState({
        identity2: "anonymous"
      });
    } else if (e.target.checked === false) {
      this.setState({
        identity2: "public"
      });
    }
  };

  render() {
    let cid = this.props.match.params.cid;

    return (
      <div>
        <div className="row">
          <div className="col-2" />
          <div className="col-6">
            <ul className="list-group list-group-flush" id="questionbody">
              <li className="list-group-item" id="question">
                <div className="questionheader">
                  Topics :{" "}
                  <span
                    style={{
                      border: "1px solid",
                      padding: "10px",
                      borderRadius: "10px",
                      border: "1px solid grey"
                    }}
                  >
                    {this.state.questionDetails.topic}
                  </span>
                </div>
                <br />
                <b id="questiontitle">{this.state.questionDetails.question}</b>
                <br />
                <br />
                <div className="buttons">
                  <button
                    id="upvote"
                    class="btn btn-light btn-sm"
                    onClick={this.showRichTextEditor}
                  >
                    <i class="fa fa-pencil-square-o" id="answerquestion" />
                    <span>Answer</span>
                  </button>
                  <button
                    id="upvote"
                    style={{ marginLeft: "20px" }}
                    type="button"
                    class="btn btn-light btn-sm"
                  >
                    <i
                      class="fa fa-rss"
                      aria-hidden="true"
                      id="followquestion"
                    />
                    Follow
                  </button>
                </div>
                {/* { this.state.showResults ? <Results /> : null } */}
                {!this.state.showFlag ? (
                  <div />
                ) : (
                  <div>
                    <div>
                      <ReactQuill
                        theme={this.state.theme}
                        onChange={this.handleChange}
                        value={this.state.editorHtml}
                        modules={ViewQuestion.modules}
                        formats={ViewQuestion.formats}
                        bounds={".app"}
                        placeholder="Write your answer"
                      />
                    </div>
                    {/* <div id="richtextfooter"> */}
                    <button
                      class="btn btn-light btn-sm"
                      onClick={this.onSubmitAnswer}
                    >
                      Submit
                    </button>
                    <div style={{ float: "left" }} class="custom-control">
                      <input
                        type="checkbox"
                        class="custom-control-input"
                        name="identity"
                        value="anonymous"
                        id="anonymous"
                        onChange={this.onChangeHandler1}
                      />
                      <label class="custom-control-label" for="anonymous">
                        Anonymous
                      </label>
                    </div>
                    {/* </div> */}
                  </div>
                )}

                <br />
                <span>{this.state.len} Answer(s)</span>
              </li>
              {this.renderAnswers()}
            </ul>
          </div>
          <div className="col-4">Related Questions </div>
        </div>
      </div>
    );
  }
}

ViewQuestion.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" }
    ],
    ["link", "image", "video"],
    ["clean"]
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  }
};
/*
 * Quill ViewQuestion formats
 * See https://quilljs.com/docs/formats/
 */
ViewQuestion.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video"
];

/*
 * PropType validation
 */
// ViewQuestion.propTypes = {
//   placeholder: PropTypes.string,
// }

/*
 * Render component on page
 */
// ReactDOM.render(
//   <ViewQuestion placeholder={'Write something...'}/>,
//   document.querySelector('.app')
// )

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(
  mapStateToProps,
  {}
)(ViewQuestion);
