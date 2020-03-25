import React from "react";
import axios from "./axios.js";

export default class UploadPic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadStatus: false
    };
    this.uploadPic = this.uploadPic.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
  }

  handleFileChange(event) {
    this.file = event.target.files[0];
    this.uploadPic();
  }

  uploadPic() {
    let formData = new FormData();
    formData.append("file", this.file);
    console.log("formData:", formData);

    axios
      .post("/upload", formData)
      .then(response => {
        console.log("happy response: ", response);
        this.props.setImage(response.data.image_url);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="uploadbox">
        <div className="upload-btn-wrapper">
          <button className="btn">Upload an Image</button>
          <input type="file" name="file" onChange={this.handleFileChange} />
        </div>
      </div>
    );
  }
}
