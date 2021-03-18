import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import RemoveButton from "./removeButton";
import SpecificTransaction from "./specificTransaction.js";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },
});

export default function ColumnElement({
  type,
  label,
  index,
  handleRemoveItem,
}) {
  const removeItem = (id) => {
    handleRemoveItem(id);
  };

  const handleProperties = (newValue) => {
    console.log(newValue);
  };

  const [column_UI, setColumn_UI] = useState(<div></div>);

  useEffect(() => {
    if (type === "Specific Transaction") {
      setColumn_UI(
        <div>
          <SpecificTransaction onChange={handleProperties} />{" "}
          <RemoveButton index={index} onClick={() => removeItem(index)} />{" "}
        </div>
      );
    } else {
      setColumn_UI(
        <div>
          <p id={index}>{type.concat(index.toString())} </p>
          <RemoveButton onClick={() => removeItem(index)} />
        </div>
      );
    }
  }, [type]);

  return <>{column_UI}</>;
}
