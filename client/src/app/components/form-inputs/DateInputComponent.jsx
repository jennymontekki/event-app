import React from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup,
  Label
} from 'reactstrap';
import DatePicker from 'react-datepicker';
import { dateToString, newDate } from './../../shared/helpers';

class DateInputComponent extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      date: { _d: null }
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  onChangeHandler(e) {
    const { onDateChange } = this.props;

    onDateChange(e._d);
    this.setState({ date: e });
  }

  render() {
    const { defaultValue } = this.props;
    const { date } = this.state;

    return (
      <FormGroup className="form-datepicker">
        <Label for="formDate">Date* :</Label>
        <DatePicker
          className="form-control"
          onChange={this.onChangeHandler}
          name="date"
          id="formDate"
          showTimeSelect
          timeIntervals={15}
          selected={date._d ? date : newDate(defaultValue)}
          value={date._d ? dateToString(date._d) : dateToString(defaultValue)}
          placeholderText="Click to select a date" />
      </FormGroup>
    );
  }
}

DateInputComponent.propTypes = {
  onDateChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.any
};

export default DateInputComponent;
