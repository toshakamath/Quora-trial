import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import * as helper from "../../utils/helper";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import Followers from "../Followers/Followers";
import Following from "../Following/Following";
import yourAnswers from "../yourAnswers/yourAnswers";
import yourQuestions from "../yourQuestions/yourQuestions";
import AllProfiles from "../AllProfiles/AllProfiles";
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
import TopicSideBar from "../HomeSideBar/HomeSideBar";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileData: "",
      name: "",
      followers: [],
      bio: "",
      file: "",
      profileImage: "",
      education: [],
      experience: [],
      text: "",
      followercount: "",
      noProfile: true,
      following: [],
      //personal detail
      fname: "",
      lname: "",
      company: "",
      city: "",
      aboutMe: "",
      headline: "",
      zipcode: "",
      stateval: "",
      test: [],
      experience: [],
      tempexp: [],

      exp1: [],

      experienceid: 0,
      showmodaleditexperience: false,
      showmodaladdexperience: false,
      adddesignation: "",
      addcompanyname: "",
      addlocation: "",
      addresponsibility: "",

      addtestdesignation: "",
      addtestcompanyname: "",
      addtestlocation: "",
      addtestresponsibility: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.editHandler = this.editHandler.bind(this);
    this.profilenameUpadate = this.profilenameUpadate.bind(this);
    this.bioUpadate = this.bioUpadate.bind(this);
    this.bioEditHandler = this.bioEditHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handlefieldchanges = event => {
    this.setState({ [event.target.id]: event.target.value });
  };
  //edit profile handler
  savepersonaldetailschanges = e => {
    e.preventDefault();
    console.log("inside save pd call");

    // zipcode validation
    // var regexresult = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(this.state.zipcode);
    //  console.log("Result of zipcode regex", regexresult);

    //us state validation

    // var checkstate = false;
    // if (
    //   helper.stateAbbreviations.includes(this.state.stateval) ||
    //   helper.statenames.includes(this.state.stateval)
    // ) {
    //   checkstate = true;
    // }
    var data = {
      handle: this.state.handle,
      staus: this.state.staus,
      city: this.state.city,
      bio: this.state.bio,
      zipcode: this.state.zipcode,
      state: this.state.stateval,
      profileImage: this.state.profilImage
    };
    console.log("axios pd data is ", data);
    const Token = localStorage.getItem("token");
    axios
      .post("http://localhost:3001/profile", data, {
        headers: { Authorization: Token }
      })
      .then(response => {
        if (response.status === 200) {
          console.log("inside resp status");
          //var isupdated = 1 + this.state.isupdated;
          //his.setState({ isupdated: isupdated });
          //this.fetchprofiledbcall();
          this.props.history.push("/profile");
        } else {
          console.log("error updating");
        }
        //console.log("state", this.state.isupdated);
      });

    // if (regexresult == true && checkstate == true) {
    //   console.log("value of regex is true");
    //   var email = this.props.loginStateStore.result.email;
    //   console.log("Emaild id is:", email);
    //   console.log("About me values is", this.state.aboutMe);
    //   // var data = {
    //   //   handle: this.state.handle,
    //   //   staus: this.state.staus,
    //   //   city: this.state.city,
    //   //   description: this.state.description,
    //   //   zipcode: this.state.zipcode,
    //   //   state: this.state.stateval,
    //   //   profileImage: this.state.profilImage
    //   // };
    //   // console.log("axios pd data is ", data);
    //   // const Token = localStorage.getItem("token");
    //   // axios
    //   //   .post("http://localhost:3001/profile", data, {
    //   //     headers: { Authorization: Token }
    //   //   })
    //   //   .then(response => {
    //   //     if (response.status === 200) {
    //   //       console.log("inside resp status");
    //   //       var isupdated = 1 + this.state.isupdated;
    //   //       this.setState({ isupdated: isupdated });
    //   //       //this.fetchprofiledbcall();
    //   //       this.props.history.push("/profile");
    //   //     } else {
    //   //       console.log("error updating");
    //   //     }
    //   //     console.log("state", this.state.isupdated);
    //   //   });
    // } else if (regexresult == false && checkstate == true) {
    //   console.log("Invalid US zip code");
    //   alert("Please enter a valid US zip code!!");
    // } else if (regexresult == true && checkstate == false) {
    //   console.log("Invalid US state: malformed_state exception");
    //   alert("Please enter a valid US State!!,malformed_state exception");
    // } else {
    //   console.log(
    //     "Invalid US zip code && Invalid US state: malformed_state exception"
    //   );
    //   alert(
    //     "Please enter a valid US zip code and State!!:malformed_state exception"
    //   );
    // }
  };
  //edit profile handler finished
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
    console.log(localStorage.getItem("name"));
    const name = localStorage.getItem("name");
    // if (!localStorage.getItem("auth")) {
    //   console.log("true");
    //   this.props.history.push("/login");
    // }
    console.log(Token);
    axios
      .get(window.base_url + "/profile", {
        headers: { Authorization: Token }
      })
      .then(response => {
        console.log(response.data);

        console.log(response.data);
        console.log("localstorage", localStorage.getItem("name"));
        console.log(response.status);
        if (response.data.message) {
          this.setState({
            name: localStorage.getItem("name")
          });
        } else {
          this.setState({
            profileData: response.data,
            name: response.data.user.firstName,
            bio: response.data.bio,
            profileImage: response.data.user.profileImage,
            education: [...response.data.education],
            experience: [...response.data.experience],
            followercount: response.data.followers.length,
            followers: [...response.data.followers],
            following: [...response.data.following],
            noProfile: false
          });
          console.log("local name", this.state.name);
        }
      })
      .catch(err => this.props.history.push("/profile"));
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

  //experience handler
  handleeditexperiencemodal = id => {
    console.log("Index is", id);
    this.setState({
      experienceid: id,
      showmodaleditexperience: true
    });
  };

  handledeleteexperiencemodal = id => {
    var experience = [...this.state.experience];

    var index = id;
    if (index > -1) {
      experience.splice(index, 1);
    }
    // array = [2, 9]
    console.log("Experience is ", experience);
    var email = this.props.loginStateStore.result.email;
    console.log("Emaild id is:", email);

    var data = { email: email, experience: experience };
    axios.post("http://localhost:3001/profile", data).then(response => {
      console.log("Resose", response);
      if (response.status === 200) {
        console.log("Inside del");
        this.setState({ isExpUpdated: true });
      }
      this.fetchprofiledbcall();
    });
  };
  handleaddexperiencemodal = () => {
    console.log("test");
    this.setState({
      showmodaladdexperience: true
    });
  };
  render() {
    //personal details
    var modalpersonaldetails = (
      <div>
        <div>
          <div>
            <button
              type="button"
              class="profile-btn btn btn-primary changebtn"
              data-toggle="modal"
              data-target="#basicExampleModal"
            >
              Edit Personal Details
            </button>
          </div>

          <div
            class="modal fade modalStyle"
            id="basicExampleModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div
              class="modal-dialog modal-lg modalStyle"
              role="document"
              width="750px"
              margin="auto"
            >
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Personal Details
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
                <div class="modal-body">
                  <div className="form-group">
                    <label className="grey-text">Handle</label>
                    <input
                      label="currentposition"
                      icon="fa-map-pin"
                      group
                      value={this.state.handle}
                      type="text"
                      id="handle"
                      validate
                      error="wrong"
                      success="right"
                      onChange={this.handlefieldchanges}
                      className="form-input form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label className="grey-text">Current Position</label>
                    <input
                      label="currentposition"
                      icon="fa-map-pin"
                      group
                      value={this.state.status}
                      type="text"
                      id="status"
                      validate
                      error="wrong"
                      success="right"
                      onChange={this.handlefieldchanges}
                      className="form-input form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label className="grey-text">City</label>
                    <input
                      label="country"
                      icon="fa-map-pin"
                      group
                      value={this.state.city}
                      type="text"
                      id="city"
                      validate
                      error="wrong"
                      success="right"
                      onChange={this.handlefieldchanges}
                      className="form-input form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label className="grey-text">About Me</label>
                    <input
                      label="aboutMe"
                      icon="fa-map-pin"
                      group
                      value={this.state.bio}
                      type="text"
                      id="bio"
                      validate
                      error="wrong"
                      success="right"
                      onChange={this.handlefieldchanges}
                      className="form-input form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label className="grey-text">State</label>
                    <input
                      label="stateval"
                      icon="fa-map-pin"
                      group
                      value={this.state.stateval}
                      type="text"
                      id="stateval"
                      validate
                      error="wrong"
                      success="right"
                      onChange={this.handlefieldchanges}
                      className="form-input form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label className="grey-text">ZipCode</label>
                    <input
                      label="zipcode"
                      icon="fa-map-pin"
                      group
                      value={this.state.zipcode}
                      type="text"
                      id="zipcode"
                      validate
                      error="wrong"
                      success="right"
                      onChange={this.handlefieldchanges}
                      className="form-input form-control"
                    />
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary changebtn"
                    onClick={this.savepersonaldetailschanges}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    //personal finish
    if (this.state.showmodaladdexperience === true) {
      var modaladdexperience = (
        <div>
          <div>
            <div
              class="modal fade modalStyle"
              id="basicExampleModalExperienceADD"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div
                class="modal-dialog modal-lg modalStyle"
                role="document"
                width="750px"
                margin="auto"
              >
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Experience
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
                  <div class="modal-body">
                    <div>
                      <label className="grey-text">Designation</label>
                      <input
                        label="designation"
                        icon="fa-map-pin"
                        placeholder="your designation"
                        id="addtestdesignation"
                        group
                        type="text"
                        validate
                        error="wrong"
                        success="right"
                        onChange={this.handlefieldchanges}
                        className="form-input form-control"
                      />
                    </div>
                    <div>
                      <label className="grey-text">Company Name</label>
                      <input
                        label="companyname"
                        icon="fa-map-pin"
                        group
                        type="text"
                        placeholder="your workplace's name"
                        id="addtestcompanyname"
                        validate
                        error="wrong"
                        success="right"
                        onChange={this.handlefieldchanges}
                        className="form-input form-control"
                      />
                    </div>
                    <div>
                      <label className="grey-text">Location</label>
                      <input
                        label="Location"
                        icon="fa-map-pin"
                        group
                        type="text"
                        placeholder="your location's place"
                        id="addtestlocation"
                        validate
                        error="wrong"
                        success="right"
                        onChange={this.handlefieldchanges}
                        className="form-input form-control"
                      />
                    </div>
                    <div>
                      <label className="grey-text">Responsibility</label>
                      <input
                        label="Responsibility"
                        icon="fa-map-pin"
                        group
                        type="text"
                        placeholder="your role"
                        id="addtestresponsibility"
                        validate
                        error="wrong"
                        success="right"
                        onChange={this.handlefieldchanges}
                        className="form-input form-control"
                      />
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary"
                      onClick={this.handleaddtoexperiencearray}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    var it = -1;
    const test1 = this.state.test;
    console.log("tempexp is", test1);
    const experiencevar = test1.map((experiencevalues, index) => {
      it = it + 1;
      var id = 0;
      return (
        <div>
          <h5>{experiencevalues.designation}</h5>
          <h5>{experiencevalues.companyname}</h5>
          <h5>{experiencevalues.location}</h5>
          <h5>{experiencevalues.responsibility}</h5>
          <button
            type="button"
            class="profile-btn btn btn-primary"
            onClick={() => this.handledeleteexperiencemodal(index)}
          >
            delete
          </button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button
            type="button"
            class="profile-btn btn btn-primary"
            data-toggle="modal"
            data-target="#basicExampleModalExperience"
            onClick={() => this.handleeditexperiencemodal(index)}
          >
            edit
          </button>
          <hr />
        </div>
      );
    });

    if (
      this.state.showmodaleditexperience === true &&
      this.state.test.length > 0
    ) {
      console.log("tesst is value", this.state.test);
      console.log("id val", this.state.experienceid);
      console.log("exp array", this.state.experience);
      var modaleditexperience = (
        <div>
          <div>
            <div
              class="modal fade modalStyle"
              id="basicExampleModalExperience"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div
                class="modal-dialog modal-lg modalStyle"
                role="document"
                width="750px"
                margin="auto"
              >
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Experience
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
                  <div class="modal-body">
                    <div>
                      <label className="grey-text">Designation</label>
                      <input
                        label="designation"
                        icon="fa-map-pin"
                        value={
                          this.state.experience[this.state.experienceid]
                            .designation
                        }
                        id="designation"
                        group
                        type="text"
                        validate
                        error="wrong"
                        s
                        success="right"
                        onChange={this.handlefieldchangesexperience}
                        className="form-control form-input"
                      />
                    </div>
                    <div>
                      <label className="grey-text">Company Name</label>
                      <input
                        label="companyname"
                        icon="fa-map-pin"
                        group
                        value={
                          this.state.experience[this.state.experienceid]
                            .companyname
                        }
                        type="text"
                        id="companyname"
                        validate
                        error="wrong"
                        success="right"
                        onChange={this.handlefieldchangesexperience}
                        className="form-control form-input"
                      />
                    </div>
                    <div>
                      <label className="grey-text">Location</label>
                      <input
                        label="Location"
                        icon="fa-map-pin"
                        group
                        value={
                          this.state.experience[this.state.experienceid]
                            .location
                        }
                        type="text"
                        id="location"
                        validate
                        error="wrong"
                        success="right"
                        onChange={this.handlefieldchangesexperience}
                        className="form-control form-input"
                      />
                    </div>
                    <div>
                      <label className="grey-text">Responsibility</label>
                      <input
                        label="Responsibility"
                        icon="fa-map-pin"
                        group
                        value={
                          this.state.experience[this.state.experienceid]
                            .responsibility
                        }
                        type="text"
                        id="responsibility"
                        validate
                        error="wrong"
                        success="right"
                        onChange={this.handlefieldchangesexperience}
                        className="form-control form-input"
                      />
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                      onClick={this.canceleditexperiencechanges}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary"
                      onClick={this.saveeditexperiencechanges}
                    >
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    // console.log(this.state.name);
    // let deltaOps = this.state.name;
    // console.log(deltaOps);
    // var htmlText = QuillDeltaToHtmlConverter(deltaOps, {}).convert();
    console.log(this.state.followers);
    const education = [];
    Object.assign(education, this.state.education);
    const followers = [];
    Object.assign(followers, this.state.followers);
    const following = [];
    Object.assign(following, this.state.following);
    const Education = education.map((education, index) => {
      return (
        <div key={index}>
          <Link to="#">
            <i className="fas fa-graduation-cap" /> {education.school}
            <div>{modaladdexperience}</div>
            <div>{experiencevar}</div>
            <div>{modaleditexperience}</div>
            <div className="mt-3">
              <button
                type="button"
                class="profile-btn btn btn-primary changebtn"
                data-toggle="modal"
                data-target="#basicExampleModalExperienceADD"
                onClick={this.handleaddexperiencemodal}
              >
                Add Experience
              </button>
            </div>
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
                      {this.state.profileImage ? (
                        <img
                          src={`${window.base_url}/files/${
                            this.state.profileImage
                          }`}
                          className="rounded-circle"
                          alt="username"
                          height="100"
                          width="100"
                        />
                      ) : (
                        <img
                          src="https://qsf.fs.quoracdn.net/-3-images.new_grid.profile_pic_default_small.png-26-679bc670f786484c.png"
                          alt="proImg"
                          height="35"
                          width="35"
                          className="rounded-circle"
                        />
                      )}

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
                              <button
                                className="btn btn-primary changebtn"
                                type="submit"
                              >
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
                              <button
                                className="btn btn-primary changebtn"
                                type="submit"
                              >
                                Update
                              </button>
                            </div>
                            <div className="col-2">
                              <button
                                className="btn btn-primary changebtn"
                                type="submit"
                              >
                                Update
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                      <div className="col-12 followWrapper">
                        <div className="row">
                          <div className="col-6">
                            {this.state.followercount} followers
                          </div>
                          <div className="col-6">
                            <p className="">{modalpersonaldetails}</p>
                          </div>
                        </div>
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
                          {/* this.state.noProfile ? ( */}
                          {/* // ) : (
                          //   <div>
                          //     <h2>Please create your profile</h2>
                          //   </div>
                          // )} */}
                          <Route path="/profile/All" component={AllProfiles} />
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
                            component={props => (
                              <Followers {...props} followers={followers} />
                            )}
                          />
                          <Route
                            path="/profile/following"
                            component={props => (
                              <Following {...props} following={following} />
                            )}
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
                            <b>Creadentials</b>
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
                          <div className="row">
                            <div className="col-6" />
                            <div className="col-6">
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
                                Submit
                              </button>
                            </div>
                          </div>
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
                <TopicSideBar />
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
