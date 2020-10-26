import React, { Component } from "react";

import Dropzone from "../dropzone/Dropzone";
import Uploader from "../services/uploader";
import ModalPreview from "./modalPreview";

import "./fileUpload.css";

import { imageExtensions as extensions } from "./fileExtensions";
import { Grid, Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import PublishIcon from "@material-ui/icons/Publish";
import CheckIcon from "@material-ui/icons/Check";
import RemoveCircleOutlineSharpIcon from "@material-ui/icons/RemoveCircleOutlineSharp";

const UPLOAD_URL = process.env.REACT_APP_UPLOAD_ENDPOINT;

class FileUpload extends Component {
  state = {
    files: [],
    preview: "",
    pseudoFile: this.props.pseudoFile,
  };
  // preview: URL.createObjectURL(accepted[0]
  onFilesAdded = (files) => {
    for (let i = 0; i < files.length; i++) {
      const fileToUpload = files[i];
      let doesFileExist = this.state.files.filter((file) =>
        this.compareFiles(file.content, fileToUpload)
      );

      if (doesFileExist[0]) {
        continue;
      } else {
        this.setState((prevState) => ({
          files: prevState.files.concat({
            uploading: false,
            completed: false,
            content: fileToUpload,
            percentage: 0,
            error: "",
          }),
        }));
      }
    }
  };

  compareFiles = (fileToCompareTO, fileToUpload) => {
    if (
      fileToUpload.name === fileToCompareTO.name &&
      fileToUpload.size === fileToCompareTO.size &&
      fileToUpload.lastModified === fileToCompareTO.lastModified
    ) {
      return true;
    } else {
      return false;
    }
  };

  sendRequest = (fileToUpload) => {
    const { content: file } = fileToUpload;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", () => {
      const files = this.state.files;
      console.log(files);
      const index = files.indexOf(fileToUpload);
      fileToUpload.completed = true;
      fileToUpload.uploading = false;
      fileToUpload.error = "";
      files[index] = fileToUpload;
      console.log(files);
      const copy = { ...this.state.uploadProgress };
      copy[file.name] = { state: "done", percentage: 100 };
      this.setState({ uploadProgress: copy, files });

      this.props.setFile(reader.result);
    });
  };

  async uploadFile(fileItem, condition) {
    const fileToUpload = fileItem;
    const files = this.state.files;
    const index = files.indexOf(fileToUpload);

    if (condition === "cancel") {
      // console.log(index)
      files.splice(index, 1);
      // console.log(files)
      this.setState({ files });
    }
    if (condition === "finished" || condition === "uploading") {
      // console.log("finished")
    }
    if (condition === "upload") {
      fileToUpload.uploading = true;
      files[index] = fileToUpload;
      this.setState({ files });

      const promise = this.sendRequest(fileToUpload);

      try {
        await promise;
      } catch (e) {
        fileToUpload.error = "error";
        fileToUpload.uploading = true;
        files[index] = fileToUpload;
        this.setState({ files });
      }
    }
  }

  fileDetails = (fileContent) => {
    const name =
      fileContent.name.length > 20
        ? fileContent.name.slice(0, 20) + "..."
        : fileContent.name;
    let size = fileContent.size;
    if (size <= 200) {
      size = fileContent.size;
      size = size.toFixed(2) + " b";
    } else if (size > 200 && size <= 110000) {
      size = fileContent.size * 0.00098;
      size = size.toFixed(2) + " kb";
    } else if (size > 110000) {
      size = fileContent.size * 0.00098 * 0.00098;
      size = size.toFixed(2) + " mb";
    }
    return { fileName: name, fileSize: size };
  };

  progressContent = (file) => {
    // console.log(file.percentage)
    if (file.percentage === 0 && !file.uploading && file.completed !== true) {
      return {
        color: "black",
        content: (
          <PublishIcon
            style={{ color: "#ffffff", fontSize: "18px", paddingTop: "5px" }}
          />
        ),
        condition: "upload",
      };
    } else if (file.percentage < 100 && file.completed !== true) {
      return { color: "#ffffff", content: "", condition: "uploading" };
    } else if (file.percentage === 0 && file.completed === true) {
      return {
        color: "#ffffff",
        content: (
          <CheckIcon
            style={{ color: "#ffffff", fontSize: "18px", paddingTop: "5px" }}
          />
        ),
        condition: "finished",
      };
    }
  };

  previewFile = (fileToUpload) => {
    const imageExtensions = extensions;
    const fileType = fileToUpload.name.substring(
      fileToUpload.name.lastIndexOf("."),
      fileToUpload.name.length
    );
    if (imageExtensions.indexOf(fileType) !== -1) {
      const file = fileToUpload;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function (e) {
        this.setState({
          preview: [reader.result],
        });
      }.bind(this);
    } else {
      this.setState({
        preview: "",
      });
    }
  };

  renderUploaded = (pseudoFile) => {
    const imageExtensions = extensions;
    const mimetype = pseudoFile.mimetype;
    return (
      <Grid
        className="file-container file-list"
        container
        direction="row"
        alignItems="center"
      >
        <Grid
          item
          onClick={() => this.setState({ pseudoFile: "" })}
          className="upload-circle cancel-upload"
          style={{ cursor: "pointer" }}
        >
          <span className="progress-content">
            <RemoveCircleOutlineSharpIcon
              style={{ color: "#eb4034", opacity: 0.8 }}
            />
          </span>
        </Grid>

        <div className="file-hover-menu-c">
          <ModalPreview
            preview={
              imageExtensions.indexOf(mimetype) !== -1
                ? `${pseudoFile.path}`
                : null
            }
          />
        </div>

        <Grid item className="file-list-details">
          <Typography variant="body1" noWrap className="file-name">
            {pseudoFile.filename}
          </Typography>
        </Grid>
        <Grid item style={{ marginLeft: "auto", marginRight: "20px" }}></Grid>

        <Grid item className="upload-circle">
          <CircularProgress
            variant="static"
            style={{ color: "#ffffff", width: "100%", height: "100%" }}
            value={100}
          />
          <span className="progress-content" style={{ fontSize: "12px" }}>
            {" "}
            <CheckIcon style={{ color: "#ffffff" }} />{" "}
          </span>
        </Grid>
      </Grid>
    );
  };

  renderProgress(file) {
    const { color, content, condition } = this.progressContent(file);
    const { fileName, fileSize } = this.fileDetails(file.content);
    return (
      <Grid
        className="file-container file-list"
        container
        direction="row"
        alignItems="center"
      >
        <Grid
          item
          onClick={() => this.uploadFile(file, "cancel")}
          className="upload-circle cancel-upload"
          style={{ cursor: "pointer" }}
        >
          <span className="progress-content">
            <RemoveCircleOutlineSharpIcon
              style={{ color: "#eb4034", opacity: 0.8 }}
            />
          </span>
        </Grid>

        <div
          className="file-hover-menu-c"
          onClick={() => this.previewFile(file.content)}
        >
          <ModalPreview preview={this.state.preview} />
        </div>

        <Grid item className="file-list-details">
          <p className="file-name">{fileName}</p>
          <p className="file-size">{fileSize}</p>
        </Grid>

        <Grid item style={{ marginLeft: "auto", marginRight: "20px" }}>
          <p className="upload-error">{file.error}</p>
        </Grid>

        <Grid
          item
          onClick={() => this.uploadFile(file, condition)}
          className="upload-circle"
          style={{ cursor: condition === "upload" ? "pointer" : "auto" }}
        >
          <CircularProgress
            variant="static"
            style={{ color: color, width: "100%", height: "100%" }}
            value={file.percentage}
          />
          <span className="progress-content" style={{ fontSize: "12px" }}>
            {content ? content : `${file.percentage}%`}
          </span>
        </Grid>
      </Grid>
    );
  }

  disableDropZone = () => {
    //max(for maximum number of files),accept,multiple are props passed for fileUpload
    const maxAllowed = this.props.max;
    const { files } = this.state;
    if (maxAllowed <= files.length) {
      return true;
    }
  };

  render() {
    console.log(this.state.files);
    return (
      <React.Fragment>
        <div>
          <Dropzone
            onFilesAdded={this.onFilesAdded}
            disabled={this.disableDropZone()}
            accept={this.props.accept || ""}
            multiple={this.props.multiple || false}
            max={this.props.max || "infinite"}
            currentUploaded={this.state.files.length}
          />
        </div>

        <div>
          {this.state.files.map((file) => {
            return (
              <div key={file.content.name} className="file-preview">
                {this.renderProgress(file)}
              </div>
            );
          })}
        </div>

        {this.state.pseudoFile
          ? this.renderUploaded(this.state.pseudoFile)
          : null}
      </React.Fragment>
    );
  }
}

export default FileUpload;
