import React, { useState, useEffect } from "react";
import axios from "axios";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ColumnConfigItem from "./columnConfigItem.js";
import TableBody from "./tableBody.js";
import "./table.css";
import "../button.css";
import HelpIcon from "@material-ui/icons/Help";
import Pagination from "../Pagination/pagination.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function TableHeader(dataTypes) {
  const [columnConfig, setConfig] = useState();

  useEffect(() => {
    let newTypes = [];

    dataTypes.dataTypes.map((item) => {
      newTypes.push({
        column: item.column,
        type: item.type,
        arrow: <ExpandMoreIcon />,
        showTypes: false,
      });
    });

    setConfig(newTypes);
  }, [dataTypes]);

  const handleShowTypes = (id) => {
    let newConfig = [];
    let newColumnConfig = columnConfig;

    newColumnConfig.map((column, i) => {
      if (i === id) {
        if (column.showTypes) {
          column.showTypes = false;
          column.arrow = <ExpandMoreIcon />;
        } else {
          column.showTypes = true;
          column.arrow = <ExpandLessIcon />;
        }
      }
      newConfig.push(column);
    });

    setConfig(newConfig);
  };

  const handleType = (id, newType) => {
    let newConfig = [];
    let newColumnConfig = columnConfig;

    newColumnConfig.map((column, i) => {
      if (i === id) {
        column.showTypes = false;
        column.arrow = <ExpandMoreIcon />;
        column.type = newType;
      }
      newConfig.push(column);
    });

    setConfig(newConfig);
  };

  return (
    <>
      <tr className="table-headers">
        {columnConfig
          ? columnConfig.map(
              (columnItem, i, column, type, arrow, showTypes) => (
                <ColumnConfigItem
                  key={i}
                  i={i}
                  type={type}
                  column={column}
                  arrow={arrow}
                  handleShowTypes={handleShowTypes}
                  handleType={handleType}
                  showTypes={showTypes}
                  {...columnItem}
                />
              )
            )
          : null}
      </tr>
    </>
  );
}

export default function DataTable({ filename, dataTypes, data }) {
  const [pageSize, setPageSize] = useState(5);
  const [totalRecords, setTotalRecords] = useState(0);
  const [startingIndex, setStartingIndex] = useState(0);

  const handlePagination = (selectedPage, pageSize) => {
    let startIndex = pageSize * (selectedPage - 1);

    setStartingIndex(startIndex);
  };

  useEffect(() => {
    setTotalRecords(data.length);
  }, [data]);

  return (
    <div className="customTable">
      <br />
      {data.length > 0 ? (
        <>
          <p>Review and refine the data types</p>
          <br />

          <div className="tableWrapper">
            <table className="styled-table">
              <tbody>
                <TableHeader dataTypes={dataTypes} />
                <TableBody
                  data={data.slice(startingIndex, startingIndex + pageSize)}
                />
              </tbody>
            </table>
          </div>
          <Pagination
            totalRecords={totalRecords}
            pageSize={5}
            pageNeighboursSize={1}
            handlePagination={handlePagination}
          />
        </>
      ) : (
        <>
          <p>Please Upload Data First</p>
          <br />

          <button>
            <Link to="/upload_data">Navigate to Data</Link>
          </button>
        </>
      )}
    </div>
  );
}