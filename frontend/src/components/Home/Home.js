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
import { getQuestions } from "../../Actions/questionsAction";
import PropTypes from "prop-types";
import {getProfileName} from "../../Actions/profileAction";


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      showPopup: false,
      addQuestion: "activeTab",
      shareLink: "inactiveTab"
     };
  }
  onChangeHandler(e){   //identity, newquestion, questionlink
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  addQuestion(e){
    //get question name from props here and use in next modal
    // let question_name= this.props.
  }
  mapTopicsToQuestion(e){

  }
  onChangeHandler1(e){    //topicscheck
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  toggleClass(e) {
    console.log("THIS IS THE CURRENT TAB NAME: ", e);
    if(e==="addQuestionTab"){
      console.log("addQuestion: activeTab");
    this.setState({
      addQuestion: "activeTab",
      shareLink: "inactiveTab"
    })
  }
    else if(e==="shareLinkTab"){
      console.log("shareLink: activeTab");
      this.setState({
        shareLink: "activeTab",
        addQuestion:"inactiveTab"
      })
    }
  }
  //new
  componentDidMount() {
    this.props.getQuestions();
    const token = localStorage.getItem("token");
    console.log("TOKEN: ",token);
    const data = { token: token };
    console.log("DATA: ", data);
    this.props.getProfileName(data);
    //this.props.getAllTopics();
  }
  //
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }
  
  render() {
    //new
    let checkprops =this.props;
    console.log("checkprops: ", checkprops);
    let name= "Laxmikant Pandhare";              //this.props.profile.profiledetails.name;
    console.log(name);
    const { questions } = this.props.questions;

    if (questions === null) return <div />;

    const questionsList = questions.map(question => (
      <Questions question={question} />
    ));
    //iterate over books to create a table row

    console.log("in course:" + this.props.match.params.Id);

  //   const { activeTab } = this.state;
  //   const TabLabel = ({ active, text, onClick }) => 
  // <li onClick={onClick} className={active ? 'is-active' : null}>
  //   <h2>{text}</h2>
  // </li>

    return (
      <div className="container container-fluid">
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
                                    src={`https://qph.fs.quoracdn.net/main-thumb-70332528-50-qpikqkavbsrjbupveiqfitmnpiraxvsw.jpeg`}
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
                  style={{ background: "none", border: "none", padding: "0", cursor: "pointer" }}
                  onClick={this.togglePopup.bind(this)}
                  className="AskQuestionButton"
                  type="button"
                  data-toggle="modal" data-target="#AskQuestionModal"
                >
                  What is your question or link ?
                </button>
                <div class="modal" id="AskQuestionModal" tabindex="-1" role="dialog" aria-labelledby="AskQuestionModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content" style={{ width: "600px" }}>
                      <div id="AskQuestionModalHeader" class="modal-header">
                        
                        {/* <h4 class="modal-title" id="AskQuestionModalLabel">Modal title</h4> */}
                        <h4 class="modal-title" id="AskQuestionModalLabel">
                         {/* <!-- Nav tabs --> */}
                        <ul class="nav nav-tabs">
                            {/* <TabLabel
                              onClick={this.toggleClass.bind(this, 'addQuestionTab')}
                              active={activeTab === 'addQuestionTab'}
                              text="Add Question"
                            />
                            <TabLabel
                              onClick={this.toggleClass.bind(this, 'shareLinkTab')}
                              active={activeTab === 'shareLinkTab'}
                              text="Share Link"
                            /> */}
                            <li role="presentation" className={this.state.addQuestion} onClick={this.toggleClass.bind(this, 'addQuestionTab')}><a href="#addQuestionTab" aria-controls="addQuestionTab" role="tab" data-toggle="tab">Add Question</a>
                            </li>
                            <li role="presentation" className={this.state.shareLink} onClick={this.toggleClass.bind(this, 'shareLinkTab')}><a href="#shareLinkTab" aria-controls="shareLinkTab" role="tab" data-toggle="tab">Share Link</a>
                            </li>
                          </ul>
                          </h4>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div id="AskQuestionModalBody" class="modal-body" style={{ height: "300px" }}>
                        <div role="tabpanel">
                          {/* <!-- Tab panes --> */}
                          <div class="tab-content">
                            <div role="tabpanel" class="tab-pane active" id="addQuestionTab">
                            {/* Add Question Tab */}
                            <div>
                            <img src={`http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png`} alt={name} style={{ width: "30px", height: "30px", borderRadius: "20px", marginRight:"5px" }} />
                              {name} asked <span style={{display:"inline-block"}}>
                                  <select class="form-control" id="identity" name="identity" onChange={this.onChangeHandler}
                                  style={{backgroundColor:"#F3F3F3", color:"#666666", borderRadius: "20px", border:"none", height:"25px", width:"auto"}}>
                                    <option value="public">Public</option>
                                    <option value="anonymous">Anonymous</option>
                                  </select>
                                </span>
                            </div>
                            <div>
                            <textarea id="addquestiontextarea" class="form-control" name="newquestion" onChange={this.onChangeHandler}
                            placeholder="Start your question with &quot;What&quot;, &quot;How&quot;, &quot;Why&quot;, etc">
                            </textarea>
                            <hr/>
                            <input class="form-control" id="addquestioninput" name="questionlink" onChange={this.onChangeHandler}
                            placeholder="Optional: include a link that gives context" >
                            </input>
                            </div>
                            <div></div>
                            </div>
                            <div role="tabpanel" class="tab-pane" id="shareLinkTab">Share Link Tab</div>
                          </div>
                        </div>
                      </div>
                      <div id="AskQuestionModalFooter" class="modal-footer" style={{ height: "10px", marginBottom: "20px" }}>
                        <button id="messagesClose" type="button" class="btn btn-default" data-dismiss="modal"
                        style={{ marginTop: "50px", background: "transparent", color: "#949494", fontSize: "15px", fontWeight: "normal", lineHeight: "1.4" }}
                        >Cancel</button>
                        <button type="button" class="btn btn-primary save" data-dismiss="modal" data-toggle="modal" data-target="#SelectTopicsModal"
                        style={{ borderRadius: "3px", fontWeight: "bold", background: "#3e78ad", color: "#fff", border: "1px solid #3a66ad" }}
                        onClick={this.addQuestion}
                        >Add Question</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal" id="SelectTopicsModal" tabindex="-1" role="dialog" aria-labelledby="SelectTopicsModalLabel" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content" style={{ width: "600px" }}>
                      <div class="modal-header">
                        <h5 class="modal-title" id="SelectTopicsModalLabel" style={{ fontSize: "19px", fontWeight: "bold", color: "#333"}}>Is this a static or dynamic question?</h5>
                        <a href="#">
                          <span style={{ float: "right", marginTop: "12px", color: "#e2e2e2" }} class="glyphicon glyphicon-option-horizontal"></span>
                        </a>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body" style={{ height: "300px" }}>
                        <p><b>Add topics that best describe your question</b></p>
                        <hr/>
                        <div class="custom-control">
                          <input type="checkbox" class="custom-control-input" id="topicscheck" onChange={this.onChangeHandler1} />
                          <label class="custom-control-label" for="customCheck1">Check this custom checkbox</label>
                        </div>
                      </div>
                      <div class="modal-footer" style={{ height: "10px", marginBottom: "20px" }}>
                      <button id="messagesClose" type="button" class="btn btn-default" data-dismiss="modal"
                        style={{ marginTop: "50px", background: "transparent", color: "#949494", fontSize: "15px", fontWeight: "normal", lineHeight: "1.4" }}
                        >Cancel</button>
                        <button onClick={this.mapTopicsToQuestion} type="button" type="submit" name="send" data-toggle="modal" data-target="#SelectTopicsModal" class="btn btn-primary" style={{ borderRadius: "3px", marginTop: "50px", fontWeight: "bold", background: "#3e78ad", color: "#fff", border: "1px solid #3a66ad" }}>Done</button>
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
