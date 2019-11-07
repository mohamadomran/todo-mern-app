import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
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
    moment.locale("en-US");
    const { todos } = this.props.todo;
    const { isAuthenticated, user } = this.props.auth;
    return (
      <Container style={{ paddingTop: "5rem" }}>
        {isAuthenticated ? (
          <Header size="huge">Welcome, {user.name}</Header>
        ) : null}
        {todos.map(({ _id, todoContent, date }) => (
          <Segment key={_id}>
            {isAuthenticated ? (
              <Button
                floated="right"
                circular
                size="mini"
                color="red"
                icon="delete"
                onClick={this.onDeleteClick.bind(this, _id)}
              />
            ) : null}
            {todoContent}
            <Header as="h5" textAlign="right">
              <i>
                <sup>Created at: {moment(date).calendar()}</sup>
              </i>
            </Header>
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
