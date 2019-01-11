import React from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup,
  FormFeedback,
  Label,
  Input
} from 'reactstrap';
import Icon from 'react-icons-kit';
import { user } from 'react-icons-kit/fa';

const NameInputComponent = ({ defaultValue, isValid, msg, onChangeHandler }) => {
  return (
    <FormGroup>
      <div className="auth__form-input-header">
        <Icon icon={user} className="auth__form-input-icon" size={24} />
        <Label for="userName">Name* :</Label>
      </div>
      <Input
        type="text"
        name="name"
        id="userName"
        placeholder="your name"
        onChange={onChangeHandler}
        invalid={isValid === false}
        valid={isValid}
        defaultValue={defaultValue} />
      <FormFeedback>{msg}</FormFeedback>
    </FormGroup>
  );
};

NameInputComponent.propTypes = {
  defaultValue: PropTypes.string,
  isValid: PropTypes.bool,
  msg: PropTypes.string,
  onChangeHandler: PropTypes.func.isRequired
};

export default NameInputComponent;
