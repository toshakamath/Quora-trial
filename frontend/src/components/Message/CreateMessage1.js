import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { fetchPeople, setMessage, sendMessage, displayMessages, replyMessages, newMessage } from "../../Actions/MessageAction";
import _ from "lodash";
import { connect } from "react-redux";
import "./Message.css";
import jwt_decode from "jwt-decode";

class CreateMessage1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
             modal: true,
            };
        }
    componentDidMount() {
        //call to action
        let token_saved = localStorage.getItem("token");
  let decode = jwt_decode(token_saved);
  let email= decode.email;
    console.log("EMAILLLLLL: ",email);
        const data = {
          email: email
        };
        console.log("email LOG", data);
        this.props.fetchPeople(data);
      }
    renderDisplay=(e)=>{
        e.preventDefault();
        this.setState({
            modal: !this.state.modal
          });
        this.props.history.push("/home/messages");
      }
    onChangeHandler = (e) => {
        this.props.setMessage({
          [e.target.name]: e.target.value
        });
      };
    sendMessage = (e) => {
        console.log("inside sendMessage API CALL");
        console.log("this.props.messagedetails.receiver", this.props.message.messagedetails);
        // console.log(this.props.messagedetails.subject);
        // console.log(this.props.messagedetails.message);
        e.preventDefault();
        let token_saved = localStorage.getItem("token");
  let decode = jwt_decode(token_saved);
  let em= decode.email;
    console.log("EMAILLLLLL: ",em);
        const data = {
            //sender: em, receiver, subject, message, date
            sender: em,
            receiver: this.props.message.messagedetails.receiver,
            message: this.props.message.messagedetails.message,
            date: Date(Date.now())
        };
        console.log("data", data);
        this.props.sendMessage(data, this.props.history);
    };
  render() {
      console.log("this.props.message: ", this.props.message);
      let details = this.props.message.people.map((m) => {
        return (
                <option value={m.email}>{m.name}</option>
            );
        });
    return (
        <Modal isOpen={this.state.modal}>
        <ModalHeader>
        <a href="#">
                  <span style={{ fontSize: "19px", color: "#333", height: "19px", display: "inline-block", opacity: ".7", top: "3px", marginRight: "12px" }} class="glyphicon glyphicon-chevron-left" data-dismiss="modal"></span>
                </a>
                <h5 class="modal-title" id="CreateMessageLabel" style={{ fontSize: "19px", fontWeight: "bold", color: "#333", borderRadius: "4px 4px 0 0" }}>New message</h5>
                <button type="button" onClick={this.renderDisplay} class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
        </ModalHeader>
        <ModalBody>
        <form>
                  <div class="form-group" style={{ marginLeft: "-60px", marginRight: "-60px" }}>
                    <input type="text" class="form-control" style={{ border: "1px solid #e2e2e2" }} name="receiver" onChange={this.onChangeHandler} placeholder="Enter a name" id="recipient-name" list="people" />
                    <datalist id="people">
                      {details}
                    </datalist>
                  </div>
                  <div class="form-group" style={{ marginTop: "-40px", marginLeft: "-60px", marginRight: "-60px" }} >
                    <textarea class="form-control" name="message" onChange={this.onChangeHandler} style={{ border: "1px solid #e2e2e2", resize: "none", width: "100%", minHeight: "140px" }} placeholder="Type a message..." id="message-text"></textarea>
                  </div>
                </form>
        </ModalBody>
        <ModalFooter>
        <button onClick={this.renderDisplay} type="button" id="messagesClose" style={{ marginTop: "80px", background: "transparent", color: "#949494", display: "inline-block", cursor: "pointer", fontSize: "15px", fontWeight: "normal", lineHeight: "1.4" }} class="btn" data-dismiss="modal">Back</button>
                <button type="button" data-dismiss="modal" data-toggle="modal" data-target="#DisplayAllMessages" onClick={this.sendMessage} class="btn btn-primary" style={{ borderRadius: "3px", fontWeight: "bold", background: "#3e78ad", color: "#fff", border: "1px solid #3a66ad" }}>Send</button>
              </ModalFooter>
      </Modal>
    );
  }
}
function mapStateToProps(state) {
  return { message: state.message };
}
export default connect(mapStateToProps, { fetchPeople, sendMessage, setMessage })(CreateMessage1);

