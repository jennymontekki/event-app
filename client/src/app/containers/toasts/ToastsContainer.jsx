import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ListGroup } from 'reactstrap';
import * as toastsActions from './toastsActions';
import './toasts.css';

import ToastComponent from './../../components/ToastComponent';

class ToastsContainer extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onDismissClickHandler = this.onDismissClickHandler.bind(this);
  }

  onDismissClickHandler(toastId) {
    const { removeToast } = this.props.actions;

    removeToast(toastId);
  }

  render() {
    const { toastsList } = this.props;

    const toastsToRender = toastsList.map(toast => {
      return (
        <ToastComponent options={toast} key={toast.id} onDismissClick={this.onDismissClickHandler} />
      );
    });

    return (
      <ListGroup className="toast__list">
        {toastsToRender}
      </ListGroup>
    );
  }
}

ToastsContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  toastsList: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  toastsList: state.toastsStore.toastsList
});

const mapDispatchActionsToProps = dispatch => ({
  actions: bindActionCreators(toastsActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchActionsToProps)(ToastsContainer);
