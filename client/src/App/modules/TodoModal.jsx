import React, { Component } from "react";
import { connect } from "react-redux";

import Modal from "../../Components/Modal";

import { addTodo } from "../../actions/todoActions";

import PropTypes from "prop-types";

class TodoModal extends Component {
  state = {
    todoContent: ""
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  changeHandler = todoContent => {
    this.setState({ todoContent });
  };

  submitHandler = () => {
    const newTodo = {
      todoContent: this.state.todoContent
    };

    this.props.addTodo(newTodo);
  };

  render() {
    const triggerModal = this.props.isAuthenticated
      ? {
          buttonMode: true,
          color: "red",
          floated: "right",
          label: "Add a Todo"
        }
      : {
          alternative: "Please login to manage Todos"
        };

    const modalContent = {
      header: "I want to do..",
      invalidError: "Can't submit an empty todo"
    };

    const modalForm = [
      {
        type: "text",
        name: "todoContent",
        id: "todo",
        placeholder: "So, what's the task?"
      }
    ];

    const modalSubmitButton = {
      float: "right",
      label: "Add"
    };

    return (
      <Modal
        triggerModal={triggerModal}
        modalContent={modalContent}
        modalSubmitButton={modalSubmitButton}
        modalForm={modalForm}
        modalFormOnChange={this.changeHandler}
        modalSubmitonClick={() => this.submitHandler()}
      />
    );
  }
}

const mapStateToProps = state => ({
  todo: state.todo,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { addTodo }
)(TodoModal);
