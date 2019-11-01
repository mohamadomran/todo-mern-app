import React, { Component } from "react";

import { Button, Form, Modal, Input, Menu } from "semantic-ui-react";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import { register } from "../../actions/authActions";

class RegisterModal extends Component {
  state = {
    showModal: false,
    invalidInputError: false,
    todoContent: "",
    email: "",
    password: "",
    msg: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    this.closeModal();
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <Modal
        closeIcon
        onClose={this.closeModal}
        open={this.state.showModal}
        trigger={
          <Menu.Item
            name="register"
            onClick={() => this.setState({ showModal: true })}
          />
        }
      >
        <Modal.Header>Register</Modal.Header>
        <Modal.Description>
          <Form style={{ padding: "20px" }}>
            <Form.Field required>
              <label for="name">Name</label>
              <Input
                type="text"
                name="name"
                id="name"
                onChange={this.onChange}
                placeholder="Enter your Name.."
              />
              <label style={{ paddingTop: "15px" }} for="email">
                E-mail
              </label>
              <Input
                type="email"
                name="email"
                id="email"
                onChange={this.onChange}
                placeholder="Enter your Email Address.."
              />
              <label style={{ paddingTop: "15px" }} for="password">
                Password
              </label>
              <Input
                type="password"
                name="password"
                id="password"
                onChange={this.onChange}
                placeholder="Enter your Password.."
              />
            </Form.Field>
            <div style={{ paddingBottom: "30px" }}>
              <Button
                positive
                floated="right"
                type="submit"
                onClick={e => this.onSubmit(e)}
              >
                Register
              </Button>
            </div>
          </Form>
        </Modal.Description>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(
  mapStateToProps,
  { register }
)(RegisterModal);
