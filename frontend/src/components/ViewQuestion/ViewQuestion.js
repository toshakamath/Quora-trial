import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Switch, Route } from "react-router-dom";
import Pagination from "react-paginating";
import _ from "lodash";
import Axios from "axios";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios";

class ViewQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionDetails: {},
      answerDetails: [],
      len: 0,
      // text: '',
      editorHtml: '', 
      theme: 'snow',
      showFlag: false,
      identity:"public"
    };
  }

  componentDidMount() {
    let questionid = this.props.match.params.questionid;
    Axios.get(window.base_url + "/getonequestion", {
      params: { questionId: questionid }
    }).then(response => {
      console.log("final data", response.data);
      this.setState({
        questionDetails: response.data.questionDetails,
        answerDetails: this.state.answerDetails.concat(
          response.data.answerDetails
        ),
        len: response.data.questionDetails.answers.length
      });
    });
  }
onSubmitAnswer=(e)=>{
  e.preventDefault();
  let isAnonymous=false;
    if(this.state.identity=="public")
      isAnonymous=false;
    else if(this.state.identity=="anonymous")
      isAnonymous=true;

    console.log("this.props.match.params._id: ", this.props.match.params.questionid);
    
  let data={
    token: localStorage.getItem("token"),
    editorHtml: this.state.editorHtml,
    isAnonymous: isAnonymous,
    questionid: this.props.match.params.questionid
  }
  console.log("DATAAA: ", data);
  axios.defaults.withCredentials = true;
  const Token=localStorage.getItem("token")
        axios
        .post(window.base_url+`/answer`,{headers:{Authorization:Token}})
          .then((response) => {
            console.log("Status Code : ", response.status);
            console.log("Data from node : ", response.data);
            this.props.history.push("/:questionid");
          }, (err)=>{
            console.log("ERROR : ", err);
          });
}
  renderAnswers() {
    let answerList = this.state.answerDetails;
    return _.map(answerList, answer => (
      <li className="list-group-item">
      <img src="#"></img>
        <label  style={{display:'inline'}} >{answer.answerOwner}</label>
        <div style={{ float: "right" }}>Answered On : {answer.answerDate}</div>
        <br/>
        <p>{answer.answer}</p>
        <button>
            <i className="fa fa-arrow-up" aria-hidden="true" id="upvotearrow" />
            Upvote
          </button>
      </li>
    ));
  }

  handleChange =(html)=> {
  	this.setState({ editorHtml: html });
  }

  showRichTextEditor=(e)=>{
    if(this.state.showFlag===true)
    {
    this.setState({
      showFlag: false
    })
  }
  else if (this.state.showFlag===false){
    this.setState({
      showFlag: true
    })
  }
  }
  onChangeHandler1=(e)=>{
    console.log("SOMETHINGGGGG ",e.target.name, e.target.value, e.target.checked);
    if(e.target.checked===true){
    this.setState({
      identity: "anonymous"
    });
  }
    else if(e.target.checked===false){
      this.setState({
        identity: "public"
          });
    }
  }
  render() {
    let cid = this.props.match.params.cid;

    return (
      <div>
        <div className="row">
        <div className="col-2"/>
        <div className="col-6">
          <ul className="list-group list-group-flush" id="questionbody">
            <li className="list-group-item" id="question">
              <div className="questionheader">
                Topic : {this.state.questionDetails.topic}
              </div>
              <br />
              <b>{this.state.questionDetails.question}</b>
              <br />
              <button onClick={this.showRichTextEditor}>
              <i class="fa fa-pencil-square-o" id="answerquestion" />
              <span>Answer</span>
              </button>
              {/* { this.state.showResults ? <Results /> : null } */}
              {!this.state.showFlag ?
              <div></div>:
                  <div>
                    <div>
                    <ReactQuill
                      theme={this.state.theme}
                      onChange={this.handleChange}
                      value={this.state.editorHtml}
                      modules={ViewQuestion.modules}
                      formats={ViewQuestion.formats}
                      bounds={'.app'}
                      placeholder={this.props.placeholder}
                    />
                    </div>
                    {/* <div id="richtextfooter"> */}
                    <div class="custom-control" >
                    
                      <input type="checkbox" class="custom-control-input" name="identity" value="anonymous" id="anonymous" onChange={this.onChangeHandler1} />
                      <label class="custom-control-label" for="anonymous">Anonymous</label>
                      <button onClick={this.onSubmitAnswer}>Submit</button>
                      
                    </div>
                    {/* </div> */}
                  </div>
              }
              <i class="fa fa-rss" aria-hidden="true" /> Follow
              <div style={{ float: "right" }}>
              
                <i class="fa fa-comment-o" aria-hidden="true" />
                Comment
                
              </div>
              <br />
              <span>{this.state.len} Answer(s)</span>
            </li>
            {this.renderAnswers()}
          </ul>
          </div>
          <div className="col-4">
          Related Questions </div>
        </div>
      </div>
    );
  }
}

ViewQuestion.modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  }
}
/* 
 * Quill ViewQuestion formats
 * See https://quilljs.com/docs/formats/
 */
ViewQuestion.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]

/* 
 * PropType validation
 */
// ViewQuestion.propTypes = {
//   placeholder: PropTypes.string,
// }

/* 
 * Render component on page
 */
// ReactDOM.render(
//   <ViewQuestion placeholder={'Write something...'}/>, 
//   document.querySelector('.app')
// )

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(
  mapStateToProps,
  {}
)(ViewQuestion);
