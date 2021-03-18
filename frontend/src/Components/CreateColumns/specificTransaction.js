import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
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

export default function SpecificTransaction({ onChange }) {
  const classes = useStyles();
  const [properties, setProperties] = useState({
    name: "column name",
    creditColumn: "",
    debitColumn: "",
    creditValues: "",
    debitValues: "",
  });

  const [menuItems, setMenuItems] = useState(["col1", "col2", "col3"]);

  const [column, setColumn] = useState("");

  const handleColumnChange = (event) => {
    setColumn(event.target.value);
  };

  return (
    <>
      <FormControl className={classes.formControl}>
        <TextField
          required
          id="standard-required"
          label="Required"
          defaultValue="Placeholder Name"
        />
        <InputLabel>Credit Column</InputLabel>
        <Select
          style={{ width: 120 }}
          value={column}
          onChange={handleColumnChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {menuItems}
        </Select>
      </FormControl>
    </>
  );
}
