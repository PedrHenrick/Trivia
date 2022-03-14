import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { arrIsShuffle } from '../redux/Action';

class Random extends Component {
  randomAnswers = (question) => {
    const { correct_answer: correct, incorrect_answers: incorrects } = question;
    const { colorClick, isNotVisible, shuffle, dispatch } = this.props;
    let { randomAnswers } = this.props;
    const VALUE_RANDOM = 0.5;

    const answers = incorrects.map((answer, index) => {
      const dataTestId = `wrong-answer-${index}`;
      return (
        <button
          type="button"
          key={ index }
          data-testid={ dataTestId }
          id={ dataTestId }
          onClick={ colorClick }
          disabled={ isNotVisible }
        >
          {answer}
        </button>
      );
    });

    answers.push(
      <button
        type="button"
        key="correct-answer"
        data-testid="correct-answer"
        id="correct-answer"
        onClick={ colorClick }
        disabled={ isNotVisible }
      >
        {correct}
      </button>,
    );

    // Referência: https://flaviocopes.com/how-to-shuffle-array-javascript/
    if (shuffle === false) {
      randomAnswers = answers.sort(() => Math.random() - VALUE_RANDOM);
      dispatch(arrIsShuffle(true, randomAnswers));
    }

    return randomAnswers;
  }

  render() {
    const { question } = this.props;
    return (
      <div
        data-testid="answer-options"
        className="answer-options"
      >
        { this.randomAnswers(question) }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  shuffle: state.card.isShuffle,
  randomAnswers: state.card.randomAnswers,
  isNotVisible: state.timer.isNotVisible,
});

export default connect(mapStateToProps)(Random);

Random.defaultProps = {
  question: {},
  colorClick: () => {},
  shuffle: false,
  randomAnswers: [],
};

Random.propTypes = {
  question: PropTypes.objectOf(PropTypes.any),
  colorClick: PropTypes.func,
  dispatch: PropTypes.func.isRequired,
  isNotVisible: PropTypes.bool.isRequired,
  shuffle: PropTypes.bool,
  randomAnswers: PropTypes.arrayOf(PropTypes.any),
};
