import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink as RouterNavLink } from 'react-router-dom';
import {
  Badge,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button
} from 'reactstrap';
import Icon from 'react-icons-kit';
import { newspaperO, plusCircle, signIn as signInIcon, user as userIcon, signOut as signOutIcon } from 'react-icons-kit/fa';
import { home3 } from 'react-icons-kit/icomoon';
import { signOut, changeNotificationStatus } from './../../containers/auth/authActions';
import { headerNavigationRoutes } from './../../shared/config';
import { cloneObject } from './../../shared/helpers';
import AlertComponent from './../alert/AlertComponent';
import { NavigationApi } from './../../shared/apiService';
import WebStorageService from './../../shared/webStorageService';
import './navigation.css';

class NavigationComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.alertMessage = 'Subscribed event was changed. Please check your email for additional information!';

    this.alwaysRendered = cloneObject(headerNavigationRoutes.alwaysRendered);
    this.conditionallyRendered = cloneObject(headerNavigationRoutes.conditionallyRendered);

    this.toggleAlert = this.toggleAlert.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.activeLinkChange = this.activeLinkChange.bind(this);

    this.mapIconsToNavs = {
      [this.alwaysRendered.eventsRoute.path]: newspaperO,
      [this.alwaysRendered.addEventRoute.path]: plusCircle,
      [this.conditionallyRendered.authRoute.path]: signInIcon,
      [this.conditionallyRendered.profileRoute.path]: userIcon
    };

    this.state = {
      isOpenAlert: false,
      isOpenMenu: false,
      activeLink: this.props.activeRouteUrl || ''
    };
  }

  componentDidMount() { this.initComponent(this.props.activeRouteUrl); }

  componentDidUpdate(prevProps) { if (this.props.activeRouteUrl !== prevProps.activeRouteUrl) this.initComponent(this.props.activeRouteUrl); }

  initComponent(activeLink) { this.setState({ activeLink }); }

  toggleAlert() {
    const { notificationStatus, changeNotificationStatus } = this.props;
    const { isOpenAlert } = this.state;

    if (isOpenAlert && notificationStatus) {
      NavigationApi.confirmNotification()
        .then(() => {
          WebStorageService.setEventsChanges(null);
          changeNotificationStatus(null);
        })
        .catch(err => console.log(err));
    }

    this.setState({ isOpenAlert: !isOpenAlert });
  }

  toggleMenu() { this.setState({ isOpenMenu: !this.state.isOpenMenu }); }

  activeLinkChange(e) {
    const { url } = e.target.dataset;
    if (url)
      this.setState({ activeLink: url });
    this.setState({ activeLink: e.target.closest('.navigation__link-wrapper').dataset.url });
  }

  render() {
    const { authStatus, signOut, notificationStatus } = this.props;
    const { isOpenAlert, isOpenMenu, activeLink } = this.state;
    const navItems = [];

    this.alwaysRendered.eventsRoute.url = `${headerNavigationRoutes.alwaysRendered.eventsRoute.url}/1`;
    this.conditionallyRendered.profileRoute.url = `${headerNavigationRoutes.conditionallyRendered.profileRoute.url}/1`;

    Object.values(this.alwaysRendered).map(item => navItems.push(item));

    if (!authStatus)
      navItems.push(this.conditionallyRendered.authRoute);

    if (authStatus)
      navItems.push(this.conditionallyRendered.profileRoute);

    const navList = navItems.map(navItem => {
      let style = 'navigation__link-item ';
      if (activeLink.includes(navItem.urlForActiveLink))
        style += 'navigation__active-link';

      return (
        <NavItem
          data-url={navItem.urlForActiveLink}
          key={navItem.name}
          className="navigation__link-wrapper"
          onClick={this.activeLinkChange}>
          <NavLink
            to={navItem.url}
            className={style}
            activeClassName="active-nav-link"
            tag={RouterNavLink}>
            <Icon icon={this.mapIconsToNavs[navItem.path]} className="navigation__link-icon" size={24} />
            {navItem.name}
          </NavLink>
        </NavItem>
      );
    });

    return (
      <Fragment>
        {isOpenAlert &&
          <AlertComponent onClickAlert={this.toggleAlert} message={this.alertMessage} />
        }
        <Navbar className="navbar-dark bg-dark" expand="md">
          <NavbarBrand href="/" className="navigation__link-item">
            <Icon icon={home3} className="navigation__link-icon" size={24} />
            EventsApp
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleMenu} />
          <Collapse isOpen={isOpenMenu} navbar>
            <Nav className="ml-auto" navbar>
              {navList}
              {authStatus &&
              <Fragment>
                {notificationStatus &&
                  <Badge className="navigation__badge-outer" onClick={this.toggleAlert}>
                    Notifications
                    <Badge className="navigation__badge-inner">+</Badge>
                  </Badge>
                }
                <Button className="navigation__link-item" onClick={signOut}>
                  <Icon icon={signOutIcon} className="navigation__link-icon" size={24} />
                  Log Out
                </Button>
              </Fragment>
              }
            </Nav>
          </Collapse>
        </Navbar>
      </Fragment>
    );
  }
}

NavigationComponent.propTypes = {
  authStatus: PropTypes.bool.isRequired,
  notificationStatus: PropTypes.bool,
  activeRouteUrl: PropTypes.string.isRequired,
  signOut: PropTypes.func.isRequired,
  changeNotificationStatus: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    authStatus: state.authStore.authStatus,
    notificationStatus: state.authStore.notificationStatus
  };
};

const mapDispatchActionsToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut()),
    changeNotificationStatus: status => dispatch(changeNotificationStatus(status))
  };
};

export default connect(mapStateToProps, mapDispatchActionsToProps)(NavigationComponent);
