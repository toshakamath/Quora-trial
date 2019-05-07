import React, { Component } from 'react';
import { Link, Switch, Route, BrowserRouter } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { fetchPeople, setMessage, sendMessage, displayMessages, replyMessages, newMessage } from "../../Actions/MessageAction";
import _ from "lodash";
import { connect } from "react-redux";
import "./Message.css";
import "../../App.css";
import jwt_decode from "jwt-decode";

class ViewConversation1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
             modal: true,
        };
        this.toggle = this.toggle.bind(this);
      }
  onChangeHandler1 = (e) => {
    this.props.newMessage({
      [e.target.name]: e.target.value
    });
  };
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
    //reroute
  }
  renderDisplay=(e)=>{
    e.preventDefault();
    this.setState({
        modal: !this.state.modal
      });
    this.props.history.push("/home/messages");
  }
  send = (e) => {
    let _id = ((this.props.match || {}).params || {})._id;
    console.log("hellloooooo ID inside reply: ", _id)
    console.log("this.props.messagedetails.receiver", this.props);  //{message: "this is a new message"}
    e.preventDefault();
    let token_saved = localStorage.getItem("token");
  let decode = jwt_decode(token_saved);
  let email= decode.email;
    console.log("EMAILLLLLL: ",email);
    console.log("this.props.message: ", this.props.message);
    let sender = "", receiver = "";
    // originalsender=tosha
    // originalreceiver=paul
    // localStorage=tosha always
    if (email == this.props.message.viewmessages[0].originalsender) {
      sender = email;
      receiver = this.props.message.viewmessages[0].originalreceiver;
    }
    else {
      sender = this.props.message.viewmessages[0].originalreceiver;
      receiver = this.props.message.viewmessages[0].originalsender;
    }
    const data = {
      email: email, _id: _id, date: Date(Date.now()), newmessage: this.props.message.newmessagedetails.message,
      sender: sender, receiver: receiver
    };
    console.log("data sent to action", data);
    this.props.replyMessages(data, this.props.history);
  };


  render() {
    console.log("this.props.message: ", this.props.message);

    let _id = ((this.props.match || {}).params || {})._id;
    console.log("hellloooooo ID: ", _id);
    let d_id = (this.props.message.viewmessages || []).map((d) => {
      return d._id;
    });
    console.log(d_id);
    console.log(this.props.message.viewmessages);
    let details3 = {};
    for (let index = 0; index < ((this.props.message || {}).viewmessages || []).length; index++) {
      if (_id === this.props.message.viewmessages[index]._id) {
        details3 = this.props.message.viewmessages[index]
      }
    }
    console.log("details3: ", details3);
    let htmldetails = (details3.messages || []).map((d) => {
      return (
        <div>
          <ol>
            <li className="list-group-item">
              <label>Sender: </label> <span> {d.sender}</span>
              <span style={{ float: "right" }}>
                <small> {(d.date) || "".slice(0, 25)}</small>
              </span>
              <label style={{ float: "right" }}>
                <small>Date:- </small>
              </label>
              <br />
              <label>Receiver: </label> <span> {d.receiver}</span>
              <br />
              <label>Message: </label>
              <br />
              <span> {d.message}</span>
              <br />
            </li>
          </ol>
        </div>
      );
    });

  


    return (
        <Modal isOpen={this.state.modal}>
        <form onSubmit={this.handleSubmit}>
          <ModalHeader>
          <a href="#">
                  <span style={{ fontSize: "19px", color: "#333", height: "19px", display: "inline-block", opacity: ".7", top: "3px", marginRight: "12px" }} class="glyphicon glyphicon-chevron-left" data-dismiss="modal" data-toggle="modal" data-target="#DisplayAllMessages"></span>
                </a>
                <h5 class="modal-title" id="ViewConversationLabel" style={{ fontSize: "19px", fontWeight: "bold", color: "#333", borderRadius: "4px 4px 0 0" }}>Conversations</h5>
                <a href="#">
                  <span style={{ marginLeft: "355px", marginTop: "12px", color: "#e2e2e2" }} class="glyphicon glyphicon-option-horizontal"></span>
                </a>
                <button type="button" onClick={this.renderDisplay} class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
          </ModalHeader>
          <ModalBody>
          {htmldetails}
          </ModalBody>
          <ModalFooter>
          <textarea onChange={this.onChangeHandler1} type="text" name="message" placeholder="Type a message..." style={{ overflow: "hidden", overflowWrap: "break-word", height: "36px", padding: "8px", boxShadow: "none", minHeight: "inherit", marginTop: "50px", borderRadius: "3px", fontSize: "13px", width: "100%", border: "1px solid #e2e2e2", resize: "none" }} ></textarea>
                <button type="button" value={_id} type="submit" onClick={this.send} name="send" data-toggle="modal" data-target="#ViewConversation" class="btn btn-primary" style={{ borderRadius: "3px", marginTop: "75px", fontWeight: "bold", background: "#3e78ad", color: "#fff", border: "1px solid #3a66ad" }}>Send</button>
              </ModalFooter>
          </form>
        </Modal>
    );
  }
}
function mapStateToProps(state) {
  return { message: state.message };
}
export default connect(mapStateToProps, { fetchPeople, setMessage, sendMessage, displayMessages, replyMessages, newMessage })(ViewConversation1);
