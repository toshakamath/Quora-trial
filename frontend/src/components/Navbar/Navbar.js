import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./Navbar.css";
// import "../Message/ConversationsList";

class Navbar extends Component {
  logOut(e) {
    //e.prventDefault()
    localStorage.removeItem("jwtToken");
    this.props.history.push("/login");
  }

  show(e) {
    document.getElementById("abc").classList.toggle("show");
  }
  render() {
    return (
      <div className="siteHeader">
        <div className="container d-flex justify-content-between">
          <div className="headerLogo">
            <Link to="/home">
              <span className="display-none"></span>
            </Link>
          </div>
          <div className="d-flex justify-content-between">
            <div className="headerNav" role="navigation">
              <span>
                <div className="sideHeaderNavItem">
                  <Link to="/home" className="navItemLink">
                    <div className="u-margin-right-xs u-flex-inline">
                      <span
                        className="ui-icon ui-icon-color-grey icon-size-regular"
                        aria-hidden="true"
                      >
                        <i
                          class="far fa-newspaper"
                          size="width:24px;height:24px"
                        />
                      </span>
                    </div>
                    <span class="badge badge-light bd">4</span>
                    <span className="expanded">Home</span>
                  </Link>
                </div>
              </span>
              <span>
                <div className="sideHeaderNavItem">
                  <Link to="/answer" className="navItemLink">
                    <div className="u-margin-right-xs u-flex-inline">
                      <span
                        className="ui-icon ui-icon-color-grey icon-size-regular"
                        aria-hidden="true"
                      >
                        <i class="far fa-edit" />
                      </span>
                    </div>
                    <span className="expanded">Answer</span>
                  </Link>
                </div>
              </span>
              <span>
                <div className="sideHeaderNavItem">
                  <Link to="/spaces" className="navItemLink">
                    <div className="u-margin-right-xs u-flex-inline">
                      <span
                        className="ui-icon ui-icon-color-grey icon-size-regular"
                        aria-hidden="true"
                      >
                        <i class="fas fa-users" />
                      </span>
                    </div>
                    <span className="expanded">Spaces</span>
                  </Link>
                </div>
              </span>
              <span>
                <div className="sideHeaderNavItem">
                  <Link to="#home" className="navItemLink">
                    <div className="u-margin-right-xs u-flex-inline">
                      <span
                        className="ui-icon ui-icon-color-grey icon-size-regular"
                        aria-hidden="true"
                      >
                        <i class="far fa-bell" />
                      </span>
                    </div>
                    <span className="expanded">Notifications</span>
                  </Link>
                </div>
              </span>
            </div>
            <div className="headerRightWrapper u-flex u-flex-align--center">
              <div className="searchBar">
                <div className="lookupBarSelector selector" tabIndex="-1">
                  <div className="selectorInputWrpaper">
                    <input
                      className="selectorInput text"
                      type="text"
                      data-lpignore="true"
                      autoFocus="true"
                      placeholder="Search Quora"
                    />
                  </div>
                </div>
              </div>
              <div>
                <span>
                  <div className="hover-menu ">
                    <div className="hover-menu-contents">
                      {/* <Link to="eeeee" className="navItemLink"> */}
                      <span className="expanded">
                        <span className="photoWrapper">
                          <div id="#123">
                            <span className="photo-tooltip">
                              <img
                                className="profilephotodropdown"
                                height="50px"
                                width="50px"
                                src={`https://qph.fs.quoracdn.net/main-thumb-70332528-50-qpikqkavbsrjbupveiqfitmnpiraxvsw.jpeg`}
                                type="button" data-toggle="dropdown"
                              />
                              <ul class="dropdown-menu" id="navbardropdown">
                              <li><a href="/profile" class="list-group-item list-group-item-action list-group-item-light">Profile</a></li>
                              <li><a href="/home/inbox" class="list-group-item list-group-item-action list-group-item-light">Messages</a></li>
                              {/* <li><button type="button" class="list-group-item list-group-item-action list-group-item-light" data-toggle="modal" data-target="#DisplayAllMessages">Messages</button></li> */}
                              <li><a href="#" class="list-group-item list-group-item-action list-group-item-light">Your Content</a></li>
                              <li><a href="#" class="list-group-item list-group-item-action list-group-item-light">Stats</a></li>
                              <li><a href="#" class="list-group-item list-group-item-action list-group-item-light">Logout</a></li>
                              <li><a href="#" class="list-group-item list-group-item-action list-group-item-light">Delete Account</a></li>
                              </ul>
                            </span>
                          </div>
                        </span>
                      </span>
                      {/* </Link> */}
                    </div>
                  </div>
                </span>
              </div>
              <div className="askWrapper">
                <Link to="#" className="askQuestionButton">
                  Add Question or Link
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Navbar);
