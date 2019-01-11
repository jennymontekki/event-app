import React from 'react';
import { validators } from './../shared/formValidator';

export default function (ComposedComponent, config) {
  class withValidation extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        valid: null,
        msg: ''
      };

      this.field = config.field;
      this.onValidChange = config.onValidChange;
      this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    onChangeHandler(e) {
      const { value } = e.target;
      const { valid, msg } = this.state;

      const { newValid, newMsg } = validators[config.type](value, msg);

      this.field.value = value;
      this.field.valid = newValid;

      if (newValid !== valid || newMsg !== msg) {
        this.setState({
          valid: newValid,
          msg: newMsg
        });
      }

      if (newValid !== valid)
        this.onValidChange();
    }

    render() {
      return <ComposedComponent onChangeHandler={this.onChangeHandler} isValid={this.state.valid} msg={this.state.msg} {...this.props} />;
    }
  }

  return withValidation;
}
