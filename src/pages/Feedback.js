import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../components/Forms/Button';
import Header from '../components/Header';

class Feedback extends Component {
  handleClickRanking = () => {}

  handleClickPlayAgain = () => {}

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
          <h2 data-testid="feedback-text">{ message }</h2>
          <h3>
            Você acertou
            {' '}
            <span data-testid="feedback-total-question">{ assertions }</span>
            {' '}
            Questoes
          </h3>
          <h4>
            Um total de
            {' '}
            <span data-testid="feedback-total-score">{ score }</span>
            {' '}
            Pontos
          </h4>
        </div>
        <div className="feedback_controls">
          <Button clicked={ this.handleClickRanking } btnName="Ranking" />
          <Button clicked={ this.handleClickPlayAgain } btnName="Play Again" />
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
};

Feedback.propTypes = {
  score: PropTypes.number,
  assertions: PropTypes.number,
};

export default connect(mapStateToProps)(Feedback);
