import React, { Component } from "react";
import { connect } from "react-redux";

import { Button, Form, Input, Segment, Icon } from "semantic-ui-react";

import PropTypes from "prop-types";

import "./styles.scss";

//actions
import { register } from "../../../actions/authActions";
import { clearErrors } from "../../../actions/errorActions";
class RegisterModal extends Component {
  state = {
    showModal: false,
    name: "",
    email: "",
    password: "",
    msg: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { name, email, password } = this.state;

    const newUser = {
      name,
      email,
      password
    };

    //Attempt to register
    this.props.register(newUser);
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      //Check for a register error
      if (error.id === "REGISTER_FAIL") {
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
        {msg ? (
          <Segment inverted color="red" secondary>
            <Icon name="warning" />
            {msg}
          </Segment>
        ) : null}
        <Form.Field required>
          <label className="label" htmlFor="name">
            Name
          </label>
          <Input
            type="text"
            name="name"
            id="name"
            onChange={this.onChange}
            placeholder="Enter your Name.."
            className="Register-Input"
          />
          <label className="label" htmlFor="email">
            E-mail
          </label>
          <Input
            type="email"
            name="email"
            id="email"
            onChange={this.onChange}
            placeholder="Enter your Email Address.."
            className="Register-Input"
          />
          <label className="label" htmlFor="password">
            Password
          </label>
          <Input
            type="password"
            name="password"
            id="password"
            onChange={this.onChange}
            className="Register-Input"
            placeholder="Enter your Password.."
          />
        </Form.Field>
        <div>
          <Button
            primary
            floated="left"
            type="submit"
            onClick={e => this.onSubmit(e)}
          >
            Register
          </Button>
        </div>
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
  { register, clearErrors }
)(RegisterModal);
