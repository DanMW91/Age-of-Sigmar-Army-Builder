import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./store/auth-context";
import { NotificationsContextProvider } from "./store/notifications-context";
import { GroupsContextProvider } from "./store/groups-context";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <GroupsContextProvider>
        <NotificationsContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </NotificationsContextProvider>
      </GroupsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
