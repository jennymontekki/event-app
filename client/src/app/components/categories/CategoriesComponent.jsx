import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import CategoriesCard from './CategoriesCard';
import withLoader from './../../hocs/withLoader';

class CategoriesComponent extends React.PureComponent {
  constructor(props) {
    super(props);

    this.grid = {
      lg: 4,
      md: { size: 6, offset: 0 },
      sm: { size: 8, offset: 2 }
    };
  }

  render() {
    const { categories } = this.props;

    if (!categories)
      return null;

    const categoriesList = categories.map(category => {
      return (
        <Col key={category.id} lg={this.grid.lg} md={this.grid.md} sm={this.grid.sm} className="col-12 categories-card">
          <CategoriesCard category={category} />
        </Col>
      );
    });

    return (
      <Fragment>
        {categories &&
        <Fragment>
          <h2 className="categories-page-header">Explore events by category</h2>
          <Row>
            {categoriesList}
          </Row>
        </Fragment>
        }
      </Fragment>
    );
  }
}

CategoriesComponent.propTypes = {
  categories: PropTypes.array,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    categories: state.categoriesStore.categories,
    loading: state.categoriesStore.loading
  };
};

export default connect(mapStateToProps, null)(withLoader(CategoriesComponent));
