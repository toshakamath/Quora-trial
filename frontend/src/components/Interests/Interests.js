import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./interests.css";
var topicsSelected = require("../../Actions/authAction").topicsSelected;

class Interests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interests: [],
      count: 0
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  /**** Handle the selected topics ****/

  handleSelect(name, url) {
    let topic = {
      topicName: name,
      topicImage: url
    };
    var data = this.state.interests.slice();
    let position = data
      .map(e => {
        return e.topicName;
      })
      .indexOf(topic.topicName);

    if (position < 0) {
      data.push(topic);
      this.setState({ count: this.state.count + 1 });
    } else {
      data.splice(position, 1);
      this.setState({ count: this.state.count - 1 });
      console.log("inside the else ", this.state.count);
    }
    this.setState({ interests: data });
    console.log("this is just data", data);
    console.log("count value ", this.state.count);
  }

  /**** Push data to action ****/
  handleSubmit(e) {
    console.log("Enterd here");
    e.preventDefault();
    this.props.topicsSelected(
      { topics: this.state.interests },
      this.props.history
    );
  }

  renderTopic(id, value, src) {
    return (
      <li className="interestli">
        <input
          type="checkbox"
          id={id}
          value={value}
          onChange={() => this.handleSelect(value, src)}
        />
        <label className="interestlabel" htmlFor={id}>
          <img
            className="icon"
            style={{ width: "105px", height: "105px", marginTop: "0px" }}
            src={src}
            alt="topic"
          />
          <span className="topic">{value}</span>
        </label>
      </li>
    );
  }

  render() {
    return (
      <div>
        <hr className="line" />
        <img
          className="quoralogo"
          src="//qsf.fs.quoracdn.net/-3-images.logo.wordmark_default.svg-26-bfa6b94bc0d6af2e.svg"
        />
        <div className="showprogress">
          <div className="progress" id="progressdiv">
            <div
              id="progressline"
              className="progress-bar w-50"
              role="progressbar"
            />
          </div>
        </div>
        <hr />
        <form>
          <ul className="ulinterest">
            {this.renderTopic(
              "cb1",
              "Movies",
              "https://qph.fs.quoracdn.net/main-thumb-t-91897-200-yY8nIy06AZfO6ug7Z1IsuaNyy3CNbwqO.jpeg"
            )}
            {this.renderTopic(
              "cb2",
              "Music",
              "https://qph.fs.quoracdn.net/main-thumb-t-1816-200-044pwH9t9TzQuGDxHEtWz7i2aJwmhKNJ.jpeg"
            )}
            {this.renderTopic(
              "cb3",
              "TV Series",
              "https://qph.fs.quoracdn.net/main-thumb-t-3229-200-uazulrnpoeacbeuytiyqovquifuuurer.jpeg"
            )}
            {this.renderTopic(
              "cb4",
              "Finance",
              "https://qph.fs.quoracdn.net/main-thumb-t-1577-200-2Y1xdlmMN0t6D6EGH3eBKZzLPLNtrw5q.jpeg"
            )}
            {this.renderTopic(
              "cb5",
              "Marketing",
              "https://qph.fs.quoracdn.net/main-thumb-t-1842-200-rugikvztqhqopsvnsttkotqbdeipavbx.jpeg"
            )}
            {this.renderTopic(
              "cb6",
              "Journalism",
              "https://qph.fs.quoracdn.net/main-thumb-t-2184-200-mx1kRZSC3QrxOfVLbN7QSX094Qyfi88P.jpeg"
            )}
            {this.renderTopic(
              "cb7",
              "Medicine",
              "https://qph.fs.quoracdn.net/main-thumb-t-815-200-jwB0e3RHQFNLKWUS80eZz8potbBuXckD.jpeg"
            )}
            {this.renderTopic(
              "cb8",
              "Food",
              "https://qph.fs.quoracdn.net/main-thumb-t-1553-200-OLl3pIH6SNAJ32hA8k1UKc8INnS3v8Xb.jpeg"
            )}
            {this.renderTopic(
              "cb9",
              "Technology",
              "https://qph.fs.quoracdn.net/main-thumb-t-20468-200-ydkwvplujqmhgkifcnrpaojmqcjnyyti.jpeg"
            )}
            {this.renderTopic(
              "cb10",
              "Sports",
              "https://qph.fs.quoracdn.net/main-thumb-t-3239-200-RSQUsoM8bAghJkyg37zbbYgC991ZTXbv.jpeg"
            )}
            {this.renderTopic(
              "cb11",
              "Science",
              "https://qph.fs.quoracdn.net/main-thumb-t-2177-200-JiR07D1TQSfeQzRvWXomVaY4Poj2f8Yb.jpeg"
            )}
            {this.renderTopic(
              "cb12",
              "Bollywood",
              "https://qph.fs.quoracdn.net/main-thumb-t-836-200-bwdbfptkjlccqtyxqlglhtkepgtqqpnm.jpeg"
            )}
          </ul>
          <button
            disabled={this.state.count < 6}
            className="btn btn-primary"
            id="interestbutton"
            onClick={this.handleSubmit}
          >
            {this.state.count <= 6 ? (
              <div>{6 - this.state.count} More Topics to Continue</div>
            ) : (
              <div> Continue </div>
            )}
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userData,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { topicsSelected }
)(withRouter(Interests));
