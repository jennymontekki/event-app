import React from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup,
  FormFeedback,
  Label,
  Input
} from 'reactstrap';
import Icon from 'react-icons-kit';
import { lock } from 'react-icons-kit/fa';

const PasswordInputComponent = ({ defaultValue, isValid, msg, onChangeHandler }) => {
  return (
    <FormGroup>
      <div className="auth__form-input-header">
        <Icon icon={lock} className="auth__form-input-icon" size={24} />
        <Label for="userPassword">Password* :</Label>
      </div>
      <Input
        type="password"
        name="password"
        id="userPassword"
        placeholder="your password"
        onChange={onChangeHandler}
        invalid={isValid === false}
        valid={isValid}
        defaultValue={defaultValue} />
      <FormFeedback>{msg}</FormFeedback>
    </FormGroup>
  );
};

PasswordInputComponent.propTypes = {
  defaultValue: PropTypes.string,
  isValid: PropTypes.bool,
  msg: PropTypes.string,
  onChangeHandler: PropTypes.func.isRequired
};

export default PasswordInputComponent;
