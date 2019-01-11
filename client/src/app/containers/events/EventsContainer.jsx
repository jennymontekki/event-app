import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import * as eventsActions from './eventsActions';
import {
  eventsRoute,
  eventsCategoryIdRoute,
  eventDetailsRoute,
  eventsPerPage
} from './../../shared/config';
import './events.css';

import EventsComponent from './../../components/events/EventsComponent';
import SearchComponent from './../../components/search/SearchComponent';
import PaginationComponent from './../../components/PaginationComponent';

class EventsContainer extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onSearchChangeHandler = this.onSearchChangeHandler.bind(this);
  }

  componentDidMount() {
    const { routeMatch } = this.props;

    this.initComponent(routeMatch);
  }

  componentWillUpdate(nextProps) {
    const previousRouteMatch = this.props.routeMatch;
    const { routeMatch } = nextProps;

    if (previousRouteMatch.url !== routeMatch.url) {
      this.initComponent(routeMatch);
    }
  }

  onSearchChangeHandler(searchValue) {
    const { fetchFilteredEvents } = this.props.actions;

    fetchFilteredEvents(searchValue);
  }

  initComponent(routeMatch) {
    const { fetchAllEvents, fetchEventsByCategoryId } = this.props.actions;

    if (routeMatch.path === eventsRoute.path) {
      fetchAllEvents(routeMatch.params.pageNum);
      return;
    }

    if (routeMatch.path === eventsCategoryIdRoute.path) {
      const { categoryId, pageNum } = routeMatch.params;
      fetchEventsByCategoryId({ categoryId, pageNum });
    }
  }

  render() {
    const { eventsCount, filteredEvents, routeMatch } = this.props;

    return (
      <Container className="events-page">
        {routeMatch.path === eventsRoute.path &&
        <SearchComponent onChangeHandler={this.onSearchChangeHandler} items={filteredEvents} url={eventDetailsRoute.url} />
        }
        <div className="events-page__title">Events</div>
        <EventsComponent />
        {eventsCount > eventsPerPage &&
        <Row>
          <Col className="col-12">
            <PaginationComponent itemsCount={eventsCount} itemsPerPage={eventsPerPage} url={routeMatch.url} />
          </Col>
        </Row>
        }
      </Container>
    );
  }
}

EventsContainer.propTypes = {
  eventsCount: PropTypes.number.isRequired,
  actions: PropTypes.object.isRequired,
  filteredEvents: PropTypes.array,
  routeMatch: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
  return {
    eventsCount: state.eventsStore.eventsCount,
    filteredEvents: state.eventsStore.filteredEvents,
    routeMatch: ownProps.match
  };
};

const mapDispatchActionsToProps = dispatch => {
  return {
    actions: bindActionCreators(eventsActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchActionsToProps)(EventsContainer);
