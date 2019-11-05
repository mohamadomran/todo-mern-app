import React, { Component } from "react";

// import {
//   Button,
//   Form,
//   Modal,
//   Segment,
//   Icon,
//   Input,
//   Header
// } from "semantic-ui-react";

import { connect } from "react-redux";

import Modal from "../Components/Modal";

//actions
import { addTodo } from "../actions/todoActions";

import PropTypes from "prop-types";

class TodoModal extends Component {
  state = {
    showModal: false,
    invalidInputError: false,
    todoContent: ""
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    console.log(e);
    debugger;
    e.preventDefault();

    const newTodo = {
      todoContent: this.state.todoContent
    };

    // Add todo via addTodo action
    this.props.addTodo(newTodo);
    this.setState({ invalidInputError: false });
    // Close modal
  };

  render() {
    const triggerModal = {
      buttonMode: true,
      color: "blue",
      floated: "right",
      label: "Add a Todo",
      alternative: "Please login to manage Todos"
    };

    const modalContent = {
      header: "I want to do..",
      invalidError: "You can't leave it empty!"
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
        modalFormOnChange={this.onChange}
        modalSubmitonClick={this.onSubmit}
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
