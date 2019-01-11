import React from 'react';
import PropTypes from 'prop-types';
import { Alert, ListGroupItem } from 'reactstrap';
import Icon from 'react-icons-kit';
import { exclamationCircle, infoCircle, questionCircle, checkCircle } from 'react-icons-kit/fa';

class ToastComponent extends React.Component {
  constructor(props) {
    super(props);

    this.timeout = null;
    this.onDismissClickPreparation = this.onDismissClickPreparation.bind(this);
    this.mapIconsToToasts = {
      success: checkCircle,
      info: infoCircle,
      warning: questionCircle,
      danger: exclamationCircle,
    };
  }

  shouldComponentUpdate() { return false; }

  onDismissClickPreparation() {
    const { onDismissClick } = this.props;
    const { id } = this.props.options;

    clearTimeout(this.timeout);

    onDismissClick(id);
  }

  render() {
    const { onDismissClick } = this.props;
    const { id, duration, type, message } = this.props.options;

    if (duration) {
      this.timeout = setTimeout(() => {
        onDismissClick(id);
      }, duration);
    }

    return (
      <ListGroupItem className="toast__item-outer">
        <Alert className="toast__item-inner" color={type} onClick={this.onDismissClickPreparation}>
          <Icon icon={this.mapIconsToToasts[type]} className="toast__icon" size={24} />
          {message}
        </Alert>
      </ListGroupItem>
    );
  }
}

ToastComponent.propTypes = {
  options: PropTypes.object.isRequired,
  onDismissClick: PropTypes.func.isRequired
};

export default ToastComponent;
