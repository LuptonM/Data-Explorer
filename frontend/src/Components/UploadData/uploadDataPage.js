import UploadButton from "./UploadButton";
import "./uploadButton.css";
import React, { useState, useEffect } from "react";

export default function UploadDataPage({ filename, handleFileChange }) {
  

  const changeFile = (newValue) => {
    setFilename(newValue);
    handleFileChange(newValue);
  };

  return (
    <div>
      <UploadButton filename={filename} onChange={changeFile} />
    </div>
  );
}
