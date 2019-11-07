import React, { Component } from "react";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";

import LandingPage from "./App/Pages/LandingPage";

import "semantic-ui-css/semantic.min.css";
class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <LandingPage />
      </Provider>
    );
  }
}

export default App;
