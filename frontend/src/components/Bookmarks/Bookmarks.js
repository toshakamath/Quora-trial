import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import "../../App.css";
import "./Bookmarks.css";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import HomeSideBar from "../HomeSideBar/HomeSideBar";
import { getQuestions } from "../../Actions/questionsAction";
import PropTypes from "prop-types";
import {getProfileName} from "../../Actions/profileAction";

class Bookmarks extends Component {
  constructor(props) {
    super(props);
    this.state = {
        Bookmarks:[]
     };
  }
  componentDidMount() {
        axios.defaults.withCredentials = true;
        const Token=localStorage.getItem("token")
        axios.get(window.base_url+`/bookmark/bookmarked`, {headers:{Authorization:Token}})
          .then((response) => {
            console.log("Status Code : ", response.status);
            console.log("Data from node : ", response.data);
            this.setState({
                Bookmarks: response.data
              },(err)=>{
                console.log("Error : ", err);
              })
          });
  }

  render() {


    const education = [];
    Object.assign(education, this.state.Bookmarks);
   
  //  Const bookmark=education.map(bookmark=>)
    return (
      <div className="container container-fluid">
        <div className="row">
          <div className="col-md-2">
            <HomeSideBar id={this.props.match.params.Id} />
          </div>
          <div className="col-md-8">
            <div className="card questionCard">
            </div>
            {/* <div className="feed">{questionsList}</div> */}
          </div>

          <div className="col-md-2" />
        </div>
      </div>
    );
  }
}

Bookmarks.propTypes = {
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
)(withRouter(Bookmarks));