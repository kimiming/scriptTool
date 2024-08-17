import React, { useState } from "react";
import { Button, message, Modal } from "antd";
import axios from "axios";
import "./index.css";

function DataSummery(props) {
  const tableData = props?.contacts ? props.contacts : [];
  const fetchContacts = props?.fetchContacts ? props.fetchContacts : () => {};
  const triggerRefresh = props?.triggerRefresh
    ? props.triggerRefresh
    : () => {};
  const [selectedFile, setSelectedFile] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [confirmLoading2, setConfirmLoading2] = useState(false);

  const showModal = () => {
    setOpen(true);
  };
  const showModal2 = () => {
    setOpen2(true);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    uploadFile();
  };
  const handleOk2 = () => {
    setConfirmLoading2(true);
    // uploadFile();
    clearContacts();
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const handleCancel2 = () => {
    setOpen2(false);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const uploadFile = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      const response = await axios.post(
        "http://localhost:3001/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      let resCode = response.data.code;
      if (resCode === 200) {
        message.success("上传成功");
        setOpen(false);
        setConfirmLoading(false);
        setTimeout(() => {
          fetchContacts();
          triggerRefresh();
        }, 1000);
      } else {
        message.error("上传失败");
        setConfirmLoading(false);
        setOpen(false);
        fetchContacts();
        triggerRefresh();
      }
      // console.log(response.data);
    } else {
      message.error("请选择文件");
    }
  };
  const clearContacts = async () => {
    try {
      await axios.delete("http://localhost:3001/contacts");
      message.success("所有联系人已清除");
      setOpen2(false);
      setConfirmLoading2(false);
      fetchContacts();
    } catch (error) {
      message.error("清除联系人失败");
      setOpen2(false);
      setConfirmLoading2(false);
      fetchContacts();
    }
  };

  return (
    <div className="data-summery-container">
      <div className="data-summery-title">本地api</div>
      <div className="data-summery">
        <div className="data-summery-item">
          <span>总数量:</span>
          <span>{tableData.length}</span>
        </div>
        <div className="data-summery-item">
          <span>接码中:</span>
          <span>100</span>
        </div>
        <div className="data-summery-item">
          <span>接码失败:</span>
          <span>100</span>
        </div>
        <div className="data-summery-item">
          <span>接码成功:</span>
          <span>1000</span>
        </div>
      </div>
      <div className="data-summery-btn">
        <div className="data-summery-btn-left">
          <Button type="primary" onClick={showModal}>
            上传
          </Button>
          <Modal
            title="上传文件"
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
          >
            <input type="file" onChange={handleFileChange} />
          </Modal>
        </div>
        <div className="data-summery-btn-center">
          <Button
            type="primary"
            ghost
            onClick={() => message.success("下载成功")}
          >
            导出
          </Button>
        </div>
        <div>
          <Button type="primary" danger onClick={showModal2}>
            清空本地API数据
          </Button>
          <Modal
            title="清除本地API数据"
            open={open2}
            onOk={handleOk2}
            confirmLoading={confirmLoading2}
            onCancel={handleCancel2}
          >
            确定清除数据
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default DataSummery;
