import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

import { fetchQuestions } from '../services/api';
import Question from '../components/Question';
import QuestionTimer from './QuestionTimer'

class Game extends Component {
  state = {
    questions: [],
    tokenUser: '',
    numberLoop: 0,
    answered: false,
    isNotVisible: false,
  }

  componentDidMount = async () => {
    const { token } = this.props;
    const { results } = await fetchQuestions(token);
    this.setState({ questions: results, tokenUser: token });
  }

  handleChange = ({ target }) => {
    console.log(target);
    if (target.value === 0) {
      this.setState({ isNotVisible: true });
    }
  }

  handleClick = () => {
    this.setState({ answered: true });
  }

  handleNextQuestion = () => {
    const { numberLoop, questions } = this.state;
    const QUESTION_QUANTITY = questions.length;

    if (numberLoop < QUESTION_QUANTITY) {
      this.setState(
        { numberLoop: numberLoop + 1,
          answered: false,
        },
      );
    } else this.setState({ numberLoop: 0 });
  }

  randomAnswers = (question) => {
    const { correct_answer: correct, incorrect_answers: incorrects } = question;
    const { answered, isNotVisible } = this.state;

    const answers = incorrects.map((answer, index) => {
      const dataTestId = `wrong-answer-${index}`;
      return (
        <button
          type="button"
          key={ index }
          data-testid={ dataTestId }
          id={ dataTestId }
          onClick={ this.handleClick }
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
        onClick={ this.handleClick }
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

  quizGame = (question) => {
    const answers = this.randomAnswers(question);
    return (
      <div className="question-background">
        <Question
          question={ question }
          answers={ answers }
          clicked={ this.handleNextQuestion }
        />
        <QuestionTimer handleChange={ this.handleChange } />
      </div>);
  }

  render() {
    const { tokenUser, questions, numberLoop } = this.state;
    return (
      <div>
        <Header />
        <main>
          { tokenUser && this.quizGame(questions[numberLoop]) }
        </main>
      </div>
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
