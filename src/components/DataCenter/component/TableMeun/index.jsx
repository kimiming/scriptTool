import React, { useState, useEffect } from "react";
import TableData from "../TableData";
import DataSummery from "../DataSummery";
import SMSData from "../SMSData";
import SMSSummery from "../SMSSummery";
import FirfoxData from "../FirfoxData";
import FirfoxSummery from "../FirfoxSummery";
import axios from "axios";

import "./index.css";
import {
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  GitlabOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

const items = [
  {
    key: "1",
    icon: <DesktopOutlined />,
    label: "本地Api",
  },
  {
    key: "2",
    icon: <GitlabOutlined />,
    label: "火狐狸",
  },
  {
    key: "3",
    icon: <ContainerOutlined />,
    label: "SMS",
  },
];

const TableMeun = () => {
  const [selectedKey, setSelectedKey] = useState("1"); // 默认选中第一个子菜单项
  const [contacts, setContacts] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const triggerRefresh = () => {
    setRefreshFlag((prev) => !prev);
  };
  const fetchContacts = async () => {
    const response = await axios.get("http://localhost:3001/contacts");
    setContacts(response.data);
  };

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
  };

  const renderContent = () => {
    switch (selectedKey) {
      case "1":
        return (
          <div>
            <TableData contacts={contacts} />
          </div>
        );
      case "2":
        return (
          <div>
            <FirfoxData />
          </div>
        );
      case "3":
        return (
          <div>
            <SMSData />
          </div>
        );
      default:
        return <div>Select an option</div>;
    }
  };
  const renderSummery = () => {
    switch (selectedKey) {
      case "1":
        return (
          <div>
            <DataSummery
              contacts={contacts}
              fetchContacts={fetchContacts}
              triggerRefresh={triggerRefresh}
            />
          </div>
        );
      case "2":
        return (
          <div>
            <FirfoxSummery />
          </div>
        );
      case "3":
        return (
          <div>
            <SMSSummery />
          </div>
        );
      default:
        return <div>Select an option</div>;
    }
  };
  useEffect(() => {
    fetchContacts();
  }, [selectedKey, refreshFlag]);

  return (
    <div>
      <div className="table-menu">
        <div className="menu-container">
          <Menu
            onClick={handleMenuClick}
            style={{ width: 136 }}
            defaultOpenKeys={["1", "2", "3"]}
            defaultSelectedKeys={["1"]}
            selectedKeys={[selectedKey]}
            mode="inline"
            items={items}
          />
        </div>

        <div className="data-summery">{renderSummery()}</div>
      </div>
      <div
        style={{
          marginTop: 20,
          marginBottom: 20,
          marginLeft: 20,
          marginRight: 20,
          backgroundColor: "#f0f2f5",
        }}
      >
        {renderContent()}
      </div>
    </div>
  );
};

export default TableMeun;
