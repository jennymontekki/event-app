import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Card,
  CardBody,
  Badge
} from 'reactstrap';
import { eventDetailsRoute } from './../../shared/config';
import { dateToString } from './../../shared/helpers';

class ProfileMessageComponent extends React.Component {
  constructor(props) {
    super(props);

    this.delete = this.delete.bind(this);
  }

  shouldComponentUpdate() { return false; }

  delete() {
    const { message, onDelete } = this.props;

    onDelete(message.id);
  }

  render() {
    const { message } = this.props;
    const messageLink = `${eventDetailsRoute.url}/${message.event.id}`;

    return (
      <Card className="profile-message__container-outer" onClick={this.delete}>
        <RouterNavLink to={messageLink} className="profile-message__link">
          <CardBody className="profile-message__container-inner">
            <Badge color="info" className="profile-message__badge">{message.type}</Badge>
            <div className="profile-message__item">{message.event.title}</div>
            <div className="profile-message__date">{dateToString(message.updatedAt)}</div>
          </CardBody>
        </RouterNavLink>
        <div className="profile-message__delete-btn">X</div>
      </Card>
    );
  }
}

ProfileMessageComponent.propTypes = {
  message: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default ProfileMessageComponent;
