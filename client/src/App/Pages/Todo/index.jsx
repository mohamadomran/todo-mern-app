import React from "react";
import { Segment, Divider, Icon } from "semantic-ui-react";

import TodoList from "../../todoList/TodoList";
import SearchList from "../../todoList/SearchBar";

import "./styles.scss";

const TodoListPage = () => (
  <div className="Segment">
    <Segment>
      <SearchList />
      <Divider horizontal>
        <Icon loading name="asterisk" />
      </Divider>
      <TodoList />
    </Segment>
  </div>
);

export default TodoListPage;
