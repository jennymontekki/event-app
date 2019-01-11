import React from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup,
  Label,
  Input
} from 'reactstrap';

const CategoryInputComponent = ({ defaultValue, categoriesList, onChangeHandler }) => {
  return (
    <FormGroup>
      <Label for="selectCategory">Category* :</Label>
      <Input
        type="select"
        name="categoryId"
        id="selectCategory"
        onChange={onChangeHandler}
        defaultValue={defaultValue}>
        {categoriesList}
      </Input>
    </FormGroup>
  );
};

CategoryInputComponent.propTypes = {
  defaultValue: PropTypes.number,
  categoriesList: PropTypes.array.isRequired,
  onChangeHandler: PropTypes.func.isRequired
};

export default CategoryInputComponent;
