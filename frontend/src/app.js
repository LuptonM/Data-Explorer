import React, { useState, useEffect } from "react";
import UploadDataPage from "./Components/UploadData/uploadDataPage.js";
import SideBar from "./Components/Sidebar/sidebar.js";
import HomeIcon from "@material-ui/icons/Home";
import BarChartIcon from "@material-ui/icons/BarChart";
import PublishIcon from "@material-ui/icons/Publish";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import CreateColumns from "./Components/CreateColumns/createColumns.js";
import AppCurrentWidth from "./Functions/getWidth.js";
import items from "./menuItems.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import DataTable from "./Components/DataTable/customTable.js";
import GraphSideBar from "./Components/DataExplorer/graphSideBar/graphSideBar.js";

import DataExplorer from "./Components/DataExplorer/dataExplorer.js";
import { Provider } from "react-redux";

export default function App() {
  let width = AppCurrentWidth();
  const mobileWidth = 1000;
  const [containerClass, setContainerClass] = useState("app-container");
  const [sidebarClass, setSidebarClass] = useState("sidebar-toggle-open");
  const [mobile, setMobile] = useState(false);
  const [filename, setFile] = useState();
  const [columns, setColumns] = useState();
  const [dataTypes, setTypes] = useState([]);
  const [data, setData] = useState([]);

  const handleFileChange = (newValue) => {
    setFile(newValue);
  };

  const handleGridWidth = () => {
    if (containerClass == "app-container-hidden") {
      setContainerClass("app-container");
      setSidebarClass("sidebar-toggle-open");
    } else {
      setContainerClass("app-container-hidden");
      setSidebarClass("sidebar-toggle-closed");
    }
  };

  useEffect(() => {
    width < mobileWidth ? setMobile(true) : setMobile(false);
  }, [width]);

  useEffect(() => {
    if (filename) {
      const apiURL = "/columns/".concat(filename);

      axios.get(apiURL).then((response) => {
        setColumns(response.data.columns);
      });
    }
  }, [filename]);

  useEffect(() => {
    if (filename) {
      const apiURL = "/dataTypes/".concat(filename);

      axios.get(apiURL).then((response) => {
        let newTypes = response.data;
        let arrayTypes = [];
        Object.entries(newTypes).map(([key, value]) => {
          arrayTypes.push({ column: key, type: value });
        });

        setTypes(arrayTypes);
      });
    }
  }, [filename]);

  useEffect(() => {
    if (filename) {
      const data_response = axios
        .post("/tableData", {
          filename: filename,
        })
        .then((response) => {
          setData(response.data);
        });
    }
  }, [filename]);

  return (
    //<Provider store={store}>
    <div className={containerClass}>
      <SideBar
        items={items}
        handleGridWidth={handleGridWidth}
        isMobile={mobile}
        sidebarClass={sidebarClass}
      />

      <div className="content">
        <Switch>
          <Route exact path="/">
            <div></div>
          </Route>
          <Route exact path="/data">
            <DataTable dataTypes={dataTypes} filename={filename} data={data} />
          </Route>
          <Route exact path="/upload_data">
            <UploadDataPage filename={filename} handleFileChange={handleFileChange} />
          </Route>
          <Route exact path="/configure_data"></Route>
          <Route exact path="/create_columns">
            <CreateColumns />
          </Route>
          <Route exact path="/data_explorer">
            <DataExplorer data={data} filename={filename} />
          </Route>
          <Route exact path="/draggable"></Route>
        </Switch>
      </div>
    </div>

    // </Provider>
  );
}
