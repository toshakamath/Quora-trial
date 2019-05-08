import React, { Component } from "react";

import axios from "axios";
import "./File.css";

export class Files extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cid: this.props.match.params.id,
      file: null
    };
    this.fileHandler = this.fileHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  componentDidMount() {
    axios
      .get(`${window.base_url}/users/courses/${this.state.cid}/file`)
      .then(response => {
        console.log(response.data);
        this.setState({
          file: response.data
        });
      });
  }

  fileHandler = e => {
    this.setState({
      file: e.target.files[0]
    });
  };

  submitHandler = e => {
    e.preventDefault();
    let data = new FormData();
    data.append("lecturefile", this.state.file);
    axios
      .post(`${window.base_url}/users/courses/${this.state.cid}/file`, data)
      .then(response => {
        if (response.data === "success") {
          alert("File Uploaded.");
        } else if (response.data === "error") {
          alert("Something went wrong.");
        }
      });
  };

  render() {
    let files = [];
    Object.assign(files, this.state.file);
    //const isStudent = Cookies.get("role") === "student";
    const isStudent = false;
    return (
      <div>
        <div className="pageContent">
          <div className="row">
            <div className="col-9 coursecolumn">
              <h3>Files</h3>
              <br />
              {files.map((file, index) => {
                console.log(file);
                return (
                  <div
                    key={index}
                    className="filelist"
                    width="20"
                    height="100px"
                  >
                    <a
                      href={`${window.base_url}/files/uploads/${file}`}
                      download
                      target="_blank"
                      rel="noreferrer"
                    >
                      <embed
                        src={`${
                          window.base_url
                        }/files/uploads/${file}#toolbar=1&navpanes=1&scrollbar=1`}
                        width="100%"
                        height="500px"
                        className="embedd"
                      />

                      {file}
                    </a>
                    {/*  <iframe
                      src={`${window.base_url}/files/uploads/${file}`}
                      width="700"
                      height="500"
                      id="frame"
                  /> */}
                  </div>
                );
              })}
              {!isStudent ? (
                <form onSubmit={this.submitHandler}>
                  <input type="file" onChange={this.fileHandler} required />
                  <button type="submit" className="btn btn-primary">
                    Upload
                  </button>
                </form>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Files;
