import React, { useState } from "react";
import { Button, Typography, Input } from "antd";
import "./index.css";

function ConfigCenter() {
  const [contactsFilePath, setContactsFilePath] = useState("");
  const [avatarFilePath, setAvatarFilePath] = useState("");
  const [sessionFilePath, setSessionFilePath] = useState("");
  const [friendsFilePath, setFriendsFilePath] = useState("");

  const handleFileSelect = (setter) => async () => {
    const { filePaths } = await window.electron.dialog.showOpenDialog({
      properties: ["openFile"],
    });
    if (filePaths.length > 0) {
      setter(filePaths[0]);
    }
  };

  return (
    <div className="config-center">
      <div className="config-center-item">
        <div className="config-center-item-title">获取通讯录</div>
        <div>
          <Typography.Title level={5}>当前文件路径:</Typography.Title>
          <div className="config-center-item-input">
            <div style={{ width: "300px", marginRight: 20 }}>
              <Input
                placeholder="请输入文件路径"
                defaultValue={contactsFilePath}
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
        {/* <Button onClick={handleFileSelect(setContactsFilePath)}>
          选择文件
        </Button>
        <div>
          <span>当前文件路径:</span>
          <span>{contactsFilePath}</span>
        </div> */}
      </div>
      <div className="config-center-item">
        <div className="config-center-item-title">获取头像</div>
        <Button onClick={handleFileSelect(setAvatarFilePath)}>选择文件</Button>
        <span>{avatarFilePath}</span>
      </div>
      <div className="config-center-item">
        <div className="config-center-item-title">保存session到本地</div>
        <Button onClick={handleFileSelect(setSessionFilePath)}>选择文件</Button>
        <span>{sessionFilePath}</span>
      </div>
      <div className="config-center-item">
        <div className="config-center-item-title">保存采集到的好友到本地</div>
        <Button onClick={handleFileSelect(setFriendsFilePath)}>选择文件</Button>
        <span>{friendsFilePath}</span>
      </div>
    </div>
  );
}

export default ConfigCenter;
