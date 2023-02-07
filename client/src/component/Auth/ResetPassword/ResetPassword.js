import { Col, Divider, Form, message, Row } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CustomButton, CustomImage, CustomInput } from "../../../components";
import { AssetsImage } from "../../../constants/AssetsConstant";
import { common } from "../../../services/Common";
import Header from "../../Header/Header";
import "./ResetPassword.scss";

const ResetPassword = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
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
  };
  const { tenantId } = useSelector((state) => state.auth.profileinfo);
  const handleOnFinish = async (value) => {
    const data = {
      email: value.email,
      tenantId,
    };
    const response = await common.forgetPassword(data);
    if (response.status === 200) {
      navigate("/enterotp", { state: data });
    } else {
      message.error("something went wrong, please try again");
    }
  };
  return (
    <>
      <div className="ResetPassword-container">
        <Header />
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
                        // onClick={() => navigate("/enterotp")}
                        htmlType="submit"
                        type="primary"
                      >
                        Submit
                      </CustomButton>
                    </Form.Item>
                  </div>
                </Form>
              </div>
              {/* <div className="ResetPassword_Signup_tag">
                <h4>
                  Don’t have an acoount ?<span onClick={() => navigate("/signup")}> Sign Up</span>
                </h4>
              </div> */}
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
