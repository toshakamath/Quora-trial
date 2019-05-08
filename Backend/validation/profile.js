const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  // // data.status = !isEmpty(data.status) ? data.status : '';
  // // data.skills = !isEmpty(data.skills) ? data.skills : '';

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle needs to between 2 and 4 characters";
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Profile handle is required";
  }

  // if (Validator.isEmpty(data.email)) {
  //   errors.email = "Email field is required";
  // }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
