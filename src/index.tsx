// import reportWebVitals from './reportWebVitals';
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { ReduxProvider } from "./redux";
import Home from "./Views/Home/Home";
import NotFound from "./Views/NotFound/NotFound";
import UserView from "./Views/UserView/UserView";

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
          <ReduxProvider>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/:login" component={UserView} />
              <Route component={NotFound} />
            </Switch>
          </ReduxProvider>
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
