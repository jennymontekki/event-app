import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Badge, Card, CardImg } from 'reactstrap';
import Icon from 'react-icons-kit';
import { tag } from 'react-icons-kit/fa';
import { eventsCategoryIdRoute } from './../../shared/config';

class CategoriesCard extends React.Component {
  shouldComponentUpdate() { return false; }

  render() {
    const { category } = this.props;
    const categoryUrl = eventsCategoryIdRoute.url.replace(':categoryId', `${category.id}`);
    const categoryLink = `${categoryUrl}/1`;
    const blockName = `${category.key}-card`;

    return (
      <RouterNavLink to={categoryLink}>
        <Card className={blockName}>
          <Badge className="card__badge">
            <Icon icon={tag} className="card__badge-icon" size={12} />
            {category.name}
          </Badge>
          <CardImg top width="100%" src={`/images/${category.key}.png`} alt="category card image" />
        </Card>
      </RouterNavLink>
    );
  }
}

CategoriesCard.propTypes = {
  category: PropTypes.object.isRequired
};

export default CategoriesCard;
