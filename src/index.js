import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "antd/dist/reset.css"; // 引入 Ant Design 的样式
/***
 * 注意：使用 antd/dist/reset.css
从 Ant Design 4.0 版本开始，建议使用 antd/dist/reset.css 而不是 antd/dist/antd.css。你可以尝试修改引入路径：
 * 
 */

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
