import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  FormGroup,
  Row,
  Col
} from 'reactstrap';

import { validateSubmit } from './../shared/formValidator';
import withValidation from './../hocs/withValidation';
import withLoader from './../hocs/withLoader';
import Event from './../models/Event';

import TitleInputComponent from './form-inputs/TitleInputComponent';
import CategoryInputComponent from './form-inputs/CategoryInputComponent';
import DescriptionInputComponent from './form-inputs/DescriptionInputComponent';
import DateInputComponent from './form-inputs/DateInputComponent';
import GoogleMapComponent from './google-map/GoogleMapComponent';

class AddEditEventComponent extends React.PureComponent {
  constructor(props) {
    super(props);

    this.eventObj = { ...this.props.eventDefaults };

    this.fieldsToValidate = {
      title: {
        value: this.eventObj.title || null,
        valid: null
      }
    };

    this.state = {
      submit: {
        valid: false,
        color: 'danger'
      }
    };

    this.grid = {
      md: { size: 10, offset: 1 }
    };

    this.onValidChange = this.onValidChange.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onLocationChangeHandler = this.onLocationChangeHandler.bind(this);
    this.onDateChangeHandler = this.onDateChangeHandler.bind(this);
    this.onFormSubmitPreparation = this.onFormSubmitPreparation.bind(this);
    this.isBtnValid = this.isBtnValid.bind(this);

    this.TitleComponent = withValidation(TitleInputComponent, { type: 'title', field: this.fieldsToValidate.title, onValidChange: this.onValidChange });
  }

  onChangeHandler(e) { this.eventObj[e.target.name] = e.target.value; }

  onLocationChangeHandler(location, address) {
    this.eventObj.location = location;
    this.eventObj.address = address;
  }

  onDateChangeHandler(date) { this.eventObj.date = date; }

  onValidChange() {
    const { newValid, newColor } = validateSubmit(this.fieldsToValidate);

    if (newValid !== this.state.submit.valid) {
      this.setState({
        submit: {
          valid: newValid,
          color: newColor
        }
      });
    }
  }

  onFormSubmitPreparation(e) {
    e.preventDefault();
    const { onFormSubmit } = this.props;
    const validFields = {};

    Object.keys(this.fieldsToValidate).forEach(field => validFields[field] = this.fieldsToValidate[field].value);

    const event = new Event({ ...this.eventObj, ...validFields });
    onFormSubmit(event, this.eventObj.id);
  }

  isBtnValid() {
    const { valid } = this.state.submit;
    const response = {
      valid: true,
      color: 'success'
    };

    if ((!valid && !this.eventObj.id) ||
    (!valid && typeof Object.values(this.fieldsToValidate).find(item => item.valid === false) !== 'undefined')) {
      response.valid = false;
      response.color = 'danger';
    }

    return response;
  }

  render() {
    const { TitleComponent } = this;
    const { categories } = this.props;

    const { valid, color } = this.isBtnValid();

    const categoriesList = categories.map(category => <option value={category.id} key={category.id}>{category.name}</option>);

    return (
      <Row>
        <Col md={this.grid.md}>
          <h3 className="add-edit-event-page-header">{this.eventObj.id ? 'Edit' : 'Add'} event</h3>
          <Form className="form-component" onSubmit={this.onFormSubmitPreparation} noValidate>
            <TitleComponent defaultValue={this.eventObj.title} />
            <FormGroup><GoogleMapComponent onLocationChange={this.onLocationChangeHandler} frozen={false} position={this.eventObj.location} address={this.eventObj.address} /></FormGroup>
            <div className="add-edit-event-input-wrapper">
              <div className="add-edit-event__date"><DateInputComponent defaultValue={this.eventObj.date} onDateChange={this.onDateChangeHandler} /></div>
              <div className="add-edit-event__category"><CategoryInputComponent defaultValue={this.eventObj.category.id} categoriesList={categoriesList} onChangeHandler={this.onChangeHandler} /></div>
            </div>
            <DescriptionInputComponent defaultValue={this.eventObj.description} onChangeHandler={this.onChangeHandler} />
            <Button color={color} disabled={!valid} className="col-12">Submit</Button>
          </Form>
        </Col>
      </Row>
    );
  }
}

AddEditEventComponent.propTypes = {
  eventDefaults: PropTypes.object.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired
};

export default withLoader(AddEditEventComponent);
