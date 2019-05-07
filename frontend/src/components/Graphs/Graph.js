import React, { Component } from "react";
//import { Switch, Route } from "react-router-dom";

import { Link, withRouter } from "react-router-dom";

import "../../App.css";

import { Chart } from "react-google-charts";
import { getQuestions } from "../../Actions/questionsAction";
import { getAnswers, getProfileViewCount } from "../../Actions/answerActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Graph extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.state = {
      showPopup: false
    };
  }

  componentDidMount() {
    this.props.getQuestions();
    this.props.getAnswers();
    this.props.getProfileViewCount();
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  graphcount = () => {

    const { questions } = this.props.questions;

    var topFive = questions.sort((a, b) => b.visitor - a.visitor).slice(0, 5);
    console.log("top five");
    console.log(topFive);

    return topFive;

  }

  graphupvotecount = () => {
    console.log("upvote");
    const { answers } = this.props.answers;

    var topFive = answers.sort((a, b) => b.upVote.length - a.upVote.length).slice(0, 10);

    return topFive;

  }


  graphdownvotecount = () => {

    console.log("downvote");
    const { answers } = this.props.answers;

    var topFive = answers.sort((a, b) => b.downVote.length - a.downVote.length).slice(0, 5);

    return topFive;
  }
  graphdownvotecount1 = () => {

    console.log("downvote");
    const { answers } = this.props.answers;

    var topFive = answers.sort((a, b) => b.downVote.length - a.downVote.length).slice(0, 5);

    return topFive;
  }

  //     graphbookmarkcount1= () =>{

  //   console.log("bookmarks");
  //   const { answers } = this.props.answers;

  //   var topFive = answers.sort((a,b) => b.bookMark.length - a.bookMark.length).slice(0,5);

  //   return topFive;

  // }

  //Dummy componenet did mount
  render() {

    var count = [];
    var upvotecount = [];
    var downvotecount = [];
    var bookmarkcount = [];

    count = this.graphcount();
    upvotecount = this.graphupvotecount();
    downvotecount = this.graphdownvotecount();
    bookmarkcount = this.graphdownvotecount1();
    const { profileview } = this.props.answers;

    console.log("upvotecount", upvotecount);

    if (count.length == 0)
      return "";

    var data2 = [];
    data2 = [
      ['Views', 'Visitor Count']
    ];

    var val = 1;
    count.forEach((a) => {
      data2.push([count[val - 1].question, count[val - 1].visitor]);
      val = val + 1;
    })

    // if(upvotecount.upVote.length == 0)
    //   return "";

    var data3 = [];
    data3 = [
      ['Views', 'Visitor Count']
    ];

    var val2 = 1;
    upvotecount.forEach((a) => {
      data3.push([upvotecount[val2 - 1].answer, upvotecount[val2 - 1].upVote.length]);
      val2 = val2 + 1;
    })

    // console.log("data2",data2);
    // console.log("data3",upvotecount);



    var data4 = [];
    data4 = [
      ['Views', 'Visitor Count']
    ];

    var val3 = 1;
    downvotecount.forEach((a) => {
      data4.push([downvotecount[val3 - 1].answer, downvotecount[val3 - 1].downVote.length]);
      val3 = val3 + 1;
    })



    var data6 = [];
    data6 = [
      ['data6ProfileViews', 'Visitor Count']
    ];

    profileview.forEach((a) => {
      data6.push([a.day, a.count]);
    })



    var data5 = [];
    data5 = [
      ['Views', 'Visitor Count']
    ];

    // var val4= 1;
    // bookmarkcount.forEach((a)=>{
    //   data5.push([bookmarkcount[val4-1].answer, bookmarkcount[val4-1].bookMark.length]);
    //   val4 = val4 +1;
    // })


    return (
      <div>

        <div className={"my-pretty-chart-container"}>
          {/* Below graph is for Question/Answer View */}
          <Chart
            width={700}
            height={700}
            chartType="ColumnChart"
            loader={<div>Loading Chart</div>}
            data={data2}
            options={{
              title: 'Most Viewed Questions',
              chartArea: { width: '70%' },
              hAxis: {
                title: 'Top Questions',
                minValue: 0,
              },
              vAxis: {
                title: 'Views',
              },
            }}
            legendToggle
          />

          <Chart
            width={700}
            height={700}
            chartType="ColumnChart"
            loader={<div>Loading Chart</div>}
            data={data3}

            options={{
              title: 'Most upVoted Answers',
              chartArea: { width: '70%' },
              hAxis: {
                title: 'Top 10 Upvotes for the Answers',
                minValue: 0,
              },
              vAxis: {
                title: 'Number Of UpVotes',
              },
            }}
            legendToggle
          />

          {/* Below graph is for upVote View */}
          <Chart
            width={700}
            height={700}
            chartType="ColumnChart"
            loader={<div>Loading Chart</div>}
            data={data3}

            options={{
              title: 'Most upVoted Answers',
              chartArea: { width: '70%' },
              hAxis: {
                title: 'Top 10 Upvotes for the Answers',
                minValue: 0,
              },
              vAxis: {
                title: 'Number Of UpVotes', 
              },
              colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6']
            }}
            legendToggle
          />

          {/* Below graph is for downVote View */}
          <Chart
            width={700}
            height={700}
            chartType="ColumnChart"
            loader={<div>Loading Chart</div>}
            data={data4}
            options={{
              title: 'Most downVoted Answers',
              chartArea: { width: '70%' },
              hAxis: {
                title: 'Top 5 downVotes for the Answer',
                minValue: 0,
              },
              vAxis: {
                title: 'Number Of DownVotes',
              },
            }}
            legendToggle
          />

          {/* Below graph is for ProfileView Count */}
          <Chart
            width={1200}
            height={700}
            chartType="ColumnChart"
            loader={<div>Loading Chart</div>}
            data={data6}
            options={{
              title: '#30 Days Profile View',
              chartArea: { width: '70%' },
              hAxis: {
                title: '#30 Days',
                minValue: 0,
              },
              vAxis: {
                title: 'Profile Count',
              },
            }}
            legendToggle
          />


          {/* Below graph is for bookmark View */}
          <Chart
            width={700}
            height={700}
            chartType="ColumnChart"
            loader={<div>Loading Chart</div>}
            data={[
              ['Views', 'Visitor Count'],
              ['Answer 1', 10],
              ['Answer 2', 20],
              ['Answer 3', 30],
              ['Answer 4', 40],
              ['Answer 5', 50],
            ]}
            options={{
              title: 'Most Bookmarked Answers',
              chartArea: { width: '70%' },
              hAxis: {
                title: 'Bookmarks',
                minValue: 0,
              },
              vAxis: {
                title: 'No Of Bookmarks',
              },
            }}
            legendToggle
          />
        </div>
      </div>


    );
  }
}

Graph.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  questions: PropTypes.object.isRequired,
  getAnswers: PropTypes.func.isRequired,
  answers: PropTypes.object.isRequired,
  getProfileViewCount: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  questions: state.questions,
  answers: state.answers
});

export default connect(
  mapStateToProps,
  { getQuestions, getAnswers, getProfileViewCount },
)(withRouter(Graph));
