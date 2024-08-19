import React from "react";

import { Table, Tag } from "antd";
// const columns = [
//   {
//     title: "手机号码",
//     dataIndex: "name",
//     key: "name",
//     render: (text) => <a>{text}</a>,
//   },
//   {
//     title: "回调链接",
//     dataIndex: "age",
//     key: "age",
//   },
//   {
//     title: "状态",
//     dataIndex: "address",
//     key: "address",
//   },
//   {
//     title: "验证码",
//     key: "tags",
//     dataIndex: "tags",
//     render: (_, { tags }) => (
//       <>
//         {tags.map((tag) => {
//           let color = tag.length > 5 ? "geekblue" : "green";
//           if (tag === "loser") {
//             color = "volcano";
//           }
//           return (
//             <Tag color={color} key={tag}>
//               {tag.toUpperCase()}
//             </Tag>
//           );
//         })}
//       </>
//     ),
//   },
//   {
//     title: "发送次数",
//     key: "tags",
//     dataIndex: "tags",
//     render: (_, { tags }) => (
//       <>
//         {tags.map((tag) => {
//           let color = tag.length > 5 ? "geekblue" : "green";
//           if (tag === "loser") {
//             color = "volcano";
//           }
//           return (
//             <Tag color={color} key={tag}>
//               {tag.toUpperCase()}
//             </Tag>
//           );
//         })}
//       </>
//     ),
//   },
//   {
//     title: "描述",
//     key: "action",
//     render: (_, record) => {
//       let color = record.status === "success" ? "green" : "volcano";
//       return <Tag color={color}>{record.name}</Tag>;
//     },
//   },
// ];
const columns2 = [
  { title: "手机号码", dataIndex: "phone", key: "id", width: 150 },
  {
    title: "回调链接",
    dataIndex: "callback_url",
    key: "id",
    width: 500,
    ellipsis: true,
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "id",
    width: 100,
    align: "center",
    render: (_, record) => {
      let color = record.status === "success" ? "green" : "geekblue";
      let text = record.status === "success" ? "成功" : "未用";
      return (
        <Tag color={color} style={{ textAlign: "center", lineHeight: "24px" }}>
          {text}
        </Tag>
      );
    },
  },
  {
    title: "回码",
    dataIndex: "verification_code",
    key: "id",
    width: 100,
    align: "center",
  },
  { title: "描述", dataIndex: "description", key: "id" },
];

const TableData = (props) => {
  const contacts = props?.contacts ? props.contacts : [];
  // console.log("contacts", contacts);
  return (
    <div>
      <Table columns={columns2} dataSource={contacts} bordered />
    </div>
  );
};
export default TableData;
