import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAllCategories } from './../containers/categories/categoriesActions';
import {
  profileRoute,
  eventsRoute,
  eventsCategoryIdRoute,
  eventDetailsRoute,
  addEventRoute,
  editEventRoute,
  authRoute,
  errorRoute
} from './../shared/config';

import NavigationComponent from './../components/navigation/NavigationComponent';
import FooterComponent from './../components/main-footer/FooterComponent';
import ToastsContainer from './../containers/toasts/ToastsContainer';
import ProfileComponent from './../components/profile/ProfileComponent';
import EventsContainer from './../containers/events/EventsContainer';
import CategoriesContainer from './../containers/categories/CategoriesContainer';
import eventDetailsContainer from './../containers/event-details/eventDetailsContainer';
import AddEditEventContainer from './../containers/add-edit-event/AddEditEventContainer';
import AuthContainer from './../containers/auth/AuthContainer';
import ErrorComponent from './../components/error/ErrorComponent';

class MainComponent extends React.PureComponent {
  componentDidMount() {
    const { fetchAllCategories } = this.props.initApp;

    fetchAllCategories();
  }

  render() {
    const { location } = this.props;

    return (
      <Fragment>
        <NavigationComponent activeRouteUrl={location.pathname} />
        <ToastsContainer />
        <Switch>
          <Route exact path={eventsRoute.path} component={EventsContainer} />
          <Route path={profileRoute.path} component={ProfileComponent} />
          <Route exact path={eventsCategoryIdRoute.path} component={EventsContainer} />
          <Route exact path={eventDetailsRoute.path} component={eventDetailsContainer} />
          <Route exact path={addEventRoute.path} component={AddEditEventContainer} />
          <Route exact path={editEventRoute.path} component={AddEditEventContainer} />
          <Route exact path={authRoute.path} component={AuthContainer} />
          <Route exact path={errorRoute.path} component={ErrorComponent} />
          <Route exact path="/" component={CategoriesContainer} />
        </Switch>
        <FooterComponent />
      </Fragment>
    );
  }
}

MainComponent.propTypes = {
  initApp: PropTypes.object.isRequired,
  location: PropTypes.object
};


const mapDispatchActionsToProps = dispatch => {
  return {
    initApp: {
      fetchAllCategories: () => dispatch(fetchAllCategories())
    }
  };
};

export default connect(null, mapDispatchActionsToProps)(MainComponent);
