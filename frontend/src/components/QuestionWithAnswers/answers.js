import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import axios from "axios";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import Profile from "../Profile/Profile";
import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";
import Answer from "../Answer/Answer";
import "../../App.css";
//import "./Dashboard.css";
import Questions from "../Questions/questions";
import { getQuestions } from "../../Actions/questionsAction";
import PropTypes from "prop-types";


class answers extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        this.props.getQuestions();
    }


    //Dummy componenet did mount
    render() {
        const { questions } = this.props.questions;

        if (questions === null)
            return <div></div>


        return (
            <div>
                <Navbar />

                <div className="page-content">

                    {/* 
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/Answer" component={Answer} />
            <Route path="/profile" component={Profile} />
          </Switch> */}
                </div>
            </div>
        );
    }
}




answers.propTypes = {
    getQuestions: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    questions: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    loginStateStore: state.auth,
    questions: state.questions
});

export default connect(
    mapStateToProps,
    { getQuestions }
)(withRouter(answers));
