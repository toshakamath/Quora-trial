import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import "./Followers.css";
class Followers extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  componentDidMount() {
    console.log(this.props.followers);
  }
  logOut(e) {
    //e.prventDefault()
    localStorage.removeItem("jwtToken");
    this.props.history.push("/login");
  }

  show(e) {
    document.getElementById("abc").classList.toggle("show");
  }
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
        this.props.history.push("/profile");
      });
  }

  render() {
    console.log("------------------------");
    console.log(this.props);
    console.log("------------------------");
    const follower = this.props.followers.map((follower, index) => {
      return (
        <div key={index} className="col-6 followerWrapper">
          <div className="row">
            <div className="col-12">
              <Link to="#" className="prolink row">
                {follower.profileImage ? (
                  <div className="proImg col-2">
                    <img
                      src="#"
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
                  <h3 className="proText">{follower.firstName}</h3>
                </div>
              </Link>
            </div>
            <div className="col-12">
              <form
                onSubmit={this.follow.bind(this, follower._id)}
                value={follower._id}
                name="pqr"
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
export default withRouter(Followers);
