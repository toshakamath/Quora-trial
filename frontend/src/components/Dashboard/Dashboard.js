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
    // const { questions } = this.props.questions;

    // if (questions === null)
    //   return <div></div>

    // const questionsList = questions.map(question => (
    //   <Questions question={question} />
    // ));

    return (
      <div>
        <Navbar />

        <div className="page-content">
          {/*questionsList*/}
          {
            <Switch>
              <Route exact path="/profile" component={Profile} />
              <Route path="/search" component={Search} />
              <Route
                path="/home/inbox/createmessage"
                component={CreateMessage}
              />
              <Route path="/home/inbox" component={ConversationsList} />
              <Route path="/home" component={Home} />
              <Route path="/:questionid" component={ViewQuestion} />
              <Route path="/Answer" component={Answer} />
            </Switch>
          }

          <div>
            {/* <div className="card questionCard">
              <div >
                <div>
                  <span>
                    <div className="hover-menu ">
                      <div className="hover-menu-contents">
                        <Link to="#profileImage" className="navItemLink">
                          <span className="expanded">
                            <span className="photoWrapper">
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
                              <Link to='/profile'>Laxmikant Pandhare.</Link><br />
                            </span>

                          </span>

                        </Link>
                      </div>
                    </div>
                  </span>
                </div>
               
                <Link to='/dashboard' onClick={this.togglePopup.bind(this)}>What is your question or link ?</Link>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Dashboard);
