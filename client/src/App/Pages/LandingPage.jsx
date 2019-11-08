import React, { Component } from "react";
import { connect } from "react-redux";

import AuthenticationPage from "./Auth";
import TodoList from "./Todo";
import AppNavBar from "../modules/AppNavbar";

import PropTypes from "prop-types";

class LandingPage extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div>
        {isAuthenticated ? <AppNavBar /> : null}
        <div>{isAuthenticated ? <TodoList /> : <AuthenticationPage />}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(LandingPage);
