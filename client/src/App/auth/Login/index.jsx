import React, { Component } from "react";
import { connect } from "react-redux";

import { Button, Form, Input, Segment, Icon } from "semantic-ui-react";

import PropTypes from "prop-types";

import "./styles.scss";

//actions
import { login } from "../../../actions/authActions";
import { clearErrors } from "../../../actions/errorActions";

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

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      if (error.id === "LOGIN_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  render() {
    const { msg } = this.state;
    return (
      <Form>
        <Form.Field required>
          {msg ? (
            <Segment inverted color="red" secondary>
              <Icon name="warning" />
              {msg}
            </Segment>
          ) : null}
          <label className="label" for="email-login">
            E-mail
          </label>
          <Input
            type="email"
            name="email"
            id="email-login"
            onChange={this.onChange}
            placeholder="Enter your Email Address.."
            className="Login-Input"
          />
          <label className="label" for="password-login">
            Password
          </label>
          <Input
            type="password"
            name="password"
            id="password-login"
            onChange={this.onChange}
            placeholder="Enter your Password.."
            className="Login-Input"
          />
        </Form.Field>
        <Button
          primary
          floated="left"
          type="submit"
          onClick={e => this.onSubmit(e)}
        >
          Login
        </Button>
      </Form>
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
