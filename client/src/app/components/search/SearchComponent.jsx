import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Input, ListGroup, ListGroupItem, Row, Col } from 'reactstrap';
import Icon from 'react-icons-kit';
import {search} from 'react-icons-kit/icomoon';
import './search.css';

class SearchComponent extends React.PureComponent {
  constructor(props) {
    super(props);

    this.timeout = null;
    this.debounce = this.debounce.bind(this);

    this.grid = {
      lg: { size: 6, offset: 3 },
      sm: { size: 8, offset: 2 }
    };
  }

  debounce(callback, delay) {
    return (e) => {
      const { value } = e.target;
      clearTimeout(this.timeout);
      if (value.length > 0)
        this.timeout = setTimeout(() => callback(value), delay);
    };
  }

  render() {
    const { onChangeHandler, items, url } = this.props;
    let itemsList = null;
    if (items) {
      itemsList = items.map(item => {
        return (
          <ListGroupItem className="search__item" key={item.id} >
            <Link to={`${url}/${item.id}`}>{item.title}</Link>
          </ListGroupItem>
        );
      });
    }

    return (
      <Row>
        <Col sm={this.grid.sm} lg={this.grid.lg} className="search__container">
          <Icon icon={search} className="search__input-icon" size={24} />
          <Input
            type="text"
            className="search__input"
            name="search"
            placeholder="Search ..."
            onChange={this.debounce(onChangeHandler, 1000)} />
          <ListGroup className="search__list">
            {items !== null && items.length > 0 &&
              itemsList
            }
            {items !== null && items.length === 0 &&
              <li className="search__item list-group-item search__no-items">no matches</li>
            }
          </ListGroup>
        </Col>
      </Row>
    );
  }
}

SearchComponent.propTypes = {
  items: PropTypes.array,
  onChangeHandler: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired
};


export default SearchComponent;
