import React from "react";
import { Button } from "antd";

const CustomButton = (props) => {
  // console.log(props);
  return (
    <>
      <Button 
       {...props}>{props.children}</Button>
    </>
  );
};

export default CustomButton;
