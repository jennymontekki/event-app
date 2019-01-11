import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import * as categoriesActions from './categoriesActions';
import './categories.css';

import CategoriesComponent from './../../components/categories/CategoriesComponent';

class CategoriesContainer extends React.PureComponent {
  componentDidMount() {
    const { fetchAllCategories } = this.props.actions;

    fetchAllCategories();
  }

  render() {
    return (
      <Container className="categories-page">
        <CategoriesComponent />
      </Container>
    );
  }
}

CategoriesContainer.propTypes = {
  actions: PropTypes.object.isRequired
};

const mapDispatchActionsToProps = dispatch => {
  return {
    actions: bindActionCreators(categoriesActions, dispatch)
  };
};

export default connect(null, mapDispatchActionsToProps)(CategoriesContainer);
