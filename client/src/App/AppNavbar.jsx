import React, { Component } from "react";
import { connect } from "react-redux";

import { Menu } from "semantic-ui-react";

import PropTypes from "prop-types";

//Components
import Logout from "./auth/Logout";

class AppNavbar extends Component {
  state = {
    activeItem: "home"
  };

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    return (
      <Menu pointing secondary>
        <Menu.Menu position="right">
          <Logout />
        </Menu.Menu>
      </Menu>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(AppNavbar);
