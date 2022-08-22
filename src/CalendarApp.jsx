import React from "react";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import AppRouter from "./router/AppRouter";
import { store } from "./store/store";
//import { store } from "./store/ui/store";
//import { AppRouter } from "./router";

const CalendarApp = () => {
  return (
    <Provider store={store}>
      {/* <BrowserRouter> */}
      <HashRouter>
        <AppRouter />
      </HashRouter>
      {/* </BrowserRouter> */}
    </Provider>
  );
};

export default CalendarApp;
