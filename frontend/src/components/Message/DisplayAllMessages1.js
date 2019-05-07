import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { fetchPeople, setMessage, sendMessage, displayMessages, replyMessages, newMessage } from "../../Actions/MessageAction";
import _ from "lodash";
import { connect } from "react-redux";
import "./Message.css";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";


class DisplayAllMessages1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
         modal: true,
        };
  }
  renderNewMessage=e=>{
    this.setState({
        modal: !this.state.modal
      });
      this.props.history.push("/home/messages/create");
  }
  renderHome=(e)=>{
    this.setState({
        modal: !this.state.modal
      });
    this.props.history.push("/home");
  }
  renderConversation=(e)=>{
      e.preventDefault();
    console.log("this.props.message: ",this.props.message);
    console.log("e.target.value: ",e.target.value, e.target.name);
    this.setState({
        modal: !this.state.modal
      });
      this.props.history.push(`/home/messages/${this.props.message.viewmessages._id}`);
  }

//   handleChangeName(event) {
//     this.setState({name: event.target.value});
//   }
//   handleChangeTeam(event) {
//     this.setState({team: event.target.value});
//   }
//   handleChangeCountry(event) {
//     this.setState({country: event.target.value});
//   }

//   handleSubmit(event) {
//     event.preventDefault();
//   }
componentDidMount() {
  let token_saved = localStorage.getItem("token");
  let decode = jwt_decode(token_saved);
  let email= decode.email;
    console.log("EMAILLLLLL: ",email);
    const data = { email: email };
    console.log(data);
    this.props.displayMessages(data);
  }


  render() {
    console.log("this.props", this.props);
    let params = this.props.match.params;
    console.log("params: ", params);
    let details2 = (this.props.message.viewmessages || []).map((d) => {
      return (
        <div class="small" style={{ marginTop: "-40px" }}>
          {/* <button type="button"
            class="btn btn-primary list-group-item list-group-item-action"
            style={{ border: "1px solid #e2e2e2" }}
        //   onClick={`/${route}/${d._id}`}
            name={`${d._id}`}
            value={`${d._id}`}
            onClick={this.renderConversation}
          > */}
          <Link to={`/home/messages/${d._id}`} class="btn btn-primary list-group-item list-group-item-action">
            {/* <a href={`/${route}/${d._id}`}></a> */}
            <tr>
              <td>Sender: {d.originalsender}</td>
            </tr>
            <tr>
              <td>Receiver: {d.originalreceiver}</td>
            </tr>
            <tr>
              <td>Time: {new Date(d.date).toLocaleString()}</td>
            </tr>
          {/* </button> */}
          </Link>
        </div>
      );
    });
    return (
        <Modal isOpen={this.state.modal}>
          <ModalHeader>
          <h5 class="modal-title" id="DisplayAllMessagesLabel" style={{ fontSize: "19px", fontWeight: "bold", color: "#333", borderRadius: "4px 4px 0 0" }}><b>Messages</b></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={this.renderHome}>
                  <span aria-hidden="true">&times;</span>
                </button>
          </ModalHeader>
          <ModalBody>
          {details2}
          </ModalBody>
          <ModalFooter>
          <button onClick={this.renderHome} type="button" id="messagesClose" style={{ marginTop: "80px", background: "transparent", color: "#949494", fontSize: "15px", fontWeight: "normal", lineHeight: "1.4" }} class="btn" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" data-toggle="modal"
                  data-target="#CreateMessage" onClick={this.renderNewMessage}
                  style={{ borderRadius: "3px", fontWeight: "bold", background: "#3e78ad", color: "#fff", border: "1px solid #3a66ad" }} >New Message</button>
              </ModalFooter>
        </Modal>
    );
  }
}
function mapStateToProps(state) {
    return { message: state.message };
  }
  export default connect(mapStateToProps, { fetchPeople, setMessage, sendMessage, displayMessages, replyMessages, newMessage })(DisplayAllMessages1);
  