import React from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup,
  FormFeedback,
  Label,
  Input
} from 'reactstrap';
import Icon from 'react-icons-kit';
import { envelope } from 'react-icons-kit/fa';

const EmailInputComponent = ({ defaultValue, isValid, msg, onChangeHandler }) => {
  return (
    <FormGroup>
      <div className="auth__form-input-header">
        <Icon icon={envelope} className="auth__form-input-icon" size={20} />
        <Label for="userEmail">Email* :</Label>
      </div>
      <Input
        type="email"
        name="email"
        id="userEmail"
        placeholder="your email"
        onChange={onChangeHandler}
        invalid={isValid === false}
        valid={isValid}
        defaultValue={defaultValue} />
      <FormFeedback>{msg}</FormFeedback>
    </FormGroup>
  );
};

EmailInputComponent.propTypes = {
  defaultValue: PropTypes.string,
  isValid: PropTypes.bool,
  msg: PropTypes.string,
  onChangeHandler: PropTypes.func.isRequired
};

export default EmailInputComponent;
