const test_id = "admin";
const test_pw = "admin";

export const loginRequest = (id, pw) => {
  if (id === test_id && pw === test_pw) {
    return true;
  } else {
    return false;
  }
};
