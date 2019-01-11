import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import Icon from 'react-icons-kit';
import { user as userIcon, wechat } from 'react-icons-kit/fa';
import { ic_place, ic_access_alarm } from 'react-icons-kit/md';
import { dateToString } from './../../shared/helpers';
import { editEventRoute } from './../../shared/config';
import withLoader from './../../hocs/withLoader';
import GoogleMapComponent from './../google-map/GoogleMapComponent';
import ModalComponent from './../modal/ModalComponent';
import ChatWindowComponent from './ChatWindowComponent';

export class EventDetailsComponent extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOpenModal: false,
      isSubscribeDisabled: false
    };

    this.subscriptionType = 'subscribe';
    this.isHost = false;
    this.modal = {
      title: 'Delete Event',
      message: 'Are you sure? Event will be deleted without any chance to restore it.'
    };

    this.modalToggle = this.modalToggle.bind(this);
    this.subscriptionHandler = this.subscriptionHandler.bind(this);
    this.onClickModalHandler = this.onClickModalHandler.bind(this);
  }

  onClickModalHandler(type) {
    const { onDeleteEvent, event } = this.props;

    if (type === 'OK')
      onDeleteEvent(event.id);

    this.modalToggle();
  }

  subscriptionHandler() {
    const { onSubscribe, event } = this.props;

    this.setState({ isSubscribeDisabled: true });
    onSubscribe({ eventId: event.id }, this.subscriptionType);
  }

  modalToggle() { this.setState({ isOpenModal: !this.state.isOpenModal }); }

  renderPreparation() {
    const { event, user } = this.props;

    if (user !== null) {
      if (event.user.name === user.name)
        this.isHost = true;

      this.subscriptionType = event.visitors.find(visitor => visitor.user.name === user.name) ? 'unsubscribe' : 'subscribe';
    }

    const visitorsList = event.visitors.map(visitor => {
      return (
        <div className="card" key={visitor.user.name}>
          <div className="card-body event-details__visitors-card">
            <img src="/images/avatar-placeholder.png" className="visitor__img" alt="user avatar" />
            {visitor.user.name}
          </div>
        </div>
      );
    });

    const shouldRenderChat = (this.subscriptionType === 'unsubscribe' || this.isHost) ? true : false;

    return { visitorsList, shouldRenderChat };
  }

  render() {
    const { event, user } = this.props;

    const { visitorsList, shouldRenderChat } = this.renderPreparation();

    return (
      <Fragment>
        <article className="event-details-card row">
          <section className="event-details-card__info-area col-sm-8 col-xs-12">
            <header className="event-details-card__info-area-header-container">
              <h2 className="event-details-card__info-area-header-content">{event.title}</h2>
            </header>
            <section className="event-details-card__info-area-item-content text-muted">
              <div className="event-details-card__header-container event-details-card__info-area-date">
                <Icon icon={ic_access_alarm} className="event-details-card__icon" size={22} />
                {dateToString(event.date)}
              </div>
              <div className="event-details-card__header-container">
                <Icon icon={ic_place} className="event-details-card__icon" size={24} />
                {event.address}
              </div>
              <div className="event-details-card__header-container event-details-card__info-area-hosted-by">
                <Icon icon={userIcon} className="event-details-card__icon" size={24} />
                <span>{event.user.name}</span>
              </div>
            </section>
          </section>
          <section className="event-details-card__info-area-subscribe col-sm-4 col-xs-12">
            {!this.isHost &&
              <Button type="button" color="primary" onClick={this.subscriptionHandler} disabled={this.state.isSubscribeDisabled} className="event-details-card__info-area-subscribe-btn">{this.subscriptionType}</Button>
            }
            {this.isHost &&
              <Fragment>
                <Link to={`${editEventRoute.url}/${event.id}`} color="danger" className="event-details-card__info-area-host-btn btn btn-warning">Edit</Link>
                <Button type="button" color="danger" onClick={this.modalToggle} className="event-details-card__info-area-host-btn">Delete</Button>
              </Fragment>
            }
          </section>
        </article>
        <section><GoogleMapComponent frozen position={event.location} address={event.address} /></section>
        {event.description &&
        <section className="event-details-description">
          <p className="text-muted">
            <span>Description: </span>
            {event.description}
          </p>
        </section>
        }
        {shouldRenderChat &&
        <section className="event-details__chat-window">
          <div className="event-details__chat-window-header">
            <span>Event Chat </span>
            <Icon icon={wechat} className="event-details__chat-window-header-icon" size={24} />
          </div>
          <ChatWindowComponent user={user} />
        </section>
        }
        {visitorsList.length > 0 &&
        <section className="event-details-visitors-section text-muted">
          <h2>Attendees: </h2>
          <article className="event-details-visitors">{visitorsList}</article>
        </section>
        }
        {this.state.isOpenModal &&
          <ModalComponent onClickModal={this.onClickModalHandler} message={this.modal.message} title={this.modal.title} />
        }
      </Fragment>
    );
  }
}

EventDetailsComponent.propTypes = {
  event: PropTypes.object.isRequired,
  user: PropTypes.object,
  onSubscribe: PropTypes.func.isRequired,
  onDeleteEvent: PropTypes.func.isRequired
};

export default withLoader(EventDetailsComponent);
