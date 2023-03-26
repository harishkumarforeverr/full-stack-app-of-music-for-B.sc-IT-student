import React from "react";
import { Form, Input, Row, Col, Divider, message } from "antd"; 
import "./UpdatePassword.scss";
import { AssetsImage } from "../../../../constants/AssetsConstant";
import { useNavigate, useLocation } from "react-router-dom";
import { CustomImage, CustomButton } from "../../../../components"; 
import { useSelector } from "react-redux";
import HeaderPage from "../../../../Header/Header";

const { Password } = Input;

const UpdatePassword = () => {
  const [form] = Form.useForm();
  const { tenantId } = useSelector((state) => state.auth.profileinfo);
  const navigate = useNavigate();
  const { email, OTP } = useLocation()?.state ?? {};
  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };
  const Rules = {
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

  const handleOnFinish = async (value) => {
   
  };
  return (
    <>
      <div className="UpdatePassword-container">
      <HeaderPage />
        <div className="UpdatePassword_content">
          <Row>
            <Col span={12}>
              <CustomImage
                src={AssetsImage.ResetPasswordImage}
                alt="Reset Password"
                preview={false}
              />
            </Col>
            <Col span={12}>
              <div className="UpdatePassword_inputFields">
                <h1>Update Password</h1>
                <Divider />
                <Form
                  form={form}
                  onFinish={handleOnFinish}
                  initialValues={{
                    password: "",
                    confirmPassword: "",
                  }}
                >
                  <Form.Item name="password" rules={Rules.password}>
                    <Password placeholder="New Password" />
                  </Form.Item>
                  <Form.Item name="confirmPassword" rules={Rules.confirmPassword}>
                    <Password placeholder="Confirm Password" />
                  </Form.Item>
                  <div className="UpdatePassword_buttons">
                    <Form.Item>
                      <CustomButton
                        onClick={() => navigate("/enterotp")}
                        className="back_button"
                        // htmlType="submit"
                        type="primary"
                      >
                        Back
                      </CustomButton>
                      <CustomButton htmlType="submit" type="primary">
                        Update
                      </CustomButton>
                    </Form.Item>
                  </div>
                </Form>
              </div>
              {/* <div className="UpdatePassword_Signup_tag">
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

export default UpdatePassword;
