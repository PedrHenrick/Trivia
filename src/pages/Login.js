import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// lalaland
import '../css/login.css';
import logo from '../trivia.png';
import { fetchToken, fetchQuestions } from '../services/api';

import { countdownActionCreator,
  arrIsShuffle,
  addScoreAction,
  fetchTokenThunk,
  correctAnswersAction,
  loginUser,
} from '../redux/Action';

class Login extends Component {
  state = {
    name: '',
    email: '',
    isVisible: true,
    loaded: false,
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(arrIsShuffle());
    dispatch(countdownActionCreator());
    dispatch(addScoreAction());
    dispatch(loginUser());
    dispatch(correctAnswersAction());
    dispatch(fetchTokenThunk());
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
    const { history: { push } } = this.props;

    return (
      <div className="divLogin">
        <form className="formLogin">
          <img
            className="logoTriviaLogin"
            src={ logo }
            alt="logo trivia"
          />
          <label className="name__label" htmlFor="name">
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
          <label className="email__label" htmlFor="email">
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
          <nav className="buttonNav">
            <button
              type="button"
              data-testid="btn-play"
              disabled={ isVisible }
              className="btn__login buttonPlay"
              onClick={ this.handleClick }
            >
              Play
            </button>
            <button
              type="button"
              data-testid="btn-settings"
              className="btn__login buttonSettings"
              onClick={ () => push('/settings') }
            >
              Settings
            </button>
          </nav>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.player,
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
