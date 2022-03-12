import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Random extends Component {
  randomAnswers = (question) => {
    const { correct_answer: correct, incorrect_answers: incorrects } = question;
    const { colorClick, answered, isNotVisible } = this.props;

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
          className={ `answer-btn ${answered ? 'invalid' : ''}` }
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
        className={ `answer-btn ${answered ? 'correct' : ''}` }
      >
        {correct}
      </button>,
    );
    return this.randomizesAnswers(answers);
  }

  randomizesAnswers = (answers) => {
    const VALUE_RANDOM = 0.5;
    // Referência: https://flaviocopes.com/how-to-shuffle-array-javascript/
    return answers.sort(() => Math.random() - VALUE_RANDOM);
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

export default Random;

Random.defaultProps = {
  question: {},
  colorClick: () => {},
};

Random.propTypes = {
  question: PropTypes.objectOf(PropTypes.any),
  colorClick: PropTypes.func,
  isNotVisible: PropTypes.bool.isRequired,
  answered: PropTypes.bool.isRequired,
};
