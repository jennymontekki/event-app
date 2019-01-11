import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import withAuthGuard from './../../hocs/withAuthGuard';
import { addEventRoute, editEventRoute } from './../../shared/config';
import * as addEditEventActions from './addEditEventActions';
import './addEditEvent.css';
import { getAddEditEventData, setAddEditEventData } from './../../shared/tempDataService';
import AddEditEventComponent from './../../components/AddEditEventComponent';

class AddEditEventContainer extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onFormSubmitHandler = this.onFormSubmitHandler.bind(this);
  }

  componentDidMount() {
    const { routeMatch } = this.props;

    this.initComponent(routeMatch);
  }

  componentWillUpdate(nextProps) {
    const prevRouteMatch = this.props.routeMatch;
    const { routeMatch } = nextProps;

    if (prevRouteMatch.url !== routeMatch.url) {
      this.initComponent(routeMatch);
    }
  }

  onFormSubmitHandler(payload, eventId) {
    const { routeMatch } = this.props;
    const { addEvent, editEvent } = this.props.actions;
    setAddEditEventData({ event: payload });

    if (routeMatch.path === addEventRoute.path) {
      addEvent(payload);
      return;
    }

    if (routeMatch.path === editEventRoute.path)
      editEvent({ payload, eventId });
  }

  initComponent(routeMatch) {
    const { fetchEventToEdit } = this.props.actions;

    if (routeMatch.path === editEventRoute.path)
      fetchEventToEdit(routeMatch.params.eventId);
  }

  render() {
    const { categories, categoriesLoading, loading, newEvent, eventToEdit, routeMatch } = this.props;
    const tempAddEditEventData = getAddEditEventData();
    const eventDefaults = tempAddEditEventData.event ? tempAddEditEventData.event : (routeMatch.path === addEventRoute.path ? newEvent : eventToEdit);
    const shouldRender = categories && !categoriesLoading;

    return (
      <Container className="add-edit-event-page">
        <Fragment>
          <AddEditEventComponent
            eventDefaults={eventDefaults}
            categories={categories}
            loading={!shouldRender || loading}
            onFormSubmit={this.onFormSubmitHandler} />
        </Fragment>
      </Container>
    );
  }
}

AddEditEventContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  newEvent: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  categoriesLoading: PropTypes.bool.isRequired,
  eventToEdit: PropTypes.object,
  categories: PropTypes.array,
  routeMatch: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
  return {
    categories: state.categoriesStore.categories,
    categoriesLoading: state.categoriesStore.loading,
    newEvent: state.addEditEventStore.newEvent,
    loading: state.addEditEventStore.loading,
    eventToEdit: state.addEditEventStore.eventToEdit,
    routeMatch: ownProps.match
  };
};

const mapDispatchActionsToProps = dispatch => {
  return {
    actions: bindActionCreators(addEditEventActions, dispatch)
  };
};

export default withAuthGuard(connect(mapStateToProps, mapDispatchActionsToProps)(AddEditEventContainer));
