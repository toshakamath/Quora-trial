import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./ContentSideBar.css";
class ContentSideBar extends Component {
  constructor(props) {
    super(props);
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
          <div class="list-group">
          <h4>By Content Type</h4>
          <a href="#" class="list-group-item list-group-item-action list-group-item-light">All Types</a>
          <a href="#" class="list-group-item list-group-item-action list-group-item-light">Questions Asked</a>
          <a href="#" class="list-group-item list-group-item-action list-group-item-light">Questions Followed</a>
          <a href="#" class="list-group-item list-group-item-action list-group-item-light">Answers</a>
          <h4>By Year</h4>
          <a href="#" class="list-group-item list-group-item-action list-group-item-light">All Types</a>
          <a href="#" class="list-group-item list-group-item-action list-group-item-light">Questions Asked</a>
          <a href="#" class="list-group-item list-group-item-action list-group-item-light">Questions Followed</a>
          <a href="#" class="list-group-item list-group-item-action list-group-item-light">Answers</a>
          <h4>Sort Order</h4>
          <a href="#" class="list-group-item list-group-item-action list-group-item-light">Newest First</a>
          <a href="#" class="list-group-item list-group-item-action list-group-item-light">Oldest First</a>
          </div>

        </div>
      </div>
    );
  }
}

export default withRouter(ContentSideBar);
