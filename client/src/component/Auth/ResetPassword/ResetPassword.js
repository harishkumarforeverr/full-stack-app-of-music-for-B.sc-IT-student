import { Col, Divider, Form, Input, Row,message } from "antd";
import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CustomButton, CustomImage, CustomInput } from "../../../components";
import { AssetsImage } from "../../../constants/AssetsConstant";
// import { common } from "../../../services/Common";

import HeaderPage from "../../../Header/Header";
import "./ResetPassword.scss";

const { Password } = Input;
const ResetPassword = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };
  const Rules = {
    email: [
      {
        required: true,
        message: "email Address can't be blank",
      },
      { whitespace: true, message: "Remember to fill in the title" },
      {
        pattern: new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
        message: "plese enter valid email",
      },
    ],
    password: [
      {
        required: true,
        message: "Please input your password!",
      },
      { whitespace: true, message: "Remember to fill in the title" },
      {
        pattern: new RegExp(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15})/),
        message:
          "Password should be 6 to 15 characters long with at least one uppercase letter, one lowercase letter and one digit",
      },
    ],
    confirmPassword: [
      {
        required: true,
        message: "Please confirm your password!",
      },
      {
        validator: compareToFirstPassword,
      },
    ],
  };
  const [messageApi, contextHolder] = message.useMessage();

  const handleOnFinish = async (value) => {
    console.log("valuevalue", value);
    const { email ,password} = value;
    if (email&&password) {
      try {
        const res = await axios.post(
          "http://localhost:4000/api/auth/reset",
          { email ,password}
        );
        if (res.status === 200) {
          messageApi.open({
            type: "success",
            content: "Login successfully done",
          });
          form.resetFields(); 
          navigate("/login");
        }
      } catch (e) {
        messageApi.open({
          type: "error",
          content: "something went wrong try again, Invalid cerdentials",
        });
      }
    }
  };
  return (
    <>   {contextHolder}
      <div className="ResetPassword-container">
        <HeaderPage />
        <div className="ResetPassword_content">
          <Row>
            <Col span={12}>
              <CustomImage
                src={AssetsImage.ResetPasswordImage}
                alt="Reset Password"
                preview={false}
              />
            </Col>
            <Col span={12}>
              <div className="ResetPassword_inputFields">
                <h1>Recover Password</h1>
                <Divider />
                <Form
                  form={form}
                  onFinish={handleOnFinish}
                  initialValues={{
                    email: "",
                  }}
                >
                  <Form.Item name="email" rules={Rules.email}>
                    <CustomInput placeholder="Registered Email ID" />
                  </Form.Item>
                  <Form.Item name="password" rules={Rules.password}>
                    <Password placeholder="New Password" />
                  </Form.Item>
                  <Form.Item
                    name="confirmPassword"
                    rules={Rules.confirmPassword}
                  >
                    <Password placeholder="Confirm Password" />
                  </Form.Item>
                  <div className="ResetPassword_buttons">
                    <Form.Item>
                      <CustomButton
                        onClick={() => navigate("/login")}
                        className="back_button"
                        htmlType="submit"
                        type="primary"
                      >
                        Back
                      </CustomButton>
                      <CustomButton
                        className="back_button"
                        htmlType="submit"
                        type="primary"
                      >
                        Submit
                      </CustomButton>
                    </Form.Item>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
