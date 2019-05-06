import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { Link, withRouter } from "react-router-dom";
import Profile from "../Profile/Profile";
import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";
import Answer from "../Answer/Answer";
import Search from "../Search/Search";
import ViewQuestion from "../ViewQuestion/ViewQuestion";
import "../../App.css";
import "./Dashboard.css";
import ConversationsList from "../Message/ConversationsList";
import CreateMessage from "../Message/CreateMessage";
import Content from "../Content/Content";
// import Questions from "../Questions/questions";
// import { getQuestions } from "../../Actions/questionsAction";
// import PropTypes from "prop-types";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.state = {
      showPopup: false
    };
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  //Dummy componenet did mount
  render() {
    return (
      <div>
        <Navbar />

        <div className="page-content">
          <Switch>
            <Route path="/home/inbox/createmessage" component={CreateMessage} />
            <Route path="/home/inbox" component={ConversationsList} />
            <Route path="/home" component={Home} />
            <Route path="/Answer" component={Answer} />
            <Route path="/profile" component={Profile} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(Dashboard);
