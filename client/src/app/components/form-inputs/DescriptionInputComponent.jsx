import React from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup,
  Label,
  Input
} from 'reactstrap';

const DescriptionInputComponent = ({ defaultValue, onChangeHandler }) => {
  return (
    <FormGroup>
      <Label for="eventDescription">Description:</Label>
      <Input
        className="add-edit-event-description"
        type="textarea"
        name="description"
        id="eventDescription"
        defaultValue={defaultValue}
        onChange={onChangeHandler} />
    </FormGroup>
  );
};

DescriptionInputComponent.propTypes = {
  defaultValue: PropTypes.string,
  onChangeHandler: PropTypes.func.isRequired
};

export default DescriptionInputComponent;
