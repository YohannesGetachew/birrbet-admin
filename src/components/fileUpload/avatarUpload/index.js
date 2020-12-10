import { Avatar, IconButton } from "@material-ui/core";
import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import avatarUploadStyle from "./style";

const AvatarUpload = ({ getFile, initialFile, label }) => {
  const [currentFile, setCurrentFile] = useState("");
  const fileInputRef = useRef();

  useEffect(() => {
    if (currentFile) {
      // here is where you do the upload logic
      getFile(currentFile);
    }
  }, [currentFile, getFile]);

  const fileToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", () => setCurrentFile(reader.result));
  };

  const handleFileChange = (e) => {
    const file = fileInputRef?.current?.files[0];
    if (file !== null) {
      fileToBase64(file);
    }
  };

  const style = avatarUploadStyle();
  return (
    <div className={style.root}>
      <input
        accept="image/*"
        id="file-input"
        type="file"
        className={style.input}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <label htmlFor="file-input">
        <IconButton component="span">
          <Avatar
            src={currentFile ? currentFile : initialFile}
            className={style.avatar}
          />
        </IconButton>
      </label>
    </div>
  );
};

export default AvatarUpload;
