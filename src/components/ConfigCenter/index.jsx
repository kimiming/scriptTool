import React, { useState, useEffect } from "react";
import { Button, Typography, Input, Form, notification } from "antd";
import { SmileOutlined, FrownFilled } from "@ant-design/icons";
import axios from "axios";
import "./index.css";

function ConfigCenter(props) {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = () => {
    api.open({
      message: "配置保存成功",
      icon: (
        <SmileOutlined
          style={{
            color: "#108ee9",
          }}
        />
      ),
      duration: 2,
    });
  };
  const errNotification = (error) => {
    api.open({
      message: "配置保存失败",
      description: error.message,
      icon: (
        <FrownFilled
          style={{
            color: "#f5222d",
          }}
        />
      ),
      duration: 0,
    });
  };
  const { activeKey } = props;
  const [contactsFilePath, setContactsFilePath] = useState("");
  const [avatarFilePath, setAvatarFilePath] = useState("");
  const [sessionFilePath, setSessionFilePath] = useState("");
  const [friendsFilePath, setFriendsFilePath] = useState("");

  console.log(
    "data",
    contactsFilePath,
    avatarFilePath,
    sessionFilePath,
    friendsFilePath
  );

  const handleFileSelect = (setter) => async () => {
    const filePaths = await window.selectDirectory();
    setContactsFilePath(filePaths);
  };
  const handleFileSelect2 = (setter) => async () => {
    const filePaths = await window.selectDirectory();
    setAvatarFilePath(filePaths);
  };
  const handleFileSelect3 = (setter) => async () => {
    const filePaths = await window.selectDirectory();
    setSessionFilePath(filePaths);
  };
  const handleFileSelect4 = (setter) => async () => {
    const filePaths = await window.selectDirectory();
    setFriendsFilePath(filePaths);
  };

  const getConfigData = async () => {
    const res = await axios.get("http://localhost:3001/api/config");
    console.log(11111111111111, res);
    setContactsFilePath(res.data.contactsFilePath);
    setAvatarFilePath(res.data.avatarFilePath);
    setSessionFilePath(res.data.sessionFilePath);
    setFriendsFilePath(res.data.friendsFilePath);
  };

  let saveConfigData = async () => {
    const config = {
      contactsFilePath,
      avatarFilePath,
      sessionFilePath,
      friendsFilePath,
    };

    try {
      let res = await axios.post("http://localhost:3001/api/config", config);
      if (res) {
        openNotification();
      }
    } catch (error) {
      console.error("保存配置时出错:", error);
      errNotification(error);
    }
  };
  useEffect(() => {
    getConfigData();
  }, [activeKey]);

  return (
    <div className="config-center">
      {contextHolder}
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
      >
        <div className="config-center-item">
          <div className="config-center-item-title">获取通讯录</div>
          <div>
            <Typography.Title level={5}>当前文件路径:</Typography.Title>
            <Form.Item label="保存路径" name="contactsFilePath">
              <div className="config-center-item-input">
                <div style={{ width: "300px", marginRight: 20 }}>
                  <Input
                    placeholder="请输入文件路径"
                    defaultValue={contactsFilePath}
                    value={contactsFilePath}
                    onChange={(e) => setContactsFilePath(e.target.value)}
                  />
                </div>

                <Button
                  type="primary"
                  onClick={handleFileSelect(setContactsFilePath)}
                >
                  选择路径
                </Button>
              </div>
            </Form.Item>
          </div>
        </div>
        <div className="config-center-item">
          <div className="config-center-item-title">获取头像</div>
          <div>
            <Typography.Title level={5}>当前文件路径:</Typography.Title>
            <Form.Item label="保存路径" name="avatarFilePath">
              <div className="config-center-item-input">
                <div style={{ width: "300px", marginRight: 20 }}>
                  <Input
                    placeholder="请输入文件路径"
                    defaultValue={avatarFilePath}
                    value={avatarFilePath}
                    onChange={(e) => setAvatarFilePath(e.target.value)}
                  />
                </div>

                <Button
                  type="primary"
                  onClick={handleFileSelect2(setAvatarFilePath)}
                >
                  选择路径
                </Button>
              </div>
            </Form.Item>
          </div>
        </div>
        <div className="config-center-item">
          <div className="config-center-item-title">保存session到本地</div>
          <div>
            <Typography.Title level={5}>当前文件路径:</Typography.Title>
            <Form.Item label="保存路径" name="sessionFilePath">
              <div className="config-center-item-input">
                <div style={{ width: "300px", marginRight: 20 }}>
                  <Input
                    placeholder="请输入文件路径"
                    defaultValue={sessionFilePath}
                    value={sessionFilePath}
                    onChange={(e) => setSessionFilePath(e.target.value)}
                  />
                </div>

                <Button
                  type="primary"
                  onClick={handleFileSelect3(setSessionFilePath)}
                >
                  选择路径
                </Button>
              </div>
            </Form.Item>
          </div>
        </div>
        <div className="config-center-item">
          <div className="config-center-item-title">保存采集到的好友到本地</div>
          <div>
            <Typography.Title level={5}>当前文件路径:</Typography.Title>
            <Form.Item label="保存路径" name="friendsFilePath">
              <div className="config-center-item-input">
                <div style={{ width: "300px", marginRight: 20 }}>
                  <Input
                    placeholder="请输入文件路径"
                    defaultValue={friendsFilePath}
                    value={friendsFilePath}
                    onChange={(e) => setFriendsFilePath(e.target.value)}
                  />
                </div>

                <Button
                  type="primary"
                  onClick={handleFileSelect4(setFriendsFilePath)}
                >
                  选择路径
                </Button>
              </div>
            </Form.Item>
          </div>
        </div>
      </Form>
      <Button type="primary" onClick={saveConfigData}>
        保存配置
      </Button>
      {/* <div className="config-center-item">
        <div className="config-center-item-title">获取通讯录</div>
        <div>
          <Typography.Title level={5}>当前文件路径:</Typography.Title>
          <div className="config-center-item-input">
            <div style={{ width: "300px", marginRight: 20 }}>
              <Input
                placeholder="请输入文件路径"
                defaultValue={contactsFilePath}
                value={contactsFilePath}
                onChange={(e) => setContactsFilePath(e.target.value)}
              />
            </div>

            <Button
              type="primary"
              onClick={handleFileSelect(setContactsFilePath)}
            >
              选择文件
            </Button>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default ConfigCenter;
