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

  changeHandler = e => {
    this.setState({ text: e.target.value });
    this.props.modalFormOnChange(e.target.value);
  };

  submitHandler = () => {
    this.props.modalSubmitonClick(this.state.text);
    this.closeModal();
  };

  render() {
    const { triggerModal, modalContent, modalForm } = this.props;
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
          ) : triggerModal.menuMode ? (
            <Menu.Item
              name={triggerModal.menuItem.name}
              onClick={() => this.setState({ showModal: true })}
            />
          ) : (
            <Header>{this.props.triggerModal.alternative}</Header>
          )
        }
      >
        <Modal.Header>{modalContent.header}</Modal.Header>
        <Modal.Description>
          <Form>
            {modalContent.invalidError ? (
              <Segment inverted color="red" secondary>
                <Icon name="warning" />
                {modalContent.invalidError}
              </Segment>
            ) : null}
            <Form.Field>
              {modalForm.map(modalInputSegment => (
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
                    onChange={e => this.changeHandler(e)}
                    placeholder={modalInputSegment.placeholder}
                  />
                </div>
              ))}
            </Form.Field>
            <Button
              positive
              floated={this.props.modalSubmitButton.float}
              onClick={this.submitHandler}
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
