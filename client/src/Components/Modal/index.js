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

import "./styles.scss";

class ModalComponent extends Component {
  state = {
    showModal: false,
    errorDisplay: false
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  changeHandler = e => {
    this.setState({ text: e.target.value });
    this.props.modalFormOnChange(e.target.value);
  };

  submitHandler = () => {
    if (this.state.text) {
      this.props.modalSubmitonClick(this.state.text);

      this.closeModal();
    } else {
      this.setState({ errorDisplay: true });
    }
    this.setState({ text: null, errorDisplay: false });
  };

  render() {
    const {
      triggerModal,
      modalContent,
      modalForm,
      modalSubmitButton
    } = this.props;
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
            <Header>{this.props.triggerModal.alternative}</Header>
          )
        }
      >
        <Modal.Header>{modalContent.header}</Modal.Header>
        <Modal.Description>
          <Form className="ModalForm">
            {this.state.errorDisplay ? (
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
            <Button floated={modalSubmitButton.float} onClick={this.closeModal}>
              Cancel
            </Button>
            <Button
              positive
              floated={modalSubmitButton.float}
              onClick={this.submitHandler}
            >
              {modalSubmitButton.label}
            </Button>
          </Form>
        </Modal.Description>
      </Modal>
    );
  }
}

export default ModalComponent;
