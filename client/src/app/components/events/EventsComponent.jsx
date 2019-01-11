import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import EventsCard from './EventsCard';
import withLoader from './../../hocs/withLoader';

class EventsComponent extends React.PureComponent {
  constructor(props) {
    super(props);

    this.grid = {
      lg: 4,
      md: { size: 6, offset: 0 },
      sm: { size: 8, offset: 2 }
    };
  }

  render() {
    const { events, onEdit, onDelete, onUnsubscribe } = this.props;
    let eventsList = <div className="events-not-found">events not found</div>;

    if (events && events.length > 0) {
      eventsList = events.map(event => {
        return (
          <Col key={event.id} lg={this.grid.lg} md={this.grid.md} sm={this.grid.sm} className="col-12 events-card">
            <EventsCard event={event} onEdit={onEdit} onDelete={onDelete} onUnsubscribe={onUnsubscribe} />
          </Col>
        );
      });
    }

    return <Row>{eventsList}</Row>;
  }
}

EventsComponent.propTypes = {
  events: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onUnsubscribe: PropTypes.func
};

const mapStateToProps = state => {
  return {
    events: state.eventsStore.events,
    loading: state.eventsStore.loading
  };
};

export default connect(mapStateToProps, null)(withLoader(EventsComponent));
