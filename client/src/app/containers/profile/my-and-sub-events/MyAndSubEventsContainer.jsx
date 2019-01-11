import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Container, Row, Col } from 'reactstrap';
import * as eventsActions from './../../events/eventsActions';
import * as profileActions from './../profileActions';
import { myEventsRoute, subscribedEventsRoute, eventsPerPage, editEventRoute } from './../../../shared/config';

import ModalComponent from './../../../components/modal/ModalComponent';
import EventsComponent from './../../../components/events/EventsComponent';
import PaginationComponent from './../../../components/PaginationComponent';

class MyAndSubEventsContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.pageTitle = 'sub_events';
    this.state = {
      isOpenModal: false,
      eventId: null,
      operationType: 'del'
    };
    this.modal = {
      title: 'Delete Event',
      message: 'Are you sure? Event will be deleted without any chance to restore it.'
    };

    this.modalToggle = this.modalToggle.bind(this);
    this.onEditHandler = this.onEditHandler.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onUnsubscribeHandler = this.onUnsubscribeHandler.bind(this);
    this.onClickModalHandler = this.onClickModalHandler.bind(this);
  }

  componentDidMount() { this.initComponent(this.props.routeMatch); }

  componentWillUpdate(nextProps) {
    const previousRouteMatch = this.props.routeMatch;
    const { routeMatch } = nextProps;

    if (previousRouteMatch.url !== routeMatch.url) {
      this.initComponent(routeMatch);
    }
  }

  onEditHandler(eventId) { this.props.redirectToEdit(eventId); }

  onDeleteHandler(eventId) {
    this.setState({
      eventId,
      operationType: 'del'
    });
    this.modalToggle();
  }

  onUnsubscribeHandler(eventId) {
    this.modal = {
      title: 'Unsubscribe from Event',
      message: 'Are you sure? Anyway you can subscribe later in case you change your mind'
    };
    this.setState({
      eventId,
      operationType: 'unsub'
    });
    this.modalToggle();
  }

  onClickModalHandler(type) {
    const { actions, events, eventsCount } = this.props;
    const { operationType, eventId } = this.state;

    if (type === 'OK') {
      if (operationType === 'del')
        actions.profile.deleteMyEvent(eventId, events, eventsCount);

      if (operationType === 'unsub')
        actions.profile.unsubscribe(eventId, events, eventsCount);
    }

    this.modalToggle();
  }

  modalToggle() { this.setState({ isOpenModal: !this.state.isOpenModal }); }

  initComponent(routeMatch) {
    const { fetchEventsByUserId, fetchSubscribedEvents } = this.props.actions.events;

    if (routeMatch.path === myEventsRoute.path) {
      this.pageTitle = 'my_events';
      fetchEventsByUserId(routeMatch.params.pageNum);
      return;
    }

    if (routeMatch.path === subscribedEventsRoute.path) {
      this.pageTitle = 'sub_events';
      fetchSubscribedEvents(routeMatch.params.pageNum);
    }
  }

  render() {
    const { routeMatch, eventsCount } = this.props;

    return (
      <Container>
        {this.pageTitle === 'my_events' &&
          <EventsComponent onEdit={this.onEditHandler} onDelete={this.onDeleteHandler} />
        }
        {this.pageTitle === 'sub_events' &&
          <EventsComponent onUnsubscribe={this.onUnsubscribeHandler} />
        }
        {eventsCount > eventsPerPage &&
        <Row>
          <Col className="col-12">
            <PaginationComponent itemsCount={eventsCount} itemsPerPage={eventsPerPage} url={routeMatch.url} />
          </Col>
        </Row>
        }
        {this.state.isOpenModal &&
          <ModalComponent onClickModal={this.onClickModalHandler} message={this.modal.message} title={this.modal.title} />
        }
      </Container>
    )
  }
}

MyAndSubEventsContainer.propTypes = {
  events: PropTypes.array,
  eventsCount: PropTypes.number.isRequired,
  actions: PropTypes.object.isRequired,
  redirectToEdit: PropTypes.func.isRequired,
  routeMatch: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
  return {
    events: state.eventsStore.events,
    eventsCount: state.eventsStore.eventsCount,
    routeMatch: ownProps.match
  };
};

const mapDispatchActionsToProps = dispatch => {
  return {
    actions: {
      events: bindActionCreators(eventsActions, dispatch),
      profile: bindActionCreators(profileActions, dispatch)
    },
    redirectToEdit: eventId => dispatch(push(`${editEventRoute.url}/${eventId}`))
  };
};

export default connect(mapStateToProps, mapDispatchActionsToProps)(MyAndSubEventsContainer);
