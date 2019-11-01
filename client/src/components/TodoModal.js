import React, { Component } from "react";

import { Button, Form, Modal, Segment, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import { addTodo } from "../actions/todoActions";

class TodoModal extends Component {
  state = {
    showModal: false,
    invalidInputError: false,
    todoContent: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    if (this.state.todoContent !== "") {
      const newTodo = {
        todoContent: this.state.todoContent
      };

      // Add todo via addTodo action
      this.props.addTodo(newTodo);
      this.setState({ invalidInputError: false });
      // Close modal
      this.closeModal();
    } else {
      this.setState({ invalidInputError: true });
    }
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { invalidInputError } = this.state;
    return (
      <Modal
        closeIcon
        onClose={this.closeModal}
        open={this.state.showModal}
        trigger={
          <Button
            onClick={() => this.setState({ showModal: true })}
            floated="right"
            color="blue"
          >
            Add a Todo
          </Button>
        }
      >
        <Modal.Header>I want to to do..</Modal.Header>
        <Modal.Description>
          <Form style={{ padding: "20px" }}>
            {invalidInputError ? (
              <Segment inverted color="red" secondary>
                <Icon name="warning" />
                You can't leave it empty!
              </Segment>
            ) : null}
            <Form.Field>
              <input
                type="text"
                name="todoContent"
                id="todo"
                onChange={this.onChange}
                placeholder="So, what's the task?"
              />
            </Form.Field>
            <div style={{ paddingBottom: "30px" }}>
              <Button
                positive
                floated="right"
                type="submit"
                onClick={e => this.onSubmit(e)}
              >
                Add
              </Button>
            </div>
          </Form>
        </Modal.Description>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  todo: state.todo
});

export default connect(
  mapStateToProps,
  { addTodo }
)(TodoModal);
