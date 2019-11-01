import React, { Component } from "react";

import { Menu } from "semantic-ui-react";

class AppNavbar extends Component {
  state = {
    activeItem: ""
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    return (
      <div style={{ paddingBottom: "20px" }}>
        <Menu>
          <Menu.Item name="Todo List App" onClick={this.handleItemClick}>
            Home
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default AppNavbar;
