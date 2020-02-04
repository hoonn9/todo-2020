import React, { useState, useRef, createRef } from "react";
import "./Join.css";

const useInput = (initialValue, vaildator, isPw = false) => {
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
    if (isPw) {
      pwCompare();
    }
  };
  return { value, onChange };
};

const pwCompare = () => {
  const pw1 = document.getElementById("pw1");
  const pw2 = document.getElementById("pw2");
  if (pw1.value && pw2.value) {
    if (pw1.value === pw2.value) {
      pw1.parentElement.style.border = "solid 1px #33FF31";
      pw2.parentElement.style.border = "solid 1px #33FF31";
      //pw1.parentElement.classList += "pw_confirm";
    } else {
      pw1.parentElement.style.border = "solid 1px #E36209";
      pw2.parentElement.style.border = "solid 1px #E36209";
    }
  } else {
    pw1.parentElement.style.border = "solid 1px #dadada";
    pw2.parentElement.style.border = "solid 1px #dadada";
  }
};

const maxLen = len => {
  return value => value.length < len;
};

const Join = () => {
  const userId = useInput("", maxLen(20));
  const userPw = useInput("", maxLen(24), true);
  const userPw2 = useInput("", maxLen(24), true);
  const userName = useInput("", maxLen(16));

  return (
    <div className="Join">
      <div id="container">
        <div className="join_div">
          <div className="join_row">
            <h3>아이디</h3>
            <span className="join_box_id">
              <input className="user_input" {...userId}></input>
            </span>
          </div>
          <div className="join_row">
            <h3>비밀번호</h3>
            <span className="join_box_id">
              <input
                type="password"
                className="user_input"
                id="pw1"
                {...userPw}
              ></input>
            </span>
          </div>
          <div className="join_row">
            <h3>비밀번호 재확인</h3>
            <span className="join_box_id">
              <input
                type="password"
                className="user_input"
                id="pw2"
                {...userPw2}
              ></input>
            </span>
          </div>
          <div className="join_row">
            <h3>성명</h3>
            <span className="join_box_id">
              <input className="user_input" {...userName}></input>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Join;
