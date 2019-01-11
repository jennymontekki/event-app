import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './modal.css';

class ModalComponent extends React.Component {
  constructor(props) {
    super(props);

    this.onClickModalPreparation = this.onClickModalPreparation.bind(this);
  }

  shouldComponentUpdate() { return false; }

  onClickModalPreparation(type) {
    return () => {
      const { onClickModal } = this.props;

      onClickModal(type);
    };
  }

  render() {
    const { title, message } = this.props;

    return (
      <Modal isOpen backdrop toggle={this.onClickModalPreparation('CANCEL')}>
        <ModalHeader toggle={this.onClickModalPreparation('CANCEL')}>{title}</ModalHeader>
        <ModalBody>{message}</ModalBody>
        <ModalFooter>
          <Button color="success" onClick={this.onClickModalPreparation('OK')}>OK</Button>
          <Button color="danger" onClick={this.onClickModalPreparation('CANCEL')}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

ModalComponent.propTypes = {
  onClickModal: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.string
};

ModalComponent.defaultProps = {
  title: 'confirm',
  message: 'Are you sure?'
};

export default ModalComponent;
