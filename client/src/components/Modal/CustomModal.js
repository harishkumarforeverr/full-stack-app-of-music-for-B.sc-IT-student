import React from "react";
import { Modal } from "antd";

const CustomModal = (props) => {
  return (
    <>
      <Modal {...props}>{props.children}</Modal>
    </>
  );
};

export default CustomModal;
