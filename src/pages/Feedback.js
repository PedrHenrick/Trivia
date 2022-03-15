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
    const { score, correctAnswers } = this.props;
    const message = this.displayMessage(correctAnswers);

    return (
      <div className="feedback-container">
        <Header />
        <div className="feedback_headings">
          <h2 data-testid="feedback-text">{ message }</h2>
          <h3>
            <span>
              Você acertou
              {' '}
              { correctAnswers }
              {' '}
              Questoes
            </span>
            <span>
              Um total de
              {' '}
              { score }
              {' '}
              Pontos
            </span>
          </h3>
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
  correctAnswers: state.player.correctAnswers,
});

Feedback.defaultProps = {
  score: 0,
  correctAnswers: 0,
};

Feedback.propTypes = {
  score: PropTypes.number,
  correctAnswers: PropTypes.number,
};

export default connect(mapStateToProps)(Feedback);
