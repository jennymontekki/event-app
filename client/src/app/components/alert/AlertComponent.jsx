import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import './alert.css';

class AlertComponent extends React.Component {
  shouldComponentUpdate() { return false; }

  render() {
    const { title, message, onClickAlert } = this.props;

    return (
      <Modal isOpen backdrop toggle={onClickAlert}>
        <ModalHeader toggle={onClickAlert}>{title}</ModalHeader>
        <ModalBody className="alert__message">{message}</ModalBody>
      </Modal>
    );
  }
}

AlertComponent.propTypes = {
  onClickAlert: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.string
};

AlertComponent.defaultProps = {
  title: 'notification',
  message: ''
};

export default AlertComponent;
