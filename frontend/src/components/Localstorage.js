var jwt = require("jsonwebtoken");

module.exports.setData = (email, tokendata) => {
  //Storing token in the local storage
  localStorage.setItem("token", JSON.stringify(tokendata));
};


module.exports.getToken = () => {
  return JSON.parse(localStorage.getItem("token"));
};
