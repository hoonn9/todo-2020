import React from "react";
import { HashRouter, Route } from "react-router-dom";
import "./App.css";
import Home from "./routes/Home";
import Join from "./routes/Join";
import Login from "./routes/Login";
import Navigation from "./components/Navigation";

const App = () => {
  return (
    <HashRouter>
      <Navigation />
      <Route path="/" exact={true} component={Home} />
      <Route path="/join" component={Join} />
      <Route path="/login" component={Login} />
    </HashRouter>
  );
};

export default App;
