import React, { useState, useEffect } from "react";

export default function AxisLabel({ handleLabel, id, placeholder }) {
  const handleInput = (event) => {
    handleLabel(event.target.value);
  };

  return (
    <input
      type="text"
      autoComplete="off"
      placeholder={placeholder}
      className={id}
      id={id}
      onChange={(event) => handleLabel(event)}
    />
  );
}
