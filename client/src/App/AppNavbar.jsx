import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { Menu } from "semantic-ui-react";

import PropTypes from "prop-types";

//Components
import RegisterModal from "./auth/RegisterModal";
import LoginModal from "./auth/LoginModal";
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
    const { activeItem } = this.state;
    const { isAuthenticated } = this.props.auth;

    const authLinks = (
      <Fragment>
        <Logout />
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <RegisterModal />
        <LoginModal />
      </Fragment>
    );

    return (
      <div style={{ paddingBottom: "20px" }}>
        <Menu pointing secondary>
          <Menu.Item
            name="home"
            onClick={this.handleItemClick}
            active={activeItem === "home"}
          />

          <Menu.Menu position="right">
            {isAuthenticated ? authLinks : guestLinks}
          </Menu.Menu>
        </Menu>
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
)(AppNavbar);
