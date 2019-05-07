import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

class AllProfiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profiles: []
    };
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  componentDidMount() {
    const Token = localStorage.getItem("token");
    axios
      .get(window.base_url + "/profile/all", {
        headers: { Authorization: Token }
      })
      .then(response => {
        console.log(response.data);

        this.setState({
          profiles: response.data
        });
      });
  }
  logOut(e) {
    //e.prventDefault()
    localStorage.removeItem("jwtToken");
    this.props.history.push("/login");
  }

  // show(e) {
  //   document.getElementById("xyz").classList.toggle("show");
  // }
  follow(id, e) {
    e.preventDefault();
    console.log(e.target.value);
    const Token = localStorage.getItem("token");
    let course = { userId: id };
    console.log(course);
    axios
      .post(window.base_url + "/profile/follow", course, {
        headers: { Authorization: Token }
      })
      .then(response => {
        console.log(response.data);
        this.props.history.push("/profile/followers");
      });
  }

  render() {
    console.log("------------------------");
    console.log(this.state.profiles);
    console.log("------------------------");
    const follower = this.state.profiles.map((follower, index) => {
      return (
        <div key={index} className="col-6 followerWrapper">
          <div className="row">
            <div className="col-12">
              <Link to="#" className="prolink row">
                {follower.profileImage ? (
                  <div className="proImg col-2">
                    <img
                      src={`${window.base_url}/files/${follower.profileImage}`}
                      alt="proImg"
                      height="35"
                      width="35"
                      className="rounded-circle"
                    />
                    :
                  </div>
                ) : (
                  <div className="proImg col-2">
                    <img
                      src="https://qsf.fs.quoracdn.net/-3-images.new_grid.profile_pic_default_small.png-26-679bc670f786484c.png"
                      alt="proImg"
                      height="35"
                      width="35"
                      className="rounded-circle"
                    />
                  </div>
                )}
                <div className="col-10">
                  <h3 className="proText">{follower.user.firstName}</h3>
                </div>
              </Link>
            </div>
            <div className="col-12">
              <form
                onSubmit={this.follow.bind(this, follower._id)}
                value={follower._id}
              >
                <button className="btn ui-button" type="submit">
                  <span className="followsvg">
                    <i className="fas fa-user-plus" />
                  </span>{" "}
                  <span>follow</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div className="row">
        <div className="col-12">
          {" "}
          <h3 className="head">
            <div className="title">Followers</div>
          </h3>
        </div>
        <div className="col-12">
          <div className="row">{follower}</div>
        </div>
      </div>
    );
  }
}
export default withRouter(AllProfiles);
