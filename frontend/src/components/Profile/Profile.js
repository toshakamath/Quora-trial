import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
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
import Axios from "axios";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      profileData: "",
      name: "",
      follower: "",
      bio: "",
      file: "",
      profileImage: ""
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
          profileImage: response.data.profileImage
        });
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
    localStorage.removeItem("jwtToken");

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
        console.log(response.data);
      });
  }
  render() {
    return (
      <div className="container profileWrapper">
        <div className="row">
          <div className="col-9 profileLeftWrapper">
            <div className="container leftInner">
              <div className="row">
                <div className="col-12 profileBoxWrapper">
                  <div className="row">
                    <div className="col-2 leftWrapper profileImageWrapper">
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
                        <button type="submit">Send</button>
                      </form>
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
                        <button className="edit-button" role="submit">
                          Edit Profile photo
                        </button>
                      </span>
                    </div>
                    <div className="col-10 rightWrapper profileContentWrapper">
                      <div className="col-12 nameWrappeer">
                        <span id="nameField">
                          {this.state.name}{" "}
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
                          {this.state.bio}{" "}
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
                  <Link to="#xyz">
                    {" "}
                    <i className="fas fa-pencil-alt" />{" "}
                  </Link>
                </h3>
              </div>
              <div className="col-12 topicWrapper profileSidebar">
                <h3 className="credflex">
                  Konws About{" "}
                  <Link to="#abc">
                    <i class="fas fa-pencil-alt" />
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

export default connect()(withRouter(Profile));

//let user = !this.props.profile.profile || this.props.profile.profile.user;

// Profile.propTypes = {
//   profile: PropTypes.object.isRequired,
//   getProfile: PropTypes.func.isRequired
// };

// const mapStateToProps = state => ({
//   auth: state.auth,
//   profile: state.profile
// });3
