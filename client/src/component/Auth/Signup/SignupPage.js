import React, { useState } from "react";
import { AssetsImage } from "../../../constants/AssetsConstant";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Row,
  Col,
  Divider,
  Select,
  message,
} from "antd";
import "./SignupPage.scss";
import { CustomImage, CustomInput } from "../../../components";
import HeaderPage from "../../../Header/Header";
import axios from "axios";

const { Password } = Input;

const SignupPage = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const [form] = Form.useForm();
  const { Option } = Select;
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select defaultValue={+91}>
        <Option value="+91">+91</Option>
        <Option value="+1">+1</Option>
      </Select>
    </Form.Item>
  );
  const handleOnFinish = async (values) => {
    console.log(values);
    const { email, password, username, phone } = values;
    const data = {
      email,
      password,
      username,
      phone,
    };

    try {
      const res = await axios.post(
        "http://localhost:4000/api/auth/sigin",
        data
      );
      if (res.status === 200) {
        messageApi.open({
          type: "success",
          content: "Sigup sucessfully completed, please login",
        });
        form.resetFields()
      }
    } catch (e) {
      messageApi.open({
        type: "error",
        content: "something went wrong try again, with new email",
      });
    }
  };

  return (
    <>
      <div className="signup-container">
        {contextHolder} <HeaderPage />
        <div className="signup_content">
          <Row>
            <Col span={12}>
              <CustomImage
                src={AssetsImage.SignupImage}
                alt="product"
                preview={false}
              />
            </Col>
            <Col span={12}>
              <div className="signup_inputFields">
                <h1>
                  Sign <span>up</span>
                </h1>
                <Divider />
                <Form form={form} onFinish={handleOnFinish}>
                  <Form.Item
                    name="username"
                    rules={[
                      {
                        required: true, 
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <CustomInput placeholder="username" />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        type: "email",
                        message: "The input is not valid E-mail!",
                      },
                    ]}
                  >
                    <CustomInput placeholder="email ID" />
                  </Form.Item>
                  <Form.Item
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: "Please input your phone number!",
                      },
                    ]}
                  >
                    <CustomInput
                      placeholder="Phone Number"
                      addonBefore={prefixSelector}
                      style={{
                        width: "100%",
                      }}
                    />
                  </Form.Item>
                  <div className="password_field">
                    <Form.Item
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                    >
                      <Password placeholder="Password" />
                    </Form.Item>
                  </div>
                  <div className="checkbox_content">
                    <div className="check_me">
                      <Form.Item name="remember" valuePropName="checked">
                        <Checkbox>
                          I agree to the Terms and conditions of Orbit Capital
                          Services.
                        </Checkbox>
                      </Form.Item>
                    </div>
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Sign<span>up</span>
                      </Button>
                    </Form.Item>
                  </div>
                </Form>
              </div>
              <div className="signup_Signup_tag">
                <h4>
                  Already have an acoount ?
                  <span onClick={() => navigate("/login")}> Login</span>
                </h4>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
