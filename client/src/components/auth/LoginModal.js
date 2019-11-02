import React, { Component } from "react";

import {
  Button,
  Form,
  Modal,
  Input,
  Menu,
  Segment,
  Icon
} from "semantic-ui-react";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
class LoginModal extends Component {
  state = {
    showModal: false,
    email: "",
    password: "",
    msg: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;

    const user = {
      email,
      password
    };

    //Attempt to login
    this.props.login(user);
  };

  closeModal = () => {
    //Clearing Erros
    this.props.clearErrors();

    this.setState({ showModal: false });
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      //Check for a register error
      if (error.id === "LOGIN_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    if (this.state.showModal) {
      if (isAuthenticated) this.closeModal();
    }
  }

  render() {
    const { msg } = this.state;
    return (
      <Modal
        closeIcon
        onClose={this.closeModal}
        open={this.state.showModal}
        trigger={
          <Menu.Item
            name="login"
            onClick={() => this.setState({ showModal: true })}
          />
        }
      >
        <Modal.Header>Register</Modal.Header>
        <Modal.Description>
          <Form style={{ padding: "20px" }}>
            {msg ? (
              <Segment inverted color="red" secondary>
                <Icon name="warning" />
                {msg}
              </Segment>
            ) : null}
            <Form.Field required>
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
                Login
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
  { login, clearErrors }
)(LoginModal);
