import React, { useState, useRef } from "react";
import PropTypes, { array } from "prop-types";
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
      pw1.parentElement.classList = "ps_box";
      pw2.parentElement.classList = "ps_box";
    } else {
      pw1.parentElement.classList = "ps_box_invalid";
      pw2.parentElement.classList = "ps_box_invalid";
    }
  } else {
    pw1.parentElement.classList = "ps_box";
    pw2.parentElement.classList = "ps_box";
  }
};

const maxLen = len => {
  return value => value.length < len;
};

const getMonthArray = () => {
  const temp = [];
  for (let i = 1; i < 13; i++) {
    temp[i] = i;
  }
  return temp;
};

const createJoinRow = (state, title, type = null, id = null) => {
  return (
    <div className="join_row">
      <h3>{title}</h3>
      <span className="ps_box">
        <input type={type} className="user_input" id={id} {...state} />
      </span>
    </div>
  );
};

createJoinRow.propTypes = {
  state: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string,
  id: PropTypes.string
};

const Join = () => {
  const userId = useInput("", maxLen(20));
  const userPw = useInput("", maxLen(24), true);
  const userPw2 = useInput("", maxLen(24), true);
  const userName = useInput("", maxLen(16));
  const userYearOfBirth = useInput("", maxLen(5));
  const [userMonthOfBirth, setUserMonthOfBirth] = useState(1);
  const userDayOfBirth = useInput("", maxLen(3));
  const monthArray = getMonthArray();
  return (
    <div className="Join">
      <div id="container">
        <div className="join_div">
          {createJoinRow(userId, "아이디")}
          {createJoinRow(userPw, "비밀번호", "password", "pw1")}
          {createJoinRow(userPw2, "비밀번호 재확인", "password", "pw2")}
          {createJoinRow(userName, "성명")}
          <div className="join_row">
            <h3>생년월일</h3>
            <div className="birth_wrap">
              <div className="birth_yy">
                <span className="ps_box">
                  <input
                    type="number"
                    className="user_input"
                    placeholder="년"
                    {...userYearOfBirth}
                  />
                </span>
              </div>
              <div className="birth_mm">
                <span className="ps_box">
                  <select
                    className="sel"
                    onChange={event => {
                      setUserMonthOfBirth(event.target.value);
                    }}
                  >
                    {monthArray.map(month => (
                      <option key={month} value={month}>
                        {`${month}월`}
                      </option>
                    ))}
                  </select>
                </span>
              </div>
              <div className="birth_dd">
                <span className="ps_box">
                  <input
                    type="number"
                    className="user_input"
                    placeholder="일"
                    {...userDayOfBirth}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Join;
