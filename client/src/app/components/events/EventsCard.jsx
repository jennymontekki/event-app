import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Badge,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardFooter,
  Button,
  CardText
} from 'reactstrap';
import Icon from 'react-icons-kit';
import { tag, user, trash, pencil, remove } from 'react-icons-kit/fa';
import { ic_place, ic_access_alarm } from 'react-icons-kit/md';
import { eventDetailsRoute } from './../../shared/config';
import { dateToString } from './../../shared/helpers';

class EventsCard extends React.Component {
  constructor(props) {
    super(props);

    this.onEditPrep = this.onEditPrep.bind(this);
    this.onDeletePrep = this.onDeletePrep.bind(this);
    this.onUnsubscribePrep = this.onUnsubscribePrep.bind(this);
  }

  shouldComponentUpdate() { return false; }

  onEditPrep() {
    const { onEdit, event } = this.props;
    onEdit(event.id);
  }

  onDeletePrep() {
    const { onDelete, event } = this.props;
    onDelete(event.id);
  }

  onUnsubscribePrep() {
    const { onUnsubscribe, event } = this.props;
    onUnsubscribe(event.id);
  }

  render() {
    const { event, onEdit, onDelete, onUnsubscribe } = this.props;
    const eventLink = `${eventDetailsRoute.url}/${event.id}`;
    const blockName = `${event.category.key}-card`;
    const shouldShowControls = onUnsubscribe || (onEdit && onDelete);

    return (
      <Card className={blockName}>
        <RouterNavLink to={eventLink}>
          <Badge className="card__badge">
            <Icon icon={tag} className="card__badge-icon" size={12} />
            {event.category.name}
          </Badge>
          
        </RouterNavLink>
        <RouterNavLink to={eventLink}>
          <CardImg top width="100%" src={`/images/${event.category.key}.png`} alt="event card image" />
        </RouterNavLink>
        <CardBody>
          <RouterNavLink to={eventLink}>
            <CardTitle className="text-center">{event.title}</CardTitle>
            <div className="events-card__item-group">
              <Icon icon={ic_access_alarm} className="events-card__icon" size={24} />
              <CardText className="text-muted font-italic">{dateToString(event.date)}</CardText>
            </div>
            <div className="events-card__item-group">
              <Icon icon={ic_place} className="events-card__icon" size={24} />
              <CardText className="text-muted font-italic">{event.address}</CardText>
            </div>
            <div className="events-card__item-group">
              <Icon icon={user} className="events-card__icon" size={24} />
              <CardText className="text-muted font-italic">{event.user.name}</CardText>
            </div>
          </RouterNavLink>
        </CardBody>
        {shouldShowControls &&
        <CardFooter>
          {onEdit && onDelete &&
          <div className="events-card__host-controls">
            <Button color="warning" onClick={this.onEditPrep}>
              <Icon icon={pencil} className="profile-card-controls__icon" size={24} />
              Edit
            </Button>
            <Button color="danger" onClick={this.onDeletePrep}>
              <Icon icon={trash} className="profile-card-controls__icon" size={24} />
              Delete
            </Button>
          </div>
          }
          {onUnsubscribe &&
            <div className="events-card__visitor-controls">
              <Button color="primary" onClick={this.onUnsubscribePrep}>
                <Icon icon={remove} className="profile-card-controls__icon" size={24} />
                Unsubscribe
              </Button>
            </div>
          }
        </CardFooter>
        }
      </Card>
    );
  }
}

EventsCard.propTypes = {
  event: PropTypes.object.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onUnsubscribe: PropTypes.func,
};

export default EventsCard;
