import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import "../../App.css";
import "./Home.css";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import HomeSideBar from "../HomeSideBar/HomeSideBar";
//new vaibhav
import Questions from "../Questions/questions";
import Sample from "../Sample";
import { getQuestions } from "../../Actions/questionsAction";
import PropTypes from "prop-types";
import { getProfileName } from "../../Actions/profileAction";
// import { Checkbox } from 'antd';
import CreateMessage1 from "../Message/CreateMessage1";
import DisplayAllMessages1 from "../Message/DisplayAllMessages1";
import ViewConversation1 from "../Message/ViewConversation1";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      addQuestion: "activeTab",
      shareLink: "inactiveTab",
      topicsSelected: [],
      identity: "public",
      newquestion: "",
      questionlink: "",
      more: false
      // checked: true
    };
  }
  onChangeHandler = e => {
    //identity, newquestion, questionlink
    console.log(e.target.name, e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  mapTopicsToQuestion=(e)=>{
    e.preventDefault();
    let isAnonymous = false;
    if (this.state.identity == "public") isAnonymous = false;
    else if (this.state.identity == "anonymous") isAnonymous = true;

    let data = {
      newquestion: this.state.newquestion,
      questionlink: this.state.questionlink,
      isAnonymous: isAnonymous,
      topicsSelected: this.state.topicsSelected
    };
    console.log("Data to be sent to backend: ", data);
    axios.defaults.withCredentials = true;
    const Token = localStorage.getItem("token");
    console.log("TOKENNNNN: ", Token);
    axios
      .post(window.base_url + `/question`, data, {
        headers: { Authorization: Token }
      })
      .then(
        response => {
          console.log("Status Code : ", response.status);
          console.log("Data from node : ", response.data);
        },
        err => {
          console.log("ERROR : ", err);
        }
      );
  };

  // topicsSelected 5ccca5121c9d4400009dbb95 true
  // topicsSelected 5ccca5121c9d4400009dbb95 false
  // topicsSelected 5cce04141c9d44000084d856 true
  // topicsSelected 5cce04141c9d44000084d856 false
  // topicsSelected 5ccca5121c9d4400009dbb95 true
  // topicsSelected 5cce04141c9d44000084d856 true

  // this.setState({ myArray: [...this.state.myArray, 'new value'] }) //simple value
  // this.setState({ myArray: [...this.state.myArray, ...[1,2,3] ] })

  onChangeHandler1 = e => {
    //topicscheck
    console.log(
      "SOMETHINGGGGG ",
      e.target.name,
      e.target.value,
      e.target.checked
    );
    if (e.target.checked === true) {
      this.setState({
        topicsSelected: this.state.topicsSelected.concat(e.target.value)
      });
    } else if (e.target.checked === false) {
      let index = this.state.topicsSelected.indexOf(e.target.value);
      console.log("INDEX: ", index);
      this.state.topicsSelected.splice(index, 1);
      this.setState({
        topicsSelected: this.state.topicsSelected
      });
    }
    console.log("topicsSelected Array: ", this.state.topicsSelected);
  };
  toggleClass = e => {
    console.log("THIS IS THE CURRENT TAB NAME: ", e);
    if (e === "addQuestionTab") {
      console.log("addQuestion: activeTab");
      this.setState({
        addQuestion: "activeTab",
        shareLink: "inactiveTab"
      });
    } else if (e === "shareLinkTab") {
      console.log("shareLink: activeTab");
      this.setState({
        shareLink: "activeTab",
        addQuestion: "inactiveTab"
      });
    }
    // this.state = { showPopup: false, showButtons: false };
    // let isVisible = false;
  };

  //new
  componentDidMount() {
    this.props.getQuestions();
    const token = localStorage.getItem("token");
    console.log("TOKEN: ", token);
    const data = { token: token };
    console.log("DATA: ", data);
    this.props.getProfileName(data);
    // this.props.getAllTopics();
    axios.defaults.withCredentials = true;
    axios.get(window.base_url + `/topic/all`).then(response => {
      console.log("Status Code : ", response.status);
      console.log("Data from node : ", response.data);
      this.setState(
        {
          topics: response.data
        },
        err => {
          console.log("Error : ", err);
        }
      );
    });
  }
  //
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }


  render() {
    //new
    let checkprops = this.props;
    console.log("checkprops: ", checkprops);
    let name = ""; //this.props.profile.profiledetails.name;
    console.log(name);
    const { questions } = this.props.questions;

    if (questions === null) return <div />;

    const questionsList = questions.map((question, index) => (
      <Questions key={index} question={question}  />
    ));
    //iterate over books to create a table row

    console.log("in course:" + this.props.match.params.Id);

    console.log("this.state.topics: ", this.state.topics);
    console.log("this.state.topicsSelected: ", this.state.topicsSelected);
    //this.state.topics[i].topicName
    //this.state.topics[i]._id

    let renderTopicsCheckbox = (this.state.topics || []).map(t => {
      return (
        <div class="custom-control">
          <input
            type="checkbox"
            class="custom-control-input"
            name="topicsSelected"
            value={t.topicName}
            id={t._id}
            onChange={this.onChangeHandler1}
          />
          <label class="custom-control-label" for={t._id}>
            {t.topicName}
          </label>
        </div>
      );
    });

    //   const { activeTab } = this.state;
    //   const TabLabel = ({ active, text, onClick }) =>
    // <li onClick={onClick} className={active ? 'is-active' : null}>
    //   <h2>{text}</h2>
    // </li>

    return (
      <div className="container container-fluid">
      <Switch>
        <Route path="/home/messages/create" component={CreateMessage1} />
        <Route path="/home/messages/:_id" component={ViewConversation1} />
        <Route path="/home/messages" component={DisplayAllMessages1} />
      </Switch>
        <div className="row">
          <div className="col-md-2">
            <HomeSideBar id={this.props.match.params.Id} />
          </div>

          <div className="col-md-8">
            <div className="card questionCard">
              <div>
                <div>
                  <span>
                    <div className="hover-menu ">
                      <div className="hover-menu-contents askheader">
                        <Link to="#profileImage">
                          <span className="expanded">
                            <span className="photoWrapper homex">
                              <div id="#123">
                                <span className="photo-tooltip">
                                  <img
                                    className="profileImage"
                                    height="50px"
                                    width="50px"
                                    
                                  />
                                </span>
                              </div>
                            </span>
                            <span>
                              <Link to="/profile" className="user">
                                {name}
                              </Link>
                              <br />
                            </span>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </span>
                </div>
                {/*below will get an pop up*/}
                <button
                  // to="/dashboard"
                  style={{
                    background: "none",
                    border: "none",
                    padding: "0",
                    cursor: "pointer"
                  }}
                  onClick={this.togglePopup.bind(this)}
                  className="AskQuestionButton"
                  type="button"
                  data-toggle="modal"
                  data-target="#AskQuestionModal"
                >
                  What is your question or link ?
                </button>
                <div
                  class="modal"
                  id="AskQuestionModal"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="AskQuestionModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content" style={{ width: "600px" }}>
                      <div id="AskQuestionModalHeader" class="modal-header">
                        {/* <h4 class="modal-title" id="AskQuestionModalLabel">Modal title</h4> */}
                        <h4 class="modal-title" id="AskQuestionModalLabel">
                          {/* <!-- Nav tabs --> */}
                          <ul class="nav nav-tabs">
                            <li
                              role="presentation"
                              className={this.state.addQuestion}
                              onClick={this.toggleClass.bind(
                                this,
                                "addQuestionTab"
                              )}
                            >
                              <a
                                href="#addQuestionTab"
                                aria-controls="addQuestionTab"
                                role="tab"
                                data-toggle="tab"
                              >
                                Add Question
                              </a>
                            </li>
                            <li
                              role="presentation"
                              className={this.state.shareLink}
                              onClick={this.toggleClass.bind(
                                this,
                                "shareLinkTab"
                              )}
                            >
                              <a
                                href="#shareLinkTab"
                                aria-controls="shareLinkTab"
                                role="tab"
                                data-toggle="tab"
                              >
                                Share Link
                              </a>
                            </li>
                          </ul>
                        </h4>
                        <button
                          type="button"
                          class="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div
                        id="AskQuestionModalBody"
                        class="modal-body"
                        style={{ height: "300px" }}
                      >
                        <div role="tabpanel">
                          {/* <!-- Tab panes --> */}
                          <div class="tab-content">
                            <div
                              role="tabpanel"
                              class="tab-pane active"
                              id="addQuestionTab"
                            >
                              {/* Add Question Tab */}
                              <div>
                                <img
                                  src={`http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png`}
                                  alt={name}
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                    borderRadius: "20px",
                                    marginRight: "5px"
                                  }}
                                />
                                {name} asked{" "}
                                <span style={{ display: "inline-block" }}>
                                  <select
                                    class="form-control"
                                    id="identity"
                                    name="identity"
                                    onChange={this.onChangeHandler}
                                    style={{
                                      backgroundColor: "#F3F3F3",
                                      color: "#666666",
                                      borderRadius: "20px",
                                      border: "none",
                                      height: "25px",
                                      width: "auto"
                                    }}
                                  >
                                    <option value="public">Public</option>
                                    <option value="anonymous">Anonymous</option>
                                  </select>
                                </span>
                              </div>
                              <div>
                                <textarea
                                  id="addquestiontextarea"
                                  class="form-control"
                                  name="newquestion"
                                  onChange={this.onChangeHandler}
                                  placeholder='Start your question with "What", "How", "Why", etc'
                                />
                                <hr />
                                <input
                                  class="form-control"
                                  id="addquestioninput"
                                  name="questionlink"
                                  onChange={this.onChangeHandler}
                                  placeholder="Optional: include a link that gives context"
                                />
                              </div>
                              <div />
                            </div>
                            <div
                              role="tabpanel"
                              class="tab-pane"
                              id="shareLinkTab"
                            >
                              {/* Share Link Tab */}
                              <div>
                                <img
                                  src={`http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png`}
                                  alt={name}
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                    borderRadius: "20px",
                                    marginRight: "5px"
                                  }}
                                />
                                {name} shared{" "}
                              </div>
                              <div>
                                <textarea
                                  id="sharelinktextarea"
                                  class="form-control"
                                  name="newquestion"
                                  onChange={this.onChangeHandler}
                                  placeholder='Say something about this...'
                                />
                                <hr />
                                <input
                                  class="form-control"
                                  id="sharelinkinput"
                                  name="questionlink"
                                  onChange={this.onChangeHandler}
                                  placeholder="Enter a link"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        id="AskQuestionModalFooter"
                        class="modal-footer"
                        style={{ height: "10px", marginBottom: "20px" }}
                      >
                        <button
                          id="messagesClose"
                          type="button"
                          class="btn btn-default"
                          data-dismiss="modal"
                          style={{
                            marginTop: "50px",
                            background: "transparent",
                            color: "#949494",
                            fontSize: "15px",
                            fontWeight: "normal",
                            lineHeight: "1.4"
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          class="btn btn-primary save"
                          data-dismiss="modal"
                          data-toggle="modal"
                          data-target="#SelectTopicsModal"
                          style={{
                            borderRadius: "3px",
                            fontWeight: "bold",
                            background: "#3e78ad",
                            color: "#fff",
                            border: "1px solid #3a66ad"
                          }}
                        >
                          Add Question
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="modal"
                  id="SelectTopicsModal"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="SelectTopicsModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog" role="document">
                    <div class="modal-content" style={{ width: "600px" }}>
                      <div class="modal-header">
                        <h5
                          class="modal-title"
                          id="SelectTopicsModalLabel"
                          style={{
                            fontSize: "19px",
                            fontWeight: "bold",
                            color: "#333"
                          }}
                        >
                          {this.state.newquestion}
                        </h5>
                        <button
                          type="button"
                          class="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body" style={{ height: "300px" }}>
                        <p>
                          <b>Add topics that best describe your question</b>
                        </p>
                        <hr />
                        {renderTopicsCheckbox}
                      </div>
                      <div
                        class="modal-footer"
                        style={{ height: "10px", marginBottom: "20px" }}
                      >
                        <button
                          id="messagesClose"
                          type="button"
                          class="btn btn-default"
                          data-dismiss="modal"
                          style={{
                            marginTop: "50px",
                            background: "transparent",
                            color: "#949494",
                            fontSize: "15px",
                            fontWeight: "normal",
                            lineHeight: "1.4"
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          onClick={this.mapTopicsToQuestion}
                          type="button"
                          type="submit"
                          name="send"
                          data-toggle="modal"
                          data-target="#SelectTopicsModal"
                          class="btn btn-primary"
                          style={{
                            borderRadius: "3px",
                            marginTop: "50px",
                            fontWeight: "bold",
                            background: "#3e78ad",
                            color: "#fff",
                            border: "1px solid #3a66ad"
                          }}
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="feed">{questionsList}</div>
          </div>

          <div className="col-md-2" />
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  questions: PropTypes.object.isRequired,
  getProfileName: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  loginStateStore: state.auth,
  questions: state.questions,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getQuestions, getProfileName }
)(withRouter(Home));
