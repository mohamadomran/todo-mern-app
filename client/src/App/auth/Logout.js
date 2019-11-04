import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

//actions
import { logout } from "../../actions/authActions";

import { Menu } from "semantic-ui-react";

import PropTypes from "prop-types";

export class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired
  };

  render() {
    return (
      <Fragment>
        <Menu.Item name="logout" onClick={this.props.logout} />
      </Fragment>
    );
  }
}

export default connect(
  null,
  { logout }
)(Logout);
