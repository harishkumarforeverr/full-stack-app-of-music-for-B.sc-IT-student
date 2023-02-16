import React from "react";
import { Form, Input, Checkbox, Row, Col, Divider, message } from "antd";
import "./LoginPage.scss";
import { useNavigate } from "react-router-dom";
import { CustomImage, CustomButton, CustomInput } from "../../../components";
// import { useDispatch, useSelector } from "react-redux";
import { AssetsImage } from "../../../constants/AssetsConstant";
import HeaderPage from "../../../Header/Header";
import axios from "axios";
import { isLogin, login } from "../../../utils";

const { Password } = Input;

const LoginPage = () => {
  // const dispatch = useDispatch();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  // const userinfo = useSelector((state) => state.auth);
  // console.log(userinfo);
  // const { loading } = userinfo;
  const [messageApi, contextHolder] = message.useMessage();

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
  };
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
        "http://localhost:4000/api/auth/login",
        data
      );
      if (res.status === 200) {
        messageApi.open({
          type: "success",
          content: "Login successfully done",
        });
        form.resetFields();
        login();
        console.log("resresresres", res);
        if (res.data.data.type == "new User") {
          localStorage.setItem("userId", res.data.data.userId);
          navigate("/recommendation", { state: { data: res.data.data } });
        } else {
          localStorage.setItem("userId", res.data.data._id);

          navigate("/Dashboard/home");
        }
      }
    } catch (e) {
      messageApi.open({
        type: "error",
        content: "something went wrong try again, Invalid cerdentials",
      });
    }
  };

  return (
    <>
      {/* <Spin spinning={loading ? loading : false} className="login-spin"> */}
      <div className="Login-page-container">
        {contextHolder} <HeaderPage />
        <div className="login_content">
          <Row>
            <Col span={12}>
              <CustomImage
                src={AssetsImage.LoginImage}
                alt="product"
                preview={false}
              />
            </Col>
            <Col span={12}>
              <div className="login_inputFields">
                <h1>Login</h1>
                <Divider />
                <Form
                  form={form}
                  onFinish={handleOnFinish}
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                >
                  <Form.Item name="email" rules={Rules.email}>
                    <CustomInput placeholder="Enter email" />
                  </Form.Item>
                  <div className="password_field">
                    <Form.Item name="password" rules={Rules.password}>
                      <Password placeholder="Password" />
                    </Form.Item>
                  </div>
                  <div className="checkbox_content">
                    <div className="check_me">
                      <Form.Item name="remember" valuePropName="checked">
                        <Checkbox>Remember Me</Checkbox>
                      </Form.Item>
                      <span
                        className="check_forgot"
                        onClick={() => navigate("/signup")}
                      >
                        signup ?
                      </span>
                    </div>
                    <Form.Item>
                      <CustomButton type="primary" htmlType="submit">
                        Login
                      </CustomButton>
                    </Form.Item>
                  </div>
                </Form>
              </div>
              {/* <div className="login_Signup_tag">
                <h4>
                  Don’t have an acoount ?<span onClick={() => navigate("/signup")}> Sign Up</span>
                </h4>
              </div> */}
            </Col>
          </Row>
        </div>
      </div>
      {/* </Spin> */}
    </>
  );
};

export default LoginPage;
