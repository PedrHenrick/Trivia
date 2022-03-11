import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

import { fetchQuestions } from '../services/api';
import Question from '../components/Question';

class Game extends Component {
  state = {
    questions: [],
    tokenUser: '',
    numberLoop: 0,
    loaded: false,
    answered: false,
  }

  componentDidMount = async () => {
    const { token } = this.props;
    this.setState({ loaded: true });
    const { results } = await fetchQuestions(token);
    this.setState({ questions: results, tokenUser: token, loaded: false });
  }

  handleClick = (event) => {
    event.preventDefault();
    // const { numberLoop } = this.state;
    this.setState({ answered: true });

    // const QUESTION_QUANTITY = 4;
    // if (numberLoop < QUESTION_QUANTITY) {
    //   this.setState(
    //     { numberLoop: numberLoop + 1,
    //     },
    //   );
    // } else this.setState({ numberLoop: 0 });
  }

  handleNextQuestion = () => {
    const { numberLoop } = this.state;
    const QUESTION_QUANTITY = 4;
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
    const { answered } = this.state;
    const answers = incorrects.map((answer, index) => {
      const dataTestId = `wrong-answer-${index}`;
      return (
        <button
          type="button"
          key={ index }
          data-testid={ dataTestId }
          id={ dataTestId }
          onClick={ this.handleClick }
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
    const randomAnswers = answers.sort(() => Math.random() - VALUE_RANDOM);
    return randomAnswers;
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
      </div>);
  }

  render() {
    const { tokenUser, questions, numberLoop, loaded } = this.state;
    return (
      <div>
        <Header />
        <main>
          { loaded ? <h3>Loading....</h3> : null }
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
