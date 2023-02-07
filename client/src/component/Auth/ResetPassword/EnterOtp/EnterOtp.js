import React from "react";
import { Form, Row, Col, Divider, message } from "antd";
import Header from "../../../Header/Header";
import "./EnterOtp.scss";
import { CustomImage, CustomButton, CustomInput } from "../../../../components";
import { AssetsImage } from "../../../../constants/AssetsConstant";
import { useNavigate, useLocation } from "react-router-dom";
import { common } from "../../../../services/Common";
import { useSelector } from "react-redux";

const EnterOtp = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { email } = useLocation().state;
  const Rules = {
    Otp: [
      {
        required: true,
        message: "Otp  can't be blank",
      },
      { whitespace: true, message: "Remember to fill in the title" },
    ],
  };const { tenantId } = useSelector((state) => state.auth.profileinfo);
  const handleOnFinish = async (values) => {
    const data = {
      email,
      OTP: values.Otp,
      tenantId ,
    };
    const res = await common.otpValidation(data);
    console.log("res", res);
    if (res.status === 200) {
      message.success("login sucesss");
      navigate("/updatepassword", { state: data });
    } else {
      message.error("enter valid otp");
    }
  };
  return (
    <>
      <div className="EnterOtp-container">
        <Header />
        <div className="EnterOtp_content">
          <Row>
            <Col span={12}>
              <CustomImage
                src={AssetsImage.ResetPasswordImage}
                alt="Reset Password"
                preview={false}
              />
            </Col>
            <Col span={12}>
              <div className="EnterOtp_inputFields">
                <h1>Recover Password</h1>
                <Divider />
                <Form
                  form={form}
                  onFinish={handleOnFinish}
                  initialValues={{
                    Otp: "",
                  }}
                >
                  <Form.Item rules={Rules.Otp} name="Otp">
                    <CustomInput placeholder="Enter OTP" />
                  </Form.Item>
                  <div className="EnterOtp_buttons">
                    <Form.Item>
                      <CustomButton
                        onClick={() => navigate("/resetpassword")}
                        className="back_button"
                        // htmlType="submit"
                        type="primary"
                      >
                        Back
                      </CustomButton>
                      <CustomButton htmlType="submit" type="primary">
                        Next
                      </CustomButton>
                    </Form.Item>
                  </div>
                </Form>
              </div>
              {/* <div className="EnterOtp_Signup_tag">
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

export default EnterOtp;
