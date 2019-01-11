import React from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup,
  FormFeedback,
  Label,
  Input
} from 'reactstrap';

const TitleInputComponent = ({ defaultValue, isValid, msg, onChangeHandler }) => {
  return (
    <FormGroup>
      <Label for="eventTitle">Title* :</Label>
      <Input
        type="text"
        name="title"
        id="eventTitle"
        placeholder="event title"
        onChange={onChangeHandler}
        invalid={isValid === false}
        valid={isValid}
        defaultValue={defaultValue} />
      <FormFeedback>{msg}</FormFeedback>
    </FormGroup>
  );
};

TitleInputComponent.propTypes = {
  defaultValue: PropTypes.string,
  isValid: PropTypes.bool,
  msg: PropTypes.string,
  onChangeHandler: PropTypes.func.isRequired
};

export default TitleInputComponent;
