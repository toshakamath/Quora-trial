import React, { Component } from "react";
import "./newCourse.css";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
class newCourse extends Component {
  constructor() {
    super();
    this.state = {
      userId: "",
      courseName: "",
      courseDept: "",
      courseDescription: "",
      courseCapacity: "",
      courseRoom: "",
      courseTerm: "",
      waitlistCapacity: "",
      lectureTime: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(value) {
    this.setState({ courseDescription: value });
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onClick(e) {
    e.preventDefault();
    this.props.history.push("/Dashboard");
  }
  onSubmit(e) {
    e.preventDefault();
    const Token = localStorage.getItem("jwtToken");
    const course = {
      courseName: this.state.courseName,
      courseDept: this.state.courseDept,
      courseCapacity: this.state.courseCapacity,
      courseDescription: this.state.courseDescription,
      courseRoom: this.state.courseRoom,
      courseTerm: this.state.courseTerm,
      waitlistCapacity: this.state.waitlistCapacity,
      lectureTime: this.state.lectureTime
    };
    axios
      .post(window.base_url + "/users/courses", course, {
        headers: { Authorization: Token }
      })
      .then(response => {
        console.log(response.data);
        this.props.history.push("/Dashboard");
      });
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-2">{""}</div>
        <div className="col-md-8 courseWrapper">
          <form onSubmit={this.onSubmit} className="col-lg-12">
            <div className="row">
              <div className="col-md-6 form-group ">
                <div className="row">
                  <label className="col-md-4" labelfor="courseName">
                    Course Name
                  </label>

                  <input
                    type="text"
                    className="form-control col-md-8"
                    name="courseName"
                    value={this.state.courseName}
                    onChange={this.onChange}
                    placeholder="ex. CMPE-273 Distributed Systems"
                  />
                </div>
              </div>
              <div className="col-md-6 form-group">
                <div className="row">
                  <label className="col-md-4" labelfor="courseDept">
                    Department
                  </label>
                  <input
                    type="text"
                    name="courseDept"
                    className="form-control col-md-8"
                    value={this.state.courseDept}
                    onChange={this.onChange}
                    placeholder="ex. Software engineering"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 form-group">
                <div className="row">
                  <lable className="col-md-4" lablefor="courseDept">
                    Course Term
                  </lable>
                  <input
                    type="text"
                    name="courseTerm"
                    className="form-control col-md-8"
                    value={this.state.courseTerm}
                    onChange={this.onChange}
                    placeholder="Ex. Spring 2019"
                  />
                </div>
              </div>
              <div className="col-md-6 form-group">
                <div className="row">
                  <lable className="col-md-4" lablefor="courseRoom">
                    Room Number
                  </lable>

                  <input
                    type="text"
                    name="courseRoom"
                    className="form-control col-md-8"
                    value={this.state.courseRoom}
                    onChange={this.onChange}
                    placeholder="Ex. Eng-277"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 form-group">
                <div className="row">
                  <lable className="col-md-4" lablefor="courseCapacity">
                    Batch Size
                  </lable>

                  <input
                    type="text"
                    className="form-control col-md-8"
                    name="courseCapacity"
                    value={this.state.courseCapacity}
                    onChange={this.onChange}
                    placeholder="ex. 70"
                  />
                </div>
              </div>
              <div className="col-md-6 form-group">
                <div className="row">
                  <label className="col-md-4" labelfor="waitlistCapacity">
                    waitlist Capacity
                  </label>

                  <input
                    type="text"
                    name="waitlistCapacity"
                    className="form-control col-md-8"
                    value={this.state.waitlistCapacity}
                    onChange={this.onChange}
                    placeholder="ex. 15"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 form-group">
                <div className="row">
                  <label className="col-md-4" labelfor="lectureTime">
                    Lecture Timings
                  </label>
                  <div className="group date" data-provide="datepicker-inline">
                    <input
                      type="date"
                      name="lectureTime"
                      className="form-control col-md-8 datepicker"
                      value={this.state.lectureTime}
                      onChange={this.onChange}
                      placeholder="Monday 3pm-5pm"
                    />
                    <div className="input-group-addon">
                      <span className="glyphicon glyphicon-th" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 form-group">
                <div className="row">
                  <label className="col-md-2" labelfor="courseDescription">
                    Description
                  </label>
                  <ReactQuill
                    value={this.state.courseDescription}
                    onChange={this.handleChange}
                    className="col-md-10"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4" />
              <button
                className="btn btn-primary as-btn"
                type="submit"
                value="submit"
              >
                Create
              </button>
              <button
                className="btn btn-danger as-btn"
                type="reset"
                value="reset"
                onClick={this.onClick}
              >
                Cancel
              </button>
              <div className="col-md-4" />
            </div>
          </form>
        </div>
        <div className="col-md-2" />
      </div>
    );
  }
}
export default newCourse;
