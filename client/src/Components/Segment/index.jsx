import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

import { deleteTodo } from "../../actions/todoActions";

import { Segment, Header, Button, Modal } from "semantic-ui-react";

import "./styles.scss";

class SegmentModule extends Component {
  state = { open: false };

  show = () => () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  onDeleteClick = id => {
    this.props.deleteTodo(id);
  };

  wordwrap = (str, maxLength) => {
    if (str.length <= maxLength) return str;
    var reg = new RegExp(".{1," + maxLength + "}", "g");
    var parts = str.match(reg);
    return parts.join("\n");
  };

  render() {
    const { open } = this.state;
    return (
      <div className="Segment-Component">
        <Segment key={this.props.element._id} textAlign="left" color="red">
          {this.wordwrap(this.props.element.todoContent, 18)}
          <Button
            floated="right"
            circular
            size="mini"
            color={"black"}
            onClick={this.show(this.props.element._id)}
          >
            Delete
          </Button>
          <Header as="h5" textAlign="right">
            <i>
              <sup>Created {moment(this.props.element.date).calendar()}</sup>
            </i>
          </Header>
        </Segment>
        <Modal size={"small"} open={open} onClose={this.close}>
          <Modal.Header>Are you sure you want to delete it?</Modal.Header>
          <Modal.Actions>
            <Button negative onClick={this.close}>
              Cancel
            </Button>
            <Button
              positive
              content="Yes"
              onClick={this.onDeleteClick.bind(this, this.props.element._id)}
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default connect(
  null,
  { deleteTodo }
)(SegmentModule);
