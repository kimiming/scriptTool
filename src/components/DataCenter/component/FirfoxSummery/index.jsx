import React, { useState } from "react";
import { Button, message } from "antd";
import "./index.css";

function DataSummery() {
  return (
    <div className="data-summery-container">
      <div className="data-summery-title">火狐狸</div>
      <div className="data-summery">
        <div className="data-summery-item">
          <span>数据名称:</span>
          <span>10000</span>
        </div>
        <div className="data-summery-item">
          <span>数据类型:</span>
          <span>json</span>
        </div>
        <div className="data-summery-item">
          <span>数据大小:</span>
          <span>100KB</span>
        </div>
        <div className="data-summery-item">
          <span>数据创建时间:</span>
          <span>2021-01-01 12:00:00</span>
        </div>
      </div>
      <div className="data-summery-btn">
        <div className="data-summery-btn-left">
          <Button type="primary" onClick={() => message.success("上传成功")}>
            上传
          </Button>
        </div>
        <div>
          <Button type="primary" onClick={() => message.success("下载成功")}>
            导出
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DataSummery;
