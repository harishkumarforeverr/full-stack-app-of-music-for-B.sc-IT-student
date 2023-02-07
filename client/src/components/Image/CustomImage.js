import React from "react";
import { Image } from "antd";

const CustomImage = (props) => {
  // console.log("subhash", props);
  return (
    <>
      <Image
        // width={200}
        // src={props.src}
        // preview={false}
        {...props}
      />
    </>
  );
};

export default CustomImage;
