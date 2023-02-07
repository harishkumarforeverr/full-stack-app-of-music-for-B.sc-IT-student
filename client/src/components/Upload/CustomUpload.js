import { Upload } from "antd";
import React, { useState } from "react";
import S3 from "react-aws-s3";
 

const CustomUpload = (props) => {
  const [filedata, setfiledata] = useState();
  const {
    spin,
    setUploadstate,
    Productlist,
    UploadKey,
    className,
    setform,
    Productphotos,
    accept,
    rolemanagement,
    lead,inventory
  } = props ?? {};
  /** Mandate feilds
   * filePath = path of the uploded file
   * UploadType = its a key to segrigate the type of upload (if let say if user upload image in Lisiting then mention 'Listing')
   * fileData = data of the user selected file
   * UserId = to which we need to add this image to
   */

  const handleupload = (info, key) => {
    console.log("inside the handle upload",spin);
     spin?.(true);
    if (filedata && filedata.size <= 5000000) {
      const newFileName = filedata?.name.replace(/\..+$/, "");
      const config = {
        bucketName: "ub-dev-image-uploader",
        // dirName: hostid || email /* optional */,
        region: "ap-south-1",
        accessKeyId: "AKIAUCJ3HQRT2EX5ETET",
        secretAccessKey: "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",
      };
      console.log("config", config);
      const mediaFileName = "uploadfrom";
      const ReactS3Client = new S3(config);
      ReactS3Client.uploadFile(filedata, newFileName, mediaFileName).then((data) => {
        console.log("data", data.location.substring(data.location.lastIndexOf("/") + 1));
        
        if (data.status === 204) {
            spin?.(false);
          if (rolemanagement) {
            // spin?.(false);
            setUploadstate({
              [UploadKey]: data.location,
            });
            setform((prevState) => ({
              ...prevState,
              [UploadKey]: data.location,
            }));
          }
          if (inventory) {
            setUploadstate({
              [UploadKey]: data.location,
            });
            setform((prevState) => ({
              ...prevState,
              [UploadKey]: data.location,
            }));
          }
          if (lead) {
            console.log("UploadKey", UploadKey);
            setUploadstate({
              [UploadKey]: data.location,
            });
            if (setform) {
              setform((prevState) => ({
                ...prevState,
                [UploadKey]: data.location,
              }));
            }
          }
          if (Productlist) {
            setUploadstate((prevState) => ({
              ...prevState,
              [UploadKey]: [...prevState[UploadKey], data.location],
            }));
            
          }
          if (Productphotos) {
            setUploadstate((prevState) => [...prevState, data.location]);
          }
          return "";
        }
      });
    } else {
      // return message.error(`${filedata.name} is too large Maximum file size is 5MB`);
    }
  };
  const fileUploadRequest = ({ file }) => {
    setfiledata(file);
  };

  return (
    <Upload
      customRequest={fileUploadRequest}
      accept={accept}
      name="avatar"
      // listType={listType}
      // className={className}
      // accept={accept}
      beforeUpload={(e) => setfiledata(e)}
      onChange={handleupload}
      className={className}
    >
      {props.children}
    </Upload>
  );
};

export default CustomUpload;
