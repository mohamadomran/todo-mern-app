import React, { Component } from "react";
import { connect } from "react-redux";

import { Container } from "semantic-ui-react";

import SegmentModule from "../../Components/Segment";

//actions
import { getTodos, deleteTodo } from "../../actions/todoActions";

import PropTypes from "prop-types";

import "./styles.scss";

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
    return (
      <Container>
        {todos.map(todo => (
          <div key={todo._id}>
            <SegmentModule element={todo} />
          </div>
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
