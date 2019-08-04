// let's go!
import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import StorePicker from "./components/storePicker";
import NotFound from "./components/notFound";
import App from "./components/App";
import "./css/style.css";
const repo = `/${window.location.pathname.split("/"[1])}`;
const Root = () => {
  return (
    // basename={repo}
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={StorePicker} />
        <Route exact path="/store/:storeId" component={App} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};
render(<Root />, document.querySelector("#main"));
