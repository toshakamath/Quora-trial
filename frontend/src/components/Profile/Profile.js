import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import Followers from "../Followers/Followers";
import Following from "../Following/Following";
import yourAnswers from "../yourAnswers/yourAnswers";
import yourQuestions from "../yourQuestions/yourQuestions";
import ProfileSidebar from "../ProfileSidebar/ProfileSidebar";
import { getProfile } from "../../Actions/profileAction";
import ReactQuill, { Quill, Mixin } from "react-quill";

import "react-quill/dist/quill.snow.css";
import "../../App.css";
import "./Profile.css";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2
} from "react-html-parser";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileData: "",
      name: "",
      follower: "",
      bio: "",
      file: "",
      profileImage: "",
      education: [],
      experience: [],
      text: "",
      followercount: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.editHandler = this.editHandler.bind(this);
    this.profilenameUpadate = this.profilenameUpadate.bind(this);
    this.bioUpadate = this.bioUpadate.bind(this);
    this.bioEditHandler = this.bioEditHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  fileHandler = e => {
    this.setState({
      file: e.target.files[0]
    });
  };

  handleChange(value) {
    this.setState({ bio: value });
  }
  bioUpadate(e) {
    e.preventDefault();
    console.log(this.state.bio);
    const Token = localStorage.getItem("token");
    const data = {
      bio: this.state.bio
    };
    axios
      .post(window.base_url + "/profile", data, {
        headers: { Authorization: Token }
      })
      .then(res => {
        console.log(res.data.bio);
        this.setState({
          bio: res.data.bio
        });
        document.getElementById("bioForm").classList.toggle("hidden");
        document.getElementById("bioField").classList.toggle("hidden");
      });
  }
  profilenameUpadate(e) {
    e.preventDefault();
    const Token = localStorage.getItem("token");
    const data = {
      firstname: this.state.name
    };
    axios
      .post(window.base_url + "/profile/user", data, {
        headers: { Authorization: Token }
      })
      .then(res => {
        console.log(res.data.firstName);
        this.setState({
          name: res.data.firstName
        });
        document.getElementById("nameForm").classList.toggle("hidden");
        document.getElementById("nameField").classList.toggle("hidden");
      });
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  componentDidMount() {
    const Token = localStorage.getItem("token");
    if (!localStorage.getItem("auth")) {
      console.log("true");
      this.props.history.push("/login");
    }
    console.log(Token);
    axios
      .get(window.base_url + "/profile", {
        headers: { Authorization: Token }
      })
      .then(response => {
        this.setState({
          profileData: response.data,
          name: response.data.user.firstName,
          bio: response.data.bio,
          profileImage: response.data.profileImage,
          education: [...response.data.education],
          experience: [...response.data.experience],
          followercount: response.data.followers.length
        });
      }, (err)=>{
        console.log("ERROR: ", err);
      });
  }
  bioEditHandler(e) {
    document.getElementById("bioForm").classList.toggle("hidden");
    document.getElementById("bioField").classList.toggle("hidden");
  }
  editHandler(e) {
    document.getElementById("nameForm").classList.toggle("hidden");
    document.getElementById("nameField").classList.toggle("hidden");
  }
  logOut(e) {
    //e.prventDefault()
    localStorage.removeItem("token");

    this.props.history.push("login");
  }
  onSubmit(e) {
    let Token = localStorage.getItem("token");
    e.preventDefault();
    let data = new FormData();

    data.append("file", this.state.file);

    axios
      .post(`${window.base_url}/profile/profileImage`, data, {
        headers: { Authorization: Token }
      })
      .then(response => {
        console.log(response.data.imageUrl);
        this.setState({
          profileImage: response.data.profileImage
        });
      });
  }
  render() {
    // console.log(this.state.name);
    // let deltaOps = this.state.name;
    // console.log(deltaOps);
    // var htmlText = QuillDeltaToHtmlConverter(deltaOps, {}).convert();
    const education = [];
    Object.assign(education, this.state.education);
    const Education = education.map((education, index) => {
      return (
        <div key={index}>
          <Link to="#">
            <i className="fas fa-graduation-cap" /> {education.school}
          </Link>
        </div>
      );
    });

    const experience = [];
    Object.assign(experience, this.state.experience);
    const Experience = experience.map((experience, index) => {
      return (
        <div key={index}>
          <Link to="#">
            <i className="fas fa-briefcase" /> {experience.company}
          </Link>
        </div>
      );
    });
    return (
      <div className="container profileWrapper">
        <div className="row">
          <div className="col-9 profileLeftWrapper">
            <div className="container leftInner">
              <div className="row">
                <div className="col-12 profileBoxWrapper">
                  <div className="row">
                    <div className="col-2 leftWrapper profileImageWrapper">
                      <div
                        className="modal"
                        id="profileImageChange"
                        role="dialog"
                        aria-labelledby="DisplayAllMessagesLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog" role="document">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5
                                className="modal-title"
                                id="DisplayAllMessagesLabel"
                                style={{
                                  fontSize: "19px",
                                  fontWeight: "bold",
                                  color: "#333",
                                  borderRadius: "4px 4px 0 0"
                                }}
                              >
                                <b>Edit profile photo</b>
                              </h5>
                              <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                              >
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div className="modal-body">
                              <div>
                                <form
                                  onSubmit={this.onSubmit}
                                  encType="multipart/form-data"
                                >
                                  <input
                                    className="form-control"
                                    type="file"
                                    onChange={this.fileHandler}
                                    required
                                  />
                                  <button
                                    type="submit"
                                    className="btn btn-primary"
                                  >
                                    Send
                                  </button>
                                </form>
                              </div>
                            </div>
                            <div
                              className="modal-footer"
                              style={{ height: "20px", marginBottom: "50px" }}
                            />
                          </div>
                        </div>
                      </div>
                      <img
                        src={`${window.base_url}/files/${
                          this.state.profileImage
                        }`}
                        className="rounded-circle"
                        alt="username"
                        height="100"
                        width="100"
                      />
                      <span>
                        <button
                          className="edit-button"
                          data-toggle="modal"
                          data-target="#profileImageChange"
                        >
                          Edit Profile photo
                        </button>
                      </span>
                    </div>
                    <div className="col-10 rightWrapper profileContentWrapper">
                      <div className="col-12 nameWrappeer">
                        <span id="nameField">
                          {this.state.name}
                          {/* {ReactHtmlParser(htmlText)} */}
                          <span className="smallFont">
                            {" "}
                            <Link to="#" onClick={this.editHandler}>
                              Edit
                            </Link>
                          </span>
                        </span>

                        <form
                          className="profileHeader hidden"
                          onSubmit={this.profilenameUpadate}
                          id="nameForm"
                        >
                          <div className="row">
                            <div className="col-10">
                              <input
                                type="text"
                                name="name"
                                value={this.state.name}
                                onChange={this.onChange}
                                className="form-control"
                              />
                            </div>
                            <div className="col-2">
                              <button className="btn btn-primary" type="submit">
                                Update
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                      <div className="col-12 bioWrapper">
                        <span id="bioField">
                          <div>{this.state.bio} </div>
                          <span className="smallFont">
                            {" "}
                            <Link to="#" onClick={this.bioEditHandler}>
                              Edit Bio
                            </Link>
                          </span>
                        </span>

                        <form
                          className="profileHeader hidden"
                          onSubmit={this.bioUpadate}
                          id="bioForm"
                        >
                          <div className="row">
                            <div className="col-10">
                              <ReactQuill
                                value={this.state.bio}
                                onChange={this.handleChange}
                              />

                              {/* <textarea
                                name="bio"
                                className="form-control"
                                value={this.state.bio}
                                onChange={this.onChange}
                              /> */}
                            </div>
                            <div className="col-2">
                              <button className="btn btn-primary" type="submit">
                                Update
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                      <div className="col-12 followWrapper">
                        {this.state.followercount} followers
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="container">
                    <div className="row">
                      <div className="col-3 leftWrapperfeedSidebarWrapper">
                        <ProfileSidebar />
                      </div>
                      <div className="col-9 rightWrapper ProfileActivityWrapper">
                        <Switch>
                          <Route
                            path="/profile/yourAnswers"
                            component={yourAnswers}
                          />
                          <Route
                            path="/profile/yourQuestions"
                            component={yourQuestions}
                          />
                          <Route
                            path="/profile/followers"
                            component={Followers}
                          />
                          <Route
                            path="/profile/following"
                            component={Following}
                          />
                        </Switch>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-3 profileRightWrapper">
            <div className="row">
              <div className="col-12 credentialWrapper profileSidebar">
                <h3 className="credflex">
                  Credentials & Highlights{" "}
                  <Link
                    to="#xyz"
                    data-toggle="modal"
                    data-target="#Displaycred"
                  >
                    {" "}
                    <i className="fas fa-pencil-alt" />{" "}
                  </Link>
                  <div
                    className="modal"
                    id="Displaycred"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="DisplayAllMessagesLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content" style={{ width: "600px" }}>
                        <div className="modal-header">
                          <h5
                            className="modal-title"
                            id="DisplayAllMessagesLabel"
                            style={{
                              fontSize: "19px",
                              fontWeight: "bold",
                              color: "#333",
                              borderRadius: "4px 4px 0 0"
                            }}
                          >
                            <b>Messages</b>
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body" style={{ height: "500px" }}>
                          <div />
                        </div>
                        <div
                          className="modal-footer"
                          style={{ height: "20px", marginBottom: "50px" }}
                        >
                          <button
                            type="button"
                            id="messagesClose"
                            style={{
                              marginTop: "80px",
                              background: "transparent",
                              color: "#949494",
                              fontSize: "15px",
                              fontWeight: "normal",
                              lineHeight: "1.4"
                            }}
                            className="btn"
                            data-dismiss="modal"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary"
                            data-toggle="modal"
                            data-target="#CreateMessage"
                            style={{
                              borderRadius: "3px",
                              fontWeight: "bold",
                              background: "#3e78ad",
                              color: "#fff",
                              border: "1px solid #3a66ad"
                            }}
                          >
                            New Message
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </h3>

                {Experience}
                {Education}
              </div>
              <div className="col-12 topicWrapper profileSidebar">
                <h3 className="credflex">
                  Konws About{" "}
                  <Link to="#abc">
                    <i className="fas fa-pencil-alt" />
                  </Link>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Profile.propTypes = {
  //login: PropTypes.func.isRequired,
  //profile: PropTypes.func.isRequired,
  //auth: PropTypes.object.isRequired
  //errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  {}
)(withRouter(Profile));

//let user = !this.props.profile.profile || this.props.profile.profile.user;

// Profile.propTypes = {
//   profile: PropTypes.object.isRequired,
//   getProfile: PropTypes.func.isRequired
// };

// const mapStateToProps = state => ({
//   auth: state.auth,
//   profile: state.profile
// });
