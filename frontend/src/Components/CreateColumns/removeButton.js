import React, { useState, useEffect } from "react";

export default function RemoveButton({ onClick }) {
  const handleClick = () => {
    onClick(true);
  };

  return (
    <button className="icon-btn add-btn" onClick={handleClick}>
      <div className="btn-txt">Remove</div>
    </button>
  );
}
