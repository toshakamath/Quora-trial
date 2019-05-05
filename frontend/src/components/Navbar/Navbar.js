import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Axios from "axios";
import "./Navbar.css";
// import "../Message/ConversationsList";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchitem: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  logOut(e) {
    //e.prventDefault()
    localStorage.removeItem("jwtToken");
    this.props.history.push("/login");
  }

  handleSubmit = e => {
    e.preventDefault();
    var searchdata = {
      searchItem: this.state.searchitem
    };
    Axios.post(window.base_url + "/search", searchdata).then(response => {
      console.log("final data", response.data.Search);
      this.props.history.push({
        pathname: "/search",
        state: { detail: response.data.Search }
      });
    });
  };

  handleChange = e => {
    this.setState({ searchitem: e.target.value });
  };

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
                    <form className="searchform" onSubmit={this.handleSubmit}>
                      <div className="input-group md-form form-sm form-1">
                        <div className="input-group-prepend">
                          <span id="searchicon" className="input-group-text">
                            <i className="fa fa-search" aria-hidden="true" />
                          </span>
                        </div>
                        <input
                          className="form-control1"
                          id="searchbar"
                          type="text"
                          name="search"
                          placeholder="Search Quora"
                          aria-label="Search"
                          onChange={this.handleChange}
                        />
                      </div>
                    </form>
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

// <input
//                       className="selectorInput text"
//                       type="text"
//                       data-lpignore="true"
//                       autoFocus="true"
//                       placeholder="Search Quora"
//                       name="search"
//                     />
