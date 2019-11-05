import React, { Component } from "react";

import {
  Button,
  Form,
  Modal,
  Segment,
  Icon,
  Input,
  Menu,
  Header
} from "semantic-ui-react";

class ModalComponent extends Component {
  state = {
    showModal: false
  };

  closeModal = () => {
    // this.props.clearErrors();
    this.setState({ showModal: false });
  };

  render() {
    console.log(this.props);

    const { triggerModal } = this.props;

    return (
      <Modal
        closeIcon
        open={this.state.showModal}
        onClose={this.closeModal}
        trigger={
          triggerModal.buttonMode ? (
            <Button
              onClick={() => this.setState({ showModal: true })}
              color={triggerModal.color}
              floated={triggerModal.floated}
            >
              {triggerModal.label}
            </Button>
          ) : (
            //   ) : this.props.menuMode ? (
            //     <Menu.Item
            //       name={triggerModal.menuItem.name}
            //       onClick={() => this.setState({ showModal: true })}
            //     />
            <Header>{this.props.triggerModal.alternative}</Header>
          )
        }
      >
        <Modal.Header>{this.props.modalContent.header}</Modal.Header>
        <Modal.Description>
          <Form>
            {this.props.modalContent.invalidError ? (
              <Segment inverted color="red" secondary>
                <Icon name="warning" />
                {this.props.modalContent.invalidError}
              </Segment>
            ) : null}
            <Form.Field>
              {this.props.modalForm.map(modalInputSegment => (
                <div>
                  {modalInputSegment.labelText ? (
                    <label for={modalInputSegment.labelFor}>
                      {modalInputSegment.labelText}
                    </label>
                  ) : null}
                  <Input
                    type={modalInputSegment.type}
                    name={modalInputSegment.name}
                    id={modalInputSegment.id}
                    onChange={this.props.modalFormOnChange}
                    placeholder={modalInputSegment.placeholder}
                  />
                </div>
              ))}
            </Form.Field>
            <Button
              positive
              floated={this.props.modalSubmitButton.float}
              onClick={() => this.sendData()}
            >
              {this.props.modalSubmitButton.label}
            </Button>
            <Button
              floated={this.props.modalSubmitButton.floatPosition}
              onClick={this.closeModal}
            >
              Cancel
            </Button>
          </Form>
        </Modal.Description>
      </Modal>
    );
  }
}

export default ModalComponent;
