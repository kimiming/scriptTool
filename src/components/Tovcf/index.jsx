import React, { useState } from "react";
import { Button, Input, Typography } from "antd";
import "./index.css";

function Tovcf() {
  const [txtPath, setTxtPath] = useState("");
  const [vcfPath, setVcfPath] = useState("");

  const handleSelectTxtFile = async () => {
    const filePath = await window.selectFile();
    setTxtPath(filePath);
  };

  const handleSelectSavePath = async () => {
    const filePath = await window.selectSavePath();
    setVcfPath(filePath);
  };

  const handleConvert = async () => {
    const result = await window.convertTxtToVcf(txtPath, vcfPath);
    if (result.success) {
      alert("转换成功！");
    } else {
      alert("转换失败！");
    }
  };

  return (
    <div className="tovcf-center">
      <div className="config-center-item">
        <div className="config-center-item-title">vcf转化器</div>
        <div className="config-center-item-content">
          <Typography.Title level={5}>
            转化 TXT 文件为 VCF 文件
          </Typography.Title>
          <div className="config-center-item-input">
            <div className="config-center-item-input-btn">
              <Button onClick={handleSelectTxtFile}>选择 TXT 文件</Button>
            </div>

            <Input
              value={txtPath}
              onChange={(e) => setTxtPath(e.target.value)}
            />
          </div>
          <div className="config-center-item-input">
            <div className="config-center-item-input-btn">
              <Button onClick={handleSelectSavePath}>选择 VCF 保存路径</Button>
            </div>
            <Input
              value={vcfPath}
              onChange={(e) => setVcfPath(e.target.value)}
            />
          </div>
          <div>
            <Button
              type="primary"
              onClick={handleConvert}
              disabled={!txtPath || !vcfPath}
            >
              生成 VCF 文件
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tovcf;
