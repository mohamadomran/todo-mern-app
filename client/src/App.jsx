import React, { Component } from "react";
import AppNavbar from "./App/AppNavbar";
import TodoList from "./App/TodoList";
import TodoModal from "./App/TodoModal";
import SearchExampleStandard from "./App/SearchBar";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";

import "semantic-ui-css/semantic.min.css";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <AppNavbar />
        <div className="ui container">
          <SearchExampleStandard />
          <TodoModal />
          <div>
            <TodoList />
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
