import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';

import { fetchQuestions } from '../services/api';

class Game extends Component {
  state = {
    questions: [],
    tokenUser: '',
    numberLoop: 0,
    loaded: false,
  }

  componentDidMount = async () => {
    const { token } = this.props;
    this.setState({ loaded: true });
    const { results } = await fetchQuestions(token);
    this.setState({ questions: results, tokenUser: token, loaded: false });
  }

  handleClick = () => {
    const { numberLoop } = this.state;

    const QUESTION_QUANTITY = 4;

    if (numberLoop < QUESTION_QUANTITY) this.setState({ numberLoop: numberLoop + 1 });
    else this.setState({ numberLoop: 0 });
  }

  randomAnswers = (question) => {
    const { correct_answer: correct, incorrect_answers: incorrects } = question;

    const answers = incorrects.map((answer, index) => {
      const dataTestId = `wrong-answer-${index}`;
      return (
        <button
          type="button"
          key={ index }
          data-testid={ dataTestId }
          onClick={ this.handleClick }
        >
          {answer}
        </button>
      );
    });

    answers.push(
      <button
        type="button"
        key={ nanoid() }
        data-testid="correct-answer"
        onClick={ this.handleClick }
      >
        {correct}
      </button>,
    );

    return this.randomizesAnswers(answers);
  }

  randomizesAnswers = (answers) => {
    const VALUE_RANDOM = 0.5;

    // Referência: https://flaviocopes.com/how-to-shuffle-array-javascript/
    const randomAnswers = answers.sort(() => Math.random() - VALUE_RANDOM);
    return randomAnswers;
  }

  quizGame = (question) => {
    const answers = this.randomAnswers(question);
    return (
      <section className="question-container">
        <p data-testid="question-category">{question.category}</p>
        <p data-testid="question-text">{question.question}</p>
        <div data-testid="answer-options">{answers}</div>
      </section>
    );
  }

  render() {
    const { tokenUser, questions, numberLoop, loaded } = this.state;
    return (
      <main>
        { loaded ? <h3>Loading....</h3> : null }
        { tokenUser && this.quizGame(questions[numberLoop]) }
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
});

export default connect(mapStateToProps)(Game);

Game.defaultProps = {
  token: '',
};

Game.propTypes = {
  token: PropTypes.string,
};
