import React, { Component } from "react";
import { Container, Segment, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { getTodos, deleteTodo } from "../actions/todoActions";

class TodoList extends Component {
  componentDidMount() {
    this.props.getTodos();
  }

  onDeleteClick = id => {
    this.props.deleteTodo(id);
  };

  render() {
    const { todos } = this.props.todo;
    return (
      <Container style={{ paddingTop: "5rem" }}>
        {todos.map(({ _id, todoContent }) => (
          <Segment key={_id}>
            <Button
              floated="right"
              circular
              size="mini"
              color="red"
              icon="delete"
              onClick={this.onDeleteClick.bind(this, _id)}
            ></Button>
            Task: {todoContent}
          </Segment>
        ))}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  todo: state.todo
});

export default connect(
  mapStateToProps,
  { getTodos, deleteTodo }
)(TodoList);
