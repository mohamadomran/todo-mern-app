import React, { Component } from "react";
import { connect } from "react-redux";

import { Container, Segment, Button, Header } from "semantic-ui-react";

//actions
import { getTodos, deleteTodo } from "../actions/todoActions";

import PropTypes from "prop-types";

class TodoList extends Component {
  componentDidMount() {
    this.props.getTodos();
  }

  onDeleteClick = id => {
    this.props.deleteTodo(id);
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
    getTodos: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };

  render() {
    const { todos } = this.props.todo;
    const { isAuthenticated, user } = this.props.auth;
    return (
      <Container style={{ paddingTop: "5rem" }}>
        {isAuthenticated ? (
          <Header size="huge">Welcome, {user.name}</Header>
        ) : null}
        {todos.map(({ _id, todoContent }) => (
          <Segment key={_id}>
            {this.props.isAuthenticated ? (
              <Button
                floated="right"
                circular
                size="mini"
                color="red"
                icon="delete"
                onClick={this.onDeleteClick.bind(this, _id)}
              />
            ) : null}
            <i>Task:</i> {todoContent}
          </Segment>
        ))}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  todo: state.todo,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getTodos, deleteTodo }
)(TodoList);
