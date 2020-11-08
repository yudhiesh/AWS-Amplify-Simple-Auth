import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Router from "./Router";
import "antd/dist/antd.css";

import Amplify from "aws-amplify";
import config from "./aws-exports.js";
Amplify.configure(config);

ReactDOM.render(<Router />, document.getElementById("root"));
