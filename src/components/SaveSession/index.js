import React, { useState } from "react";
import { Button, Typography, Input, message } from "antd";
import "./index.css";
const { TextArea } = Input;

function SaveSession() {
  const [isReturnCode, setIsReturnCode] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [sessionValue, setSessionValue] = useState("开始会话...");

  const handLogin = () => {
    if (!phoneNumber) {
      message.error("请输入手机号码");
      return;
    }
    setIsReturnCode(true);
    setSessionValue(`${sessionValue}\n${phoneNumber}请求验证码`);
  };
  const handSave = () => {
    setIsReturnCode(false);
    setSessionValue(`${sessionValue}\n${phoneNumber}保存session成功`);
  };
  const onChange = (e) => {
    console.log(e.target.value);
  };
  return (
    <div className="config-center">
      <div className="config-center-item">
        <div className="config-center-item-title">Session</div>
        <div className="config-center-item-content">
          <Typography.Title level={5}>手动保存session</Typography.Title>
          {isReturnCode ? (
            <div className="config-center-item-input">
              <span>验证密码:</span>
              <div style={{ width: "300px", marginRight: 20, marginLeft: 20 }}>
                <Input
                  placeholder="请输入验证码"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <Button type="primary" onClick={handSave}>
                保存session
              </Button>
            </div>
          ) : (
            <div className="config-center-item-input">
              <span>手机号码:</span>
              <div style={{ width: "300px", marginRight: 20, marginLeft: 20 }}>
                <Input
                  placeholder="请输入手机号码"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <Button type="primary" onClick={handLogin}>
                发送验证码
              </Button>
            </div>
          )}
        </div>
        <TextArea
          disabled
          onChange={onChange}
          value={sessionValue}
          placeholder="disable resize"
          style={{
            height: 120,
            resize: "none",
          }}
        />
      </div>
    </div>
  );
}

export default SaveSession;
