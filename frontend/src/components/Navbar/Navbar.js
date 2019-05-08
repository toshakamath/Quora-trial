import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Axios from "axios";
import "./Navbar.css";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchitem: "",
      profileImage: localStorage.getItem("profileImage")
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  deleteAccount = () => {
    console.log("delete Account");
    const Token = localStorage.getItem("token");

    Axios.defaults.withCredentials = true;
    Axios.delete("http://localhost:3001/profile", {
      headers: { Authorization: Token }
    }).then(response => {
      if (response.status === 200) {
        console.log("deleted account");
        localStorage.removeItem("auth");
      }
    });
    window.location.reload();
  };

  logOut(e) {
    //e.prventDefault()
    localStorage.removeItem("token");
    localStorage.removeItem("auth");
    this.props.history.push("/login");
  }

  handleSubmit = e => {
    e.preventDefault();
    var searchdata = {
      searchItem: this.state.searchitem
    };
    Axios.post(window.base_url + "/search", searchdata).then(response => {
      console.log("final data", response.data);
      this.props.history.push({
        pathname: "/search",
        state: { detail: response.data }
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
              <span className="display-none" />
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
                          className="far fa-newspaper"
                          size="width:24px;height:24px"
                        />
                      </span>
                    </div>
                    <span className="badge badge-light bd">4</span>
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
                        <i className="far fa-edit" />
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
                        <i className="fas fa-users" />
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
                        <i className="far fa-bell" />
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
                              {this.state.profileImage ? (
                                <img
                                  src={`${window.base_url}/files/${
                                    this.state.profileImage
                                  }`}
                                  className="profilephotodropdown"
                                  alt="username"
                                  height="50"
                                  width="50"
                                  data-toggle="dropdown"
                                />
                              ) : (
                                <img
                                  src="https://qsf.fs.quoracdn.net/-3-images.new_grid.profile_pic_default_small.png-26-679bc670f786484c.png"
                                  alt="proImg"
                                  height="50px"
                                  width="50px"
                                  className="profilephotodropdown"
                                  data-toggle="dropdown"
                                />
                              )}
                              {/* <img
                                className="profilephotodropdown"
                                height="50px"
                                width="50px"
                                src={`${window.base_url}/files/${
                                  this.state.profileImage
                                }`}
                                type="button"
                                data-toggle="dropdown"
                              /> */}
                              <ul className="dropdown-menu" id="navbardropdown">
                                <li>
                                  <a
                                    href="/profile"
                                    className="list-group-item list-group-item-action list-group-item-light"
                                  >
                                    Profile
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="/home/messages"
                                    className="list-group-item list-group-item-action list-group-item-light"
                                  >
                                    Messages
                                  </a>
                                </li>
                                {/* <li><button type="button" class="list-group-item list-group-item-action list-group-item-light" data-toggle="modal" data-target="#DisplayAllMessages">Messages</button></li> */}
                                <li>
                                  <a
                                    href="/content"
                                    className="list-group-item list-group-item-action list-group-item-light"
                                  >
                                    Your Content
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="/Graphs"
                                    className="list-group-item list-group-item-action list-group-item-light"
                                  >
                                    Stats
                                  </a>
                                </li>
                                <li>
                                  <Link
                                    to="/login"
                                    onClick={this.logOut.bind(this)}
                                    className="list-group-item list-group-item-action list-group-item-light"
                                  >
                                    Logout
                                  </Link>
                                </li>
                                <li>
                                  <a
                                    href="#"
                                    className="list-group-item list-group-item-action list-group-item-light"
                                    onClick={this.deleteAccount.bind(this)}
                                  >
                                    Delete Account
                                  </a>
                                </li>
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
