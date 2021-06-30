// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { createGlobalStyle, ThemeProvider } from "styled-components";
// import { Route, Switch } from "react-router-dom";
// import "../scss/main.scss";
import HeroView from "./Views/HeroView/HeroView";
// import { createBrowserHistory } from "history";
// import { Router, Route, Switch, Redirect } from "react-router-dom";
import Home from "./Views/Home/Home";
import NotFound from "./Views/NotFound/NotFound";

const GlobalStyle = createGlobalStyle`
  body {
    background: #F5F6FB;
    box-sizing: border-box;
   }
`;

const App = () => {
  return (
    <div className="body-wrapper">
      <ThemeProvider theme={{ fontFamily: "sans-serif" }}>
        <GlobalStyle />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/:id" component={HeroView} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
