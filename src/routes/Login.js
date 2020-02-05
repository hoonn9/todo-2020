import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { loginRequest } from "../components/Authentication";
import "./Login.css";

const useInput = (initialValue, vaildator) => {
  const [value, setValue] = useState(initialValue);
  const onChange = event => {
    const {
      target: { value }
    } = event;
    let willUpdate = true;
    if (typeof vaildator === "function") {
      willUpdate = vaildator(value);
    }
    if (willUpdate) {
      setValue(value);
    }
  };
  return { value, onChange };
};

const handleLogin = (id, pw, setLoginNotify, setLoginHandle) => {
  const onClick = () => {
    if (loginRequest(id, pw)) {
      let loginData = {
        isLoggedIn: true,
        username: id
      };

      setLoginHandle(true);
      document.cookie = "key=" + btoa(JSON.stringify(loginData));
    } else {
      setLoginHandle(false);
      setLoginNotify("가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.");
    }
  };

  return { onClick };
};

const Login = () => {
  const userId = useInput("");
  const userPw = useInput("");
  const [loginNotify, setLoginNotify] = useState("");
  const [loginHandle, setLoginHandle] = useState(false);
  const loginClicked = handleLogin(
    userId.value,
    userPw.value,
    setLoginNotify,
    setLoginHandle
  );

  const onloginPress = event => {
    if (event.charCode === 13) {
      loginClicked.onClick();
    }
  };

  return (
    <>
      {loginHandle ? <Redirect to="/" /> : null}
      <div className="Login">
        <div id="container">
          <h1>LOGIN</h1>
          <div className="login_div">
            <div className="login_row">
              <div className="login_id">
                <span className="ps_box">
                  <input
                    type="text"
                    className="user_input"
                    placeholder="아이디"
                    {...userId}
                    onKeyPress={onloginPress}
                  />
                </span>
              </div>
            </div>
            <div className="login_row">
              <div className="login_wrap">
                <div className="login_id">
                  <span className="ps_box">
                    <input
                      type="password"
                      className="user_input"
                      placeholder="비밀번호"
                      {...userPw}
                      onKeyPress={onloginPress}
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="login_notify">
              <span>{loginNotify}</span>
            </div>
          </div>
          <div>
            <div className="login_row">
              <span className="btn_box">
                <button id="login_btn" onClick={loginClicked.onClick}>
                  로그인
                </button>
              </span>
            </div>
          </div>
          <div className="login_bottom">
            <span>
              <Link to="/join">회원가입</Link>
            </span>
            <span>
              <Link to="/">비밀번호 찾기</Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
