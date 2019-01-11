import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  Label,
  Row,
  Col
} from 'reactstrap';
import Icon from 'react-icons-kit';
import { signIn, userPlus } from 'react-icons-kit/fa';
import { validateSubmit } from './../shared/formValidator';
import withValidation from './../hocs/withValidation';
import withLoader from './../hocs/withLoader';

import NameInputComponent from './form-inputs/NameInputComponent';
import EmailInputComponent from './form-inputs/EmailInputComponent';
import PasswordInputComponent from './form-inputs/PasswordInputComponent';

class SignUpComponent extends React.PureComponent {
  constructor(props) {
    super(props);

    this.userObj = {};

    this.fieldsToValidate = {
      name: {
        value: null,
        valid: null
      },
      email: {
        value: null,
        valid: null
      },
      password: {
        value: null,
        valid: null
      }
    };

    this.state = {
      submit: {
        valid: false,
        color: 'danger'
      },
      defaultValues: {
        password: this.props.authData.authCreds.password,
        email: this.props.authData.authCreds.email,
        name: this.props.authData.authCreds.name
      }
    };

    this.grid = {
      lg: { size: 6, offset: 3 },
      md: { size: 8, offset: 2 },
      sm: { size: 10, offset: 1 }
    };

    this.onValidChange = this.onValidChange.bind(this);
    this.onFormSubmitPreparation = this.onFormSubmitPreparation.bind(this);
    this.onChangeAthTypeToSignIn = this.onChangeActiveAuthType('signIn');

    this.NameComponent = withValidation(NameInputComponent, { type: 'name', field: this.fieldsToValidate.name, onValidChange: this.onValidChange });
    this.EmailComponent = withValidation(EmailInputComponent, { type: 'email', field: this.fieldsToValidate.email, onValidChange: this.onValidChange });
    this.PasswordComponent = withValidation(PasswordInputComponent, { type: 'password', field: this.fieldsToValidate.password, onValidChange: this.onValidChange });
  }

  onFormSubmitPreparation(e) {
    e.preventDefault();
    const { onFormSubmit } = this.props;
    const validFields = {};

    Object.keys(this.fieldsToValidate).forEach(field => validFields[field] = this.fieldsToValidate[field].value);

    onFormSubmit({ ...this.userObj, ...validFields });
  }

  onChangeActiveAuthType(nextActiveAuthType) {
    const { onChangeActiveAuthType } = this.props;

    return e => {
      e.preventDefault();
      onChangeActiveAuthType(nextActiveAuthType);
    };
  }

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

  render() {
    const { NameComponent, EmailComponent, PasswordComponent } = this;
    const { name, email, password } = this.state.defaultValues;
    return (
      <Row>
        <Col lg={this.grid.lg} md={this.grid.md} sm={this.grid.sm}>
          <h4 className="auth-page-header">Sign UP</h4>
          <Form className="form-component" onSubmit={this.onFormSubmitPreparation} noValidate>
            <NameComponent defaultValue={name} />
            <EmailComponent defaultValue={email} />
            <PasswordComponent defaultValue={password} />
            <Button
              color={this.state.submit.color}
              disabled={!this.state.submit.valid}
              className="form-submit-btn auth-change-btn col-12">
              <Icon icon={userPlus} className="auth-btn__icon" size={24} />
              Submit
            </Button>
            <div className="change-auth-area">
              <Label for="signUpToSignIn">Have got an account already?</Label>
              <Button
                type="button"
                outline
                id="signUpToSignIn"
                color="primary"
                className="auth-change-btn col-12 col-sm-4"
                onClick={this.onChangeAthTypeToSignIn}>
                <Icon icon={signIn} className="auth-btn__icon" size={24} />
                Sign In
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    );
  }
}

SignUpComponent.propTypes = {
  authData: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  onChangeActiveAuthType: PropTypes.func.isRequired
};

export default withLoader(SignUpComponent);
