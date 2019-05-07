module.exports.setData = data => {
  // var receivedData = JSON.stringify(data);
  //Storing token in the local storage
  console.log("token:" + data);

  localStorage.setItem("token", data);
  localStorage.setItem("auth", true);
  console.log("localstoragre:" + localStorage.getItem("token"));
  // localStorage.setItem("local_storage", receivedData);
  //localStorage.setItem("usertype", type);
};

module.exports.getData = () => {
  return JSON.parse(localStorage.getItem("token"));
};


