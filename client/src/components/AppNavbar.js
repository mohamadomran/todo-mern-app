import React, { Component } from "react";

import { Menu } from "semantic-ui-react";

import RegisterModal from "../components/auth/RegisterModal";
class AppNavbar extends Component {
  state = {
    activeItem: "home"
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    return (
      <div style={{ paddingBottom: "20px" }}>
        <Menu pointing secondary>
          <Menu.Item
            name="home"
            onClick={this.handleItemClick}
            active={activeItem === "home"}
          />

          <Menu.Menu position="right">
            <RegisterModal />
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}

export default AppNavbar;
