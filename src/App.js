import React, { useState } from "react";
import Tovcf from "./components/Tovcf";
import DataCenter from "./components/DataCenter";
import SricptCenter from "./components/SricptCenter";
import ConfigCenter from "./components/ConfigCenter";
import SaveSession from "./components/SaveSession";
import { Tabs } from "antd";
import "./App.css";

function App() {
  const [activeKey, setActiveKey] = useState();
  const onChange = (key) => {
    setActiveKey(key);
  };
  const items = [
    {
      key: "1",
      label: "脚本中心",
      children: <SricptCenter />,
    },
    {
      key: "2",
      label: "数据中心",
      children: <DataCenter />,
    },
    {
      key: "3",
      label: "配置中心",
      children: <ConfigCenter activeKey={activeKey} />,
    },
    {
      key: "4",
      label: "转化为vcf",
      children: <Tovcf />,
    },
    {
      key: "5",
      label: "保存session",
      children: <SaveSession />,
    },
  ];
  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
        centered
      ></Tabs>
    </div>
  );
}

export default App;
