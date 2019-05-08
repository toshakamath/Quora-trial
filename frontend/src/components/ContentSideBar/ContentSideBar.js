import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getContentQuestions, getContentAnswers, getContentFollowedQuestions } from "../../Actions/contentAction";

import "./ContentSideBar.css";
class ContentSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Year: "2019",
      Type: "AllType",
      Sort: "Latest"
    }
  }

  async searchYear(id, e) {
    e.preventDefault()
    await (this.setState({
      Year: id
    }))

    console.log(this.state.Year)
    this.searchCall(this.state.Year, this.state.Type, this.state.Sort);
  }
  async searchType(id, e) {
    e.preventDefault()
    await (this.setState({
      Type: id
    }))
    console.log(this.state.Type)
    this.searchCall(this.state.Year, this.state.Type, this.state.Sort);

  }
  async searchSort(id, e) {
    e.preventDefault()
    await (this.setState({
      Sort: id
    }))
    console.log(this.state.Sort)
    this.searchCall(this.state.Year, this.state.Type, this.state.Sort);

  }




  searchCall = (year, type, sort) => {

    console.log("CONTENTSIDEBAR type:", type);

    if (type === "All Types") {
      this.props.getContentQuestions(year, type, sort);
      this.props.getContentAnswers(year, type, sort);
      this.props.getContentFollowedQuestions(year, type, sort);
    }
    else if (type === "Questions Asked") {
      this.props.getContentQuestions(year, type, sort);
    }
    else if (type === "Questions Followed") {
      this.props.getContentFollowedQuestions(year, type, sort);
    }
    else if (type === "Answers") {
      this.props.getContentAnswers(year, type, sort);
    }
  }

  render() {
    console.log("sidebarprops:" + this.props.id);

    return (
      <div className="ContentSideBarWrapper">
        <div className="ContentSideBarInner">





          {/* <ul className="sidebarList">
            <li className="SwitcherItemWithImage">
              <Link
                to={`/courses/${this.props.id}/Home`}
                className="swictherLink"
              >
                <div className="switcherImgWrapper">
                  <div className="swictherImg" />
                </div>
                <label>Feed</label>
              </Link>
            </li>
            apply map here for topic
          </ul> */}



          {/* <div class="list-group" id="content-side-bar">
            <h4>By Content Type</h4>

            <Link to="#" class="list-group-item list-group-item-action list-group-item-light" onClick={this.searchType.bind(this, "All Types")}>All Types</Link>
            <Link to="#" class="list-group-item list-group-item-action list-group-item-light" onClick={this.searchType.bind(this, "Questions Asked")}>Questions Asked</Link>
            <Link to="#" class="list-group-item list-group-item-action list-group-item-light" onClick={this.searchType.bind(this, "Questions Followed")}>Questions Followed</Link>
            <Link to="#" class="list-group-item list-group-item-action list-group-item-light" onClick={this.searchType.bind(this, "Answers")}>Answers</Link>
            <h4>By Year</h4>
            <Link to="#" class="list-group-item list-group-item-action list-group-item-light" onClick={this.searchYear.bind(this, "All Time")}>All Time</Link>
            <Link to="#" class="list-group-item list-group-item-action list-group-item-light" onClick={this.searchYear.bind(this, 2019)}>2019</Link>
            <Link to="#" class="list-group-item list-group-item-action list-group-item-light" onClick={this.searchYear.bind(this, 2018)}>2018</Link>
            <Link to="#" class="list-group-item list-group-item-action list-group-item-light" onClick={this.searchYear.bind(this, 2017)}>2017</Link>
            <Link to="#" class="list-group-item list-group-item-action list-group-item-light" onClick={this.searchYear.bind(this, 2016)}>2016</Link>
            <Link to="#" class="list-group-item list-group-item-action list-group-item-light" onClick={this.searchYear.bind(this, 2015)}>2015</Link>

            <h4>Sort Order</h4>
            <Link to="#" class="list-group-item list-group-item-action list-group-item-light" onClick={this.searchSort.bind(this, "NewestFist")}>Newest First</Link>
            <Link to="#" class="list-group-item list-group-item-action list-group-item-light" onClick={this.searchSort.bind(this, "OldestFirst")}>Oldest First First</Link>




          </div> */}



          <div class="list-group" id="content-side-bar">
            <h4>By Content Type</h4>
            <div class="list-group" role="tablist">
              <Link to="#" class="list-group-item list-group-item-action active" data-toggle="list" role="tab" onClick={this.searchType.bind(this, "All Types")}>All Types</Link>
              <Link to="#" class="list-group-item list-group-item-action" data-toggle="list" role="tab" onClick={this.searchType.bind(this, "Questions Asked")}>Questions Asked</Link>
              <Link to="#" class="list-group-item list-group-item-action" data-toggle="list" role="tab" onClick={this.searchType.bind(this, "Questions Followed")}>Questions Followed</Link>
              <Link to="#" class="list-group-item list-group-item-action" data-toggle="list" role="tab" onClick={this.searchType.bind(this, "Answers")}>Answers</Link>
            </div>

            <h4>By Year</h4>
            <div class="list-group" role="tablist">
              <Link to="#" class="list-group-item list-group-item-action active" id="list-settings-list" data-toggle="list" href="#list-settings" role="tab" aria-controls="settings" onClick={this.searchYear.bind(this, "All Time")}>All Time</Link>
              <Link to="#" class="list-group-item list-group-item-action" id="list-settings-list" data-toggle="list" href="#list-settings" role="tab" aria-controls="settings" onClick={this.searchYear.bind(this, 2019)}>2019</Link>
              <Link to="#" class="list-group-item list-group-item-action" id="list-settings-list" data-toggle="list" href="#list-settings" role="tab" aria-controls="settings" onClick={this.searchYear.bind(this, 2018)}>2018</Link>
              <Link to="#" class="list-group-item list-group-item-action" id="list-settings-list" data-toggle="list" href="#list-settings" role="tab" aria-controls="settings" onClick={this.searchYear.bind(this, 2017)}>2017</Link>
              <Link to="#" class="list-group-item list-group-item-action" id="list-settings-list" data-toggle="list" href="#list-settings" role="tab" aria-controls="settings" onClick={this.searchYear.bind(this, 2016)}>2018</Link>
              <Link to="#" class="list-group-item list-group-item-action" id="list-settings-list" data-toggle="list" href="#list-settings" role="tab" aria-controls="settings" onClick={this.searchYear.bind(this, 2015)}>2015</Link>
            </div>

            <h4>Sort Order</h4>
            <div class="list-group" role="tablist">
              <Link to="#" class="list-group-item list-group-item-action active" id="list-settings-list" data-toggle="list" href="#list-settings" role="tab" aria-controls="settings" onClick={this.searchSort.bind(this, "NewestFist")}>Newest First</Link>
              <Link to="#" class="list-group-item list-group-item-action" id="list-settings-list" data-toggle="list" href="#list-settings" role="tab" aria-controls="settings" onClick={this.searchSort.bind(this, "OldestFirst")}>Oldest First First</Link>
            </div>
          </div>

        </div >
      </div >
    );
  }
}

const mapStateToProps = state => ({
  loginStateStore: state.auth,
  content: state.content,
  contentAnswered: state.contentAnswered,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getContentAnswers, getContentQuestions, getContentFollowedQuestions }
)(withRouter(ContentSideBar));
