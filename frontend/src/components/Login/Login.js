import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import "./login.css";
import { connect } from "react-redux";
var loginUser = require("../../Actions/authAction").loginUser;

//Define a Login Component
class Login extends Component {
  constructor(props) {
    super(props);
  }

  renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
      <label>{label}</label>
      <input
        className="input"
        {...input}
        placeholder={label}
        type={type}
        className="form-control"
      />
      {touched &&
        ((error && <span className="error">{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  );

  //submit Login handler to send a request to the node backend
  onLogin = values => {
    this.props.loginUser(values, this.props.history);
    console.log("values ", values);
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <div className="bg_container">
          <div className="login">
            <img src="//qsf.fs.quoracdn.net/-3-images.logo.wordmark_default.svg-26-bfa6b94bc0d6af2e.svg" />
            <h4>A place to share knowledge and better understand the world</h4>
            <h4>Login</h4>
            <form onSubmit={handleSubmit(this.onLogin.bind(this))}>
              <div className="form-group">
                <Field
                  label="Email"
                  type="text"
                  component={this.renderField}
                  name="email"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <Field
                  label="Password"
                  type="password"
                  component={this.renderField}
                  name="password"
                  className="form-control"
                />
              </div>
              <button className="btn btn-primary">Login</button>
              <br />
              <Link to="/signup">
                <span> Do not have an account ? </span>
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.email) {
    errors.email = "* Required";
  }

  if (!values.password) {
    errors.password = "* Required";
  }
  return {};
}

const mapStateToProps = state => ({
  user: state.userData,
  errors: state.errors
});

export default reduxForm({ mapStateToProps, validate, form: "login" })(
  connect(
    null,
    { loginUser }
  )(withRouter(Login))
);
