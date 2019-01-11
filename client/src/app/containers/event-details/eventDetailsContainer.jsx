import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import * as eventDetailsActions from './eventDetailsActions';
import WebStorageService from './../../shared/webStorageService';
import EventDetailsComponent from './../../components/event-details/EventDetailsComponent';
import './eventDetails.css';

class EventDetailsContainer extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onSubscribeHandler = this.onSubscribeHandler.bind(this);
    this.onDeleteEventHandler = this.onDeleteEventHandler.bind(this);
  }

  componentDidMount() {
    const { eventIdToFetch } = this.props;
    const { fetchEventDetails, fetchEventMessages } = this.props.actions;

    fetchEventDetails(eventIdToFetch);
    fetchEventMessages(eventIdToFetch);
  }

  onSubscribeHandler(payload, type) {
    const { notAuthenticated, subscription } = this.props.actions;

    if (!WebStorageService.getUser()) {
      notAuthenticated();
      return;
    }

    subscription(type, payload);
  }

  onDeleteEventHandler(eventId) {
    const { deleteEvent } = this.props.actions;

    deleteEvent(eventId);
  }

  render() {
    const { eventDetails, loading } = this.props;
    const user = WebStorageService.getUser();

    return (
      <Fragment>
        <Container className="event-details-page">
          <EventDetailsComponent
            event={eventDetails}
            onSubscribe={this.onSubscribeHandler}
            onDeleteEvent={this.onDeleteEventHandler}
            user={user}
            loading={loading || eventDetails === null}
            />
        </Container>
      </Fragment>
    );
  }
}

EventDetailsContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  eventDetails: PropTypes.object,
  eventIdToFetch: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    eventDetails: state.eventDetailsStore.eventDetails,
    eventIdToFetch: Number(ownProps.match.params.eventId),
    loading: state.eventDetailsStore.loading
  };
};

const mapDispatchActionsToProps = dispatch => {
  return {
    actions: bindActionCreators(eventDetailsActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchActionsToProps)(EventDetailsContainer);
