import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";

class People extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      People: "",
      cid: this.props.match.params.id
    };
  }
  componentWillMount() {
    axios
      .get(`${window.base_url}/enrollment/${this.state.cid}`, {
        courseId: "5ca9990d9691251f08720235"
      })
      .then(response => {
        console.log("responseData:" + response.data);

        this.setState({
          People: response.data
        });
        console.log(this.state.People);
      });
  }
  render() {
    let People = [];

    Object.assign(People, this.state.People);

    return (
      <div className="col-lg-12">
        <table className="table">
          <thead>
            <tr>
              <th>{""}</th>
              <th>Name</th>

              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {/*Display the Tbale row based on data recieved*/}
            {People.map((person, index) => {
              return (
                <tr key={index}>
                  <td>
                    <img
                      src={person.avatar}
                      alt="user"
                      className="rounded-circle"
                      width="50px"
                      height="50px"
                    />
                  </td>
                  <td>{person.name}</td>

                  <td>{person.type}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default withRouter(People);
