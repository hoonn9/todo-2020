import React from "react";
import { HashRouter, Route } from "react-router-dom";
import "./App.css";
import Home from "./routes/Home";
import Join from "./routes/Join";

const App = () => {
  return (
    <HashRouter>
      <Route path="/" exact={true} component={Home} />
      <Route path="/join" component={Join} />
    </HashRouter>
  );
};

export default App;
