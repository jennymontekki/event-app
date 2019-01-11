import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import ProfileMessageComponent from './ProfileMessageComponent';

class ProfileMessagesComponent extends React.PureComponent {
  render() {
    const { messages, onDeleteHandler } = this.props;
    let messagesList = '';

    if (messages && messages.length > 0) {
      messagesList = messages.map(message => {
        return (
          <Col key={message.id} className="col-12">
            <ProfileMessageComponent message={message} onDelete={onDeleteHandler} />
          </Col>
        );
      });
    }

    return (
      <Row className="profile-messages__container">
        {messagesList}
      </Row>
    );
  }
}

ProfileMessagesComponent.propTypes = {
  messages: PropTypes.array,
  onDeleteHandler: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    messages: state.profileStore.messages
  };
};

export default connect(mapStateToProps, null)(ProfileMessagesComponent);
