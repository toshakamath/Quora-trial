import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import "../../App.css";
import "./Content.css";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import HomeSideBar from "../HomeSideBar/HomeSideBar";
//new vaibhav
import Questions from "../Questions/questions";
import { getQuestions } from "../../Actions/questionsAction";
import PropTypes from "prop-types";
import {getProfileName} from "../../Actions/profileAction";
import ContentSideBar from "../ContentSideBar/ContentSideBar";


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { 
     };
  }
  
  render() {

    return (
      <div className="container container-fluid">
        <div className="row">
          <div className="col-md-2">
            <ContentSideBar id={this.props.match.params.Id} />
          </div>

          <div className="col-md-8">
          <p><b style={{fontSize:"15px"}}>Your Content</b></p>
            <div className="card questionCard">
              </div>
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
