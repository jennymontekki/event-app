import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button,
  Form,
  FormGroup,
  Row,
  Col,
  Alert
} from 'reactstrap';
import Icon from 'react-icons-kit';
import { telegram } from 'react-icons-kit/fa';
import { messageToServer } from './../../shared/socketService';
import { localShortDateToString } from './../../shared/helpers';

export class ChatWindowComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.messagesPrep = this.messagesPrep.bind(this);
    this.setMessagesArea = this.setMessagesArea.bind(this);
    this.setTextArea = this.setTextArea.bind(this);
    this.initMessagesArea = this.initMessagesArea.bind(this);
  }

  componentDidMount() { this.initMessagesArea(); }
  componentDidUpdate() { this.initMessagesArea(); }

  onChangeHandler(e) { this.setState({ message: e.target.value }); }

  onSubmitHandler(e) {
    e.preventDefault();
    const { message } = this.state;

    if (message.length > 0) {
      messageToServer({ roomId: this.props.roomId, message });
      this.setState({ message: '' });
    }
  }

  setMessagesArea(messagesArea) { this.messagesArea = messagesArea; }

  setTextArea(textArea) { this.textArea = textArea; }

  initMessagesArea() { if (this.messagesArea) this.messagesArea.scrollTop = this.messagesArea.scrollHeight; }

  messagesPrep() {
    const { user } = this.props;
    const messages = this.props.messages.map(message => {
      let messageStyle = 'chat-window__message-item';
      let messageInfoStyle = 'chat-window__message-info';
      let messageInfoNameStyle = 'chat-window__message-info-name';
      let messageColor = 'primary';

      if (message.user.name === user.name) {
        messageStyle += ' chat-window__message-item--user';
        messageInfoStyle += ' chat-window__message-info--user';
        messageInfoNameStyle += ' chat-window__message-info-name--user';
        messageColor = 'success';
      }

      return (
        <article key={message.updatedAt} className="chat-window__item">
          <div className={messageInfoStyle}>
            <div className={messageInfoNameStyle}>{message.user.name}</div>
            <div className="text-muted chat-window__message-info-date">{localShortDateToString(message.updatedAt)}</div>
          </div>
          <div className={messageStyle}>
            <Alert color={messageColor} >{message.message}</Alert>
            <img src="/images/avatar-placeholder.png" alt="user avatar" />
          </div>
        </article>
      );
    });

    return messages;
  }

  render() {
    const messages = this.messagesPrep();
    const { message } = this.state;

    return (
      <Row>
        <Col>
          <Form className="chat-window__container" onSubmit={this.onSubmitHandler} noValidate>
            <FormGroup><section ref={this.setMessagesArea} className="chat-window__read-message-area">{messages}</section></FormGroup>
            <FormGroup><textarea value={message} ref={this.setTextArea} onChange={this.onChangeHandler} className="chat-window__write-message-area" /></FormGroup>
            <Button
              color="info"
              className="chat-window__submit-btn col-12">
              Send
              <Icon icon={telegram} className="chat-window__submit-btn-icon" size={24} />
            </Button>
          </Form>
        </Col>
      </Row>
    );
  }
}

ChatWindowComponent.propTypes = {
  roomId: PropTypes.number.isRequired,
  messages: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    roomId: state.eventDetailsStore.eventDetails.id,
    messages: state.eventDetailsStore.eventMessages
  };
};

export default connect(mapStateToProps, null)(ChatWindowComponent);
