import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// lalaland
import { fetchTokenThunk, loginUser } from '../redux/Action';
import { fetchToken, fetchQuestions } from '../services/api';

class Login extends Component {
  state = {
    name: '',
    email: '',
    isVisible: true,
    loaded: false,
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

  handleClick = async () => {
    const { dispatch, history: { push } } = this.props;
    const response = await fetchToken();
    await dispatch(fetchTokenThunk(response.token));

    const { token } = this.props;

    if (token) {
      const questions = await fetchQuestions(token);
      const SUCESS_CODE = 0;

      if (questions.response_code === SUCESS_CODE) {
        dispatch(loginUser(this.state));
        push('/game');
      } else {
        const newToken = await fetchToken();
        localStorage.setItem('token', newToken.token);

        dispatch(loginUser(this.state));
        await dispatch(fetchTokenThunk(newToken.token));
        push('/game');
      }
    } else {
      localStorage.setItem('token', response.token);

      dispatch(loginUser(this.state));
      push('/game');
    }
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
const mapStateToProps = (state) => ({
  user: state.user,
  token: state.token,
});

export default connect(mapStateToProps)(Login);

Login.defaultProps = {
  history: {},
  token: '',
};

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  token: PropTypes.string,
};
