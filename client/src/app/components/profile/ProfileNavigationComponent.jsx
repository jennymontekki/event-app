import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link as RouterNavLink } from 'react-router-dom';
import {
  Nav,
  NavItem,
  NavLink,
  Badge
} from 'reactstrap';
import Icon from 'react-icons-kit';
import { arrowCircleRight, arrowCircleLeft, envelope } from 'react-icons-kit/fa';
import { profileNavigationRoutes, profileMessagesRoute } from './../../shared/config';
import { cloneObject } from './../../shared/helpers';

const navs = Object.values(cloneObject(profileNavigationRoutes)).map(item => ({ ...item, url: `${item.url}/1` }));

class ProfileNavigationComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { openMenu: false, activeLink: this.props.activeTabUrl || '' };

    this.initComponent = this.initComponent.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.renderPrep = this.renderPrep.bind(this);
  }

  componentDidMount() { this.initComponent(this.props.activeTabUrl); }

  componentDidUpdate(prevProps) { if (this.props.activeTabUrl !== prevProps.activeTabUrl) this.initComponent(this.props.activeTabUrl); }

  initComponent(activeLink) { this.setState({ activeLink }); }

  toggleMenu() { this.setState({ openMenu: !this.state.openMenu }); }

  renderPrep() {
    const { messagesCount } = this.props;
    const { activeLink } = this.state;

    const navItems = navs.map(item => {
      const style = activeLink.includes(item.urlForActiveLink) ? 'profile-navigation__active-item' : '';
      if (item.path === profileMessagesRoute.path) {
        return (
          <NavItem
            className={`profile-navigation__messages-tab profile-navigation__item ${style}`}
            key={item.path}>
            <NavLink
              to={item.url}
              className="profile-navigation__link"
              tag={RouterNavLink}>
              {item.name}
              {messagesCount > 0 &&
              <div className="profile-navigation__new-msg">
                <Icon icon={envelope} className="profile-navigation__icon" size={24} />
                <Badge color="info">+{messagesCount}</Badge>
              </div>
              }
            </NavLink>
          </NavItem>
        );
      }

      return (
        <NavItem
          key={item.path}
          className={`profile-navigation__item ${style}`}>
          <NavLink
            to={item.url}
            className="profile-navigation__link"
            tag={RouterNavLink}>
            {item.name}
          </NavLink>
        </NavItem>
      );
    });

    return { navItems };
  }

  render() {
    const { navItems } = this.renderPrep();
    const { openMenu } = this.state;
    const style = this.state.openMenu ? 'profile-navigation__expanded' : '';
    return (
      <div>
        <Nav tabs className="profile-navigation__desktop-menu flex-column">{navItems}</Nav>
        <div className={`profile-navigation__mobile-menu ${style}`}>
          <Nav tabs className="flex-column">{navItems}</Nav>
          <div role="button" className="profile-mobile-menu__expand-btn" onClick={this.toggleMenu} />
          {!openMenu &&
          <Icon icon={arrowCircleRight} className="profile-mobile-menu__icon" size={40} onClick={this.toggleMenu} />
          }
          {openMenu &&
          <Icon icon={arrowCircleLeft} className="profile-mobile-menu__icon" size={40} onClick={this.toggleMenu} />
          }
        </div>
      </div>
    );
  }
}

ProfileNavigationComponent.propTypes = {
  activeTabUrl: PropTypes.string.isRequired,
  messagesCount: PropTypes.number.isRequired
};

const mapStateToProps = state => {
  return {
    messagesCount: state.profileStore.messagesCount
  };
};

export default connect(mapStateToProps, null)(ProfileNavigationComponent);
