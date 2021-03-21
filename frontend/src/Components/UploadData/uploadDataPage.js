import UploadButton from "./UploadButton";
import "./uploadButton.css";
import React, { useState, useEffect } from "react";
import {  Link } from "react-router-dom";

export default function UploadDataPage({ filename, handleFileChange }) {
  

  const changeFile = (newValue) => {
   console.log(newValue)
    handleFileChange(newValue);
  };

  return (
    <>
	<div className="flexColumnWrapper"  >
      <UploadButton filename={filename} onChange={changeFile} style={{flex:1}} />

	  <div className="flexTextWrapper"  >
	 <p style={{fontSize:"30px"}}>OR</p>
	  </div>

	  <div className="flexTextWrapper" style={{alignItems: "flex-start"}}>
	  <div className="button" onClick={()=>changeFile("iris.csv")}>
	  <Link style={{ textDecoration: "none",color:"white"}} to="/data">Load Iris Data</Link> 
	  
	  </div>
	  </div>

	  </div>
</>
  );
}
