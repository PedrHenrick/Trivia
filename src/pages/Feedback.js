import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../components/Forms/Button';
import Header from '../components/Header';

import { countdownActionCreator,
  arrIsShuffle,
  addScoreAction,
  correctAnswersAction,
  loginUser,
} from '../redux/Action';

class Feedback extends Component {
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(arrIsShuffle());
    dispatch(countdownActionCreator());
    dispatch(addScoreAction());
    dispatch(loginUser());
    dispatch(correctAnswersAction());
  }

  handleClickRanking = () => {
    const { history: { push } } = this.props;
    push('/ranking');
  }

  handleClickPlayAgain = () => {
    const { history: { push } } = this.props;
    push('/');
  }

  displayMessage = (correctAnswers) => {
    let message;
    const MAX_POINTS = 3;
    if (correctAnswers < MAX_POINTS) {
      message = 'Could be better...';
    } else {
      message = 'Well Done!';
    }
    return message;
  }

  render() {
    const { score, assertions } = this.props;
    const message = this.displayMessage(assertions);

    return (
      <div className="feedback-container">
        <Header />
        <div className="feedback_headings">
          <h2 data-testid="feedback-text">{message}</h2>
          <h3>
            Você acertou
            {' '}
            <span data-testid="feedback-total-question">{assertions}</span>
            {' '}
            Questoes
          </h3>
          <h4>
            Um total de
            {' '}
            <span data-testid="feedback-total-score">{score}</span>
            {' '}
            Pontos
          </h4>
        </div>
        <div className="feedback_controls">
          <Button
            clicked={ this.handleClickRanking }
            btnName="Ranking"
            dataTestId="btn-ranking"
          />
          <Button
            clicked={ this.handleClickPlayAgain }
            btnName="Play Again"
            dataTestId="btn-play-again"
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

Feedback.defaultProps = {
  score: 0,
  assertions: 0,
  history: {},
  dispatch: () => {},
};

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  score: PropTypes.number,
  assertions: PropTypes.number,
  dispatch: PropTypes.func,
};

export default connect(mapStateToProps)(Feedback);
