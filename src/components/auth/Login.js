import React, { Component, Fragment } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import { getItems } from '../../actions/articleActions';
class Login extends Component {
  state = {
    modal: false,
    username: '',
    password: '',
    msg: null
  };

  componentDidUpdate(prevProps) {
    const { error, isAuth } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === 'LOGIN_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    // If authenticated, close modal
    if (this.state.modal) {
      if (isAuth) {
        this.toggle();
      }
    }
  }

  toggle = () => {
    // Clear errors
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { username, password } = this.state;

    const newUser = {
      username,
      password
    };

    // Attempt to register
    this.props.login(newUser);
  };

  render() {
    return (
      <Fragment>
        <NavLink onClick={this.toggle} href='#'>
          Login
        </NavLink>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Login</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color='danger'>{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='username'>Username</Label>
                <Input
                  type='text'
                  name='username'
                  id='username'
                  placeholder='Username'
                  className='mb-3'
                  onChange={this.onChange}
                />

                <Label for='password'>Password</Label>
                <Input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='Password'
                  className='mb-3'
                  onChange={this.onChange}
                />
                <Button color='dark' style={{ marginTop: '2rem' }} block>
                  Login
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth,
  error: state.error
});

export default connect(
  mapStateToProps,
  { login, clearErrors, getItems }
)(Login);