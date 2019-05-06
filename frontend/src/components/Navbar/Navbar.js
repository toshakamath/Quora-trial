import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./Navbar.css";
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
              <span className="display-none">Quora</span>
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
                    <input
                      className="selectorInput text"
                      type="text"
                      data-lpignore="true"
                      autoFocus={true}
                      placeholder="Search Quora"
                    />
                  </div>
                </div>
              </div>
              <div>
                <span>
                  <div className="hover-menu ">
                    <div className="hover-menu-contents">
                      <Link
                        to={`/profile/${this.props.auth.user.id}`}
                        className="navItemLink"
                      >
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
                        </span>
                      </Link>
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
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  {}
)(withRouter(Navbar));
