import UploadButton from "./UploadButton";
import "./uploadButton.css";
import React, { useState, useEffect } from "react";

export default function UploadDataPage({ filename, handleFileChange }) {
  

  const changeFile = (newValue) => {
   
    handleFileChange(newValue);
  };

  return (
    <>
      <UploadButton filename={filename} onChange={changeFile} />
</>
  );
}
