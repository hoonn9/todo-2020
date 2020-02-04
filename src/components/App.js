import React, { useState } from "react";

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

const App = () => {
  const maxLen = value => value.length < 10;
  const userId = useInput(0, maxLen);
  return (
    <div className="App">
      <h1>{userId.value}</h1>
      <input placeholder="ID" {...userId}></input>
    </div>
  );
};

export default App;
