import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// lalaland
import { loginUser } from '../redux/Action';

class Login extends Component {
  state = {
    name: '',
    email: '',
    isVisible: true,
  }

  componentDidUpdate() {
    const { name, email, isVisible } = this.state;
    const NAME_VALID = 3;

    const validateEmail = () => {
      const caracter = /\S+@\S+\.\S+/;
      return caracter.test(email);
    };

    const validateArray = [
      name.length > NAME_VALID,
      validateEmail(),
    ];

    if (validateArray.every((item) => item === true) && isVisible === true) {
      this.handleDisable(false);
    } else if ((!validateArray.every((item) => item === true))
      && isVisible === false) {
      this.handleDisable(true);
    }
  }

  handleDisable = (value) => {
    this.setState({ isVisible: value });
  }

  handleClick = () => {
    const { dispatch } = this.props;

    dispatch(loginUser(this.state));
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { name, email, isVisible } = this.state;

    return (
      <div>
        <form>
          <label htmlFor="name">
            Player:
            {' '}
            <input
              id="name"
              type="text"
              name="name"
              value={ name }
              data-testid="input-player-name"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email">
            E-mail:
            {' '}
            <input
              id="email"
              type="text"
              name="email"
              value={ email }
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ isVisible }
            onClick={ this.handleClick }
          >
            Play
          </button>
          <button type="button" data-testid="btn-settings">
            <Link to="/settings">Settings</Link>
          </button>
        </form>
      </div>
    );
  }
}

export default connect()(Login);

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
