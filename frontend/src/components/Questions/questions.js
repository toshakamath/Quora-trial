import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import "./questions.css";

const questions = ({ question }) => {

  //let answer = {}

  var max = -Infinity;
  var index = -1;
  question.answers.forEach(function (a, i) {
    if (a.upVote.length > max) {
      max = a.length;
      index = i;
    }
  });


  // diff is: Thu Jul 05 1973 04:00:00 GMT+0300 (EEST)

  const maxUpVotedAnswer = question.answers[index].answer;
  const answerDate = question.answers[index].answerDate;
  var displayAsweredTime = "";
  var answeredDate = new Date(answerDate);
  var currentDate = new Date();
  var diff = new Date(currentDate.getTime() - answeredDate.getTime());

  if (diff.getUTCFullYear() - 1970 > 0) {
    displayAsweredTime = diff.getUTCFullYear() - 1970 + " years ago";
  }
  else if (diff.getUTCMonth() > 0) {
    displayAsweredTime = diff.getUTCMonth() + " months ago";
  }
  else if (diff.getUTCDate() - 1 > 0) {
    displayAsweredTime = diff.getUTCDate() - 1 + " days ago";
  }
  else if (diff.getUTCHours() > 0) {
    displayAsweredTime = diff.getUTCHours() + " hours ago";
  }
  else if (diff.getMinutes() - 1 > 0) {
    displayAsweredTime = diff.getMinutes() + " minutes ago";
  }
  else if (diff.getUTCSeconds() - 1 > 0) {
    displayAsweredTime = diff.getUTCSeconds() + " seconds ago";
  }

  return (
    <div className="card cardstyle">
      {/* <img className="card-img-top" src="..." alt="Card image cap" /> */}
      <div className="card-body">
        <h15 className="card-title">Topic: {question.topic} </h15>

        <a href={"#question" + question._id} className="questions">
          <h5 className="card-title">
            {question.question}
          </h5>
        </a>

        <h6 className="userInfo card-subtitle mb-2 text-muted">User Info</h6>
        <h6 className="userInfo card-subtitle mb-2 text-muted">Answered: {displayAsweredTime}</h6>

        <a className="answers card-link collapsed"

          data-toggle="collapse"
          href={"#" + question._id}
          aria-expanded="false"
          aria-controls={question._id}
        >
          <div id="summary">

            <p className="card-text collapse" id={question._id}>

              {maxUpVotedAnswer}


            </p>
            <a
              className="collapsed"
              data-toggle="collapse"
              href={"#" + question._id}
              aria-expanded="false"
              aria-controls={question._id}
            >
              <div />
            </a>
          </div>
        </a>

        {/* 
        <a href="#" className="btn btn-primary">
          Go somewhere
          </a>
        <a href="#" className="card-link">
          Card link
          </a> */}
      </div>
    </div>
  );
};

questions.propTypes = {
  //login: PropTypes.func.isRequired,
  //profile: PropTypes.func.isRequired,
  //auth: PropTypes.object.isRequired
  //errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default questions;

// class questions extends Component {
//   render() {
//     {
//       const questionsData = (
//         <div className="card cardstyle">
//           {/* <img className="card-img-top" src="..." alt="Card image cap" /> */}
//           <div className="card-body">
//             <h15 className="card-title">Answer Topic: Computers </h15>

//             <a href="#" className="questions">
//               <h5 className="card-title">
//                 What's one instinctive thing you did that prevented something
//                 bad from happening?
//               </h5>
//             </a>

//             <h6 className="userInfo card-subtitle mb-2 text-muted">
//               User Info
//             </h6>

//             <a href="#" className="answers card-link">
//               <div id="summary">
//                 <p className="card-text collapse" id="collapseSummary">
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
//                   porttitor maximus laoreet. Pellentesque habitant morbi
//                   tristique senectus et netus et malesuada fames ac turpis
//                   egestas. In hac habitasse platea dictumst. Suspendisse
//                   venenatis sollicitudin erat in gravida. Sed eget nisl
//                   tristique, commodo lectus sit amet, vulputate sem. Cras
//                   porttitor lorem ipsum, sit amet iaculis massa feugiat vitae.
//                   Curabitur sapien odio, ullamcorper tincidunt interdum vitae,
//                   vestibulum eu neque. Nam leo massa, fringilla eget mauris
//                   feugiat, auctor suscipit justo.
//                 </p>
//                 <a
//                   className="collapsed"
//                   data-toggle="collapse"
//                   href="#collapseSummary"
//                   aria-expanded="false"
//                   aria-controls="collapseSummary"
//                 >
//                   <div />
//                 </a>
//               </div>
//             </a>

//             <div>
//               <a href="#" className="btn btn-primary">
//                 Go somewhere
//               </a>
//               <a href="#" className="card-link">
//                 Card link
//               </a>
//               <a href="#" className="card-link">
//                 Another link
//               </a>
//             </div>
//           </div>
//         </div>
//       );
//       return (
//         <div>
//           <div className="cardcontainer">{questionsData}</div>
//         </div>
//       );
//     }
//   }
// }

// questions.propTypes = {
//   //login: PropTypes.func.isRequired,
//   //profile: PropTypes.func.isRequired,
//   //auth: PropTypes.object.isRequired
//   //errors: PropTypes.object.isRequired
// };
// const mapStateToProps = state => ({
//   auth: state.auth
// });

// export default connect(
//   mapStateToProps,
//   {}
// )(withRouter(questions));
