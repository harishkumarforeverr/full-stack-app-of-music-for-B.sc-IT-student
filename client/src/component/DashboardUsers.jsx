import React, { useEffect, useState } from "react";
import moment from "moment";
import "./DashboardUsers.scss";
import { Table } from "antd";
import axios from "axios";

function DashboardUsers() {
  const [data, setData] = useState([]);
  const getUsers = async () => {
    const res = await axios.get("http://localhost:4000/api/auth/");
    console.log("djsdbhdvasjdvjgas", res);
    setData(res.data.data);
  };
  useEffect(() => {
    getUsers();
  }, []);
  const column = [
    {
      title: "id",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "createdAt",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value) => moment(value).format("DD-MM-YYYY"),
    },
    {
      title: "updatedAt",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (value) => moment(value).format("DD-MM-YYYY"),
    },
  ];
  return (
    <div className="orders-wrapper">
      <Table
        dataSource={data}
        columns={column}
        pagination={{ pageSize: 5, position: ["bottomCenter"] }}
        scroll={{ y: 200 }}
      />
    </div>
  );
}

export default DashboardUsers;
