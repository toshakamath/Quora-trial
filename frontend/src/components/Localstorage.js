var jwt = require("jsonwebtoken");

module.exports.setData = tokendata => {
  //Storing token in the local storage
  localStorage.setItem("token", tokendata);
};

module.exports.getToken = () => {
  return localStorage.getItem("token");
};
