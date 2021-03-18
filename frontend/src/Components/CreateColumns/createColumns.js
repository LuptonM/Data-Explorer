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
import ColumnElement from "./columnComponent.js";

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

export default function CreateColumns() {
  const classes = useStyles();
  const newColOptions = ["Difference", "Regex", "Specific Transaction"];

  const [newColumns, setNewColumns] = useState([]);

  const [currentNewCol, setNewCol] = useState("");

  const handleNewColChange = (event) => {
    setNewCol(event.target.value);
  };

  const handleAddingNewCol = (event) => {
    if (currentNewCol !== "") {
      let updatedCols = [];
      newColumns.map((column) => {
        updatedCols.push(column);
      });

      const addition = {
        type: currentNewCol,
        label: "New_Col_Placeholder_Name",
        properties: [],
      };

      updatedCols.push(addition);
      setNewColumns(updatedCols);
    }
  };

  const handleRemoval = (id) => {
    // updatedCols.splice(id, 1);

    let columnCopy = [];

    newColumns.map((column, i) => {
      if (i !== id) {
        columnCopy.push(column);
        return column;
      }
    });

    setNewColumns(columnCopy);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <span>
          <InputLabel>Select Column Type</InputLabel>
          <Select
            style={{ width: 120 }}
            value={currentNewCol}
            onChange={handleNewColChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {newColOptions.map((column) => (
              // expression goes here:
              <MenuItem value={column} key={column}>
                {column}
              </MenuItem>
            ))}
          </Select>
        </span>
        <span>
          <Button onClick={handleAddingNewCol}>Add</Button>
        </span>
      </FormControl>
      {newColumns.map((newColumnItem, i, type, label, properties, index) => (
        <ColumnElement
          label={label}
          type={type}
          properties={properties}
          key={i}
          index={newColumns.indexOf(newColumnItem)}
          handleRemoveItem={handleRemoval}
          {...newColumnItem}
        />
      ))}
    </div>
  );
}
