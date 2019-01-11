import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import * as profileActions from './../profileActions';
import { messagesPerPage } from './../../../shared/config';

import ProfileMessagesComponent from './../../../components/profile/ProfileMessagesComponent';
import PaginationComponent from './../../../components/PaginationComponent';

class ProfileMessagesContainer extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onDeleteMessagehandler = this.onDeleteMessagehandler.bind(this);
  }

  componentDidMount() {
    const { routeMatch } = this.props;

    this.initComponent(routeMatch);
  }

  componentWillUpdate(nextProps) {
    const { rooms, routeMatch } = this.props;

    if ((rooms !== nextProps.rooms) || (routeMatch.url !== nextProps.routeMatch.url))
      this.initComponent(nextProps.routeMatch);
  }

  onDeleteMessagehandler(messageId) {
    const { deleteMessage } = this.props.actions;

    deleteMessage(messageId);
  }

  initComponent(routeMatch) { this.props.actions.fetchMessages(routeMatch.params.pageNum); }

  render() {
    const { routeMatch, messagesCount } = this.props;

    return (
      <Container>
        <ProfileMessagesComponent onDeleteHandler={this.onDeleteMessagehandler} />
        {messagesCount > messagesPerPage &&
        <Row>
          <Col className="col-12">
            <PaginationComponent itemsCount={messagesCount} itemsPerPage={messagesPerPage} url={routeMatch.url} />
          </Col>
        </Row>
        }
      </Container>
    );
  }
}

ProfileMessagesContainer.propTypes = {
  messagesCount: PropTypes.number.isRequired,
  rooms: PropTypes.array,
  actions: PropTypes.object.isRequired,
  routeMatch: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
  return {
    messagesCount: state.profileStore.messagesCount,
    rooms: state.profileStore.rooms,
    routeMatch: ownProps.match
  };
};

const mapDispatchActionsToProps = dispatch => {
  return {
    actions: bindActionCreators(profileActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchActionsToProps)(ProfileMessagesContainer);
