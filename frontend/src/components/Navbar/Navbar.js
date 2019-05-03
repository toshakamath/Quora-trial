import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Axios from "axios";
import "./Navbar.css";
class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  logOut(e) {
    //e.prventDefault()
    localStorage.removeItem("jwtToken");
    this.props.history.push("/login");
  }

  renderSearchResult(){
    console.log("entered here in side RENDER SEARCH RESULT");
  }

  handleClick = e => {
    var searchdata = {
      search: e.target.value
    };
    console.log("entered handle click", searchdata);
    Axios.post(window.base_url + "/search", searchdata).then(response => {
      console.log("final data", response.data);
      this.renderSearchResult();
    });


  };

  show(e) {
    document.getElementById("abc").classList.toggle("show");
  }
  render() {
    return (
      <div className="siteHeader">
        <div className="container d-flex justify-content-between">
          <div className="headerLogo">
            <Link to="/home" />
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
                    <form className="searchform">
                      <input
                        className="form-control"
                        id="searchbar"
                        type="text"
                        name="search"
                        placeholder="Search..."
                        aria-label="Search"
                        onChange={this.handleClick}
                      />
                    </form>
                  </div>
                </div>
              </div>
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
export default withRouter(Navbar);

// <input
//                       className="selectorInput text"
//                       type="text"
//                       data-lpignore="true"
//                       autoFocus="true"
//                       placeholder="Search Quora"
//                       name="search"
//                     />
