import React, { Component } from "react";
import "./Dropzone.css";
import cloudUpload from './cloudImg.svg'
class Dropzone extends Component {
  constructor(props) {
    super(props);
    this.state = { hightlight: false, message: "" };
    this.fileInputRef = React.createRef();

  }

  messages = ["Drag and drop files or click to upload"
    , "You can't upload any more files",
    "Only " + this.props.max + " uploads allowed"]

  mapMessages = () => {
    if (!this.props.disabled && this.state.dragExceeded) {
      return this.messages[2]
    }
    if (!this.props.disabled) {
      return this.messages[0]
    }
    if (this.props.disabled) {
      return this.messages[1]
    }

  }

  openFileDialog = (event) => {
    if (this.props.disabled) return;
    event.target.value = ''
    this.fileInputRef.current.click();
  }

  onFilesAdded = evt => {
    if (this.props.disabled) return;
    const files = evt.target.files;
    if (this.props.onFilesAdded) {
      const array = this.fileListToArray(files);
      this.props.onFilesAdded(array);
    }
  }

  onDragOver = event => {
    event.preventDefault();
    if (this.props.disabled) return;
    this.setState({ hightlight: true });
  }

  onDragLeave = (event) => {
    event.preventDefault();
    this.setState({ hightlight: false });
  }

  onDrop = (event) => {
    event.preventDefault();
    if (this.props.disabled) return;

    const files = event.dataTransfer.files;

    if (this.props.max < files.length || this.props.max < this.props.currentUploaded + files.length) {
      this.setState({ hightlight: false, dragExceeded: true }); return
    }

    if (this.props.onFilesAdded) {
      const array = this.fileListToArray(files);
      this.props.onFilesAdded(array);
    }

    this.setState({ hightlight: false, dragExceeded: false });
  }

  fileListToArray = (list) => {
    const array = [];
    for (var i = 0; i < list.length; i++) {
      array.push(list.item(i));
    }
    return array;
  }

  render() {
    return (
      <div
        className={`Dropzone ${this.state.hightlight ? "Highlight" : ""}`}
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
        onClick={this.openFileDialog}
        style={{ cursor: this.props.disabled ? "default" : "pointer" }}
      >
        <input
          ref={this.fileInputRef}
          className="FileInput"
          type="file"
          onChange={this.onFilesAdded}
          multiple={this.props.multiple || false}
          accept={this.props.accept || ""}
        />
        <img
          alt="upload"
          className="Icon"
          src={cloudUpload}
        />
        <span>{this.mapMessages()}</span>
      </div>
    );
  }
}

export default Dropzone;
