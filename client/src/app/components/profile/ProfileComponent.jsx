import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import withAuthGuard from './../../hocs/withAuthGuard';
import { myEventsRoute, subscribedEventsRoute, profileMessagesRoute } from './../../shared/config';
import './profile.css';

import ProfileNavigationComponent from './ProfileNavigationComponent';
import MyAndSubEventsContainer from './../../containers/profile/my-and-sub-events/MyAndSubEventsContainer';
import ProfileMessagesContainer from './../../containers/profile/profile-messages/ProfileMessagesContainer';

function ProfileComponent({ location }) {
  return (
    <div className="profile__page">
      <ProfileNavigationComponent activeTabUrl={location.pathname} />
      <Switch>
        <Route exact path={myEventsRoute.path} component={MyAndSubEventsContainer} />
        <Route exact path={subscribedEventsRoute.path} component={MyAndSubEventsContainer} />
        <Route exact path={profileMessagesRoute.path} component={ProfileMessagesContainer} />
      </Switch>
    </div>
  );
}

ProfileComponent.propTypes = {
  location: PropTypes.object.isRequired,
};

export default withAuthGuard(ProfileComponent);
