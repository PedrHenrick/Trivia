import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';
import Button from './Forms/Button';
import Random from './Random';
import { countdownActionCreator, arrIsShuffle, addScoreAction } from '../redux/Action';
import QuestionTimer from './QuestionTimer';

class Question extends Component {
  state = {
    numberLoop: 0,
    classCategory: '',
  }

  componentDidMount() {
    const MAX_COLORS = 5;
    const classCategory = `color-${Math.floor(Math.random() * MAX_COLORS)}`;
    this.setState({ classCategory });
  }

  getScoreDifficulty = (difficulty) => {
    let level;

    if (difficulty === 'easy') {
      level = 1;
    } else if (difficulty === 'medium') {
      level = 2;
    } else {
      level = 1 + 2;
    }
    return level;
  }

  saveScoreInLocalstorage = (score) => {
    const storage = localStorage.getItem('score') ?? false;

    if (storage) {
      localStorage.removeItem('score');
      if (score > 0) {
        localStorage.setItem('score', score);
      }
    } else {
      localStorage.setItem('score', score);
    }
  }

  handleClick = ({ target }) => {
    const POINTS = 10;
    const { dispatch, id, randomAnswers, questions } = this.props;
    const { numberLoop } = this.state;
    const time = Number(document.getElementById('countdown').innerText);
    const currentQuestion = questions[numberLoop];
    const level = this.getScoreDifficulty(currentQuestion.difficulty);

    if (currentQuestion.correct_answer === target.textContent) {
      const score = POINTS + (time * level);
      dispatch(addScoreAction(score));
      this.saveScoreInLocalstorage(score);
    }
    clearInterval(id);

    const color = randomAnswers.map((answer) => {
      if (answer.key === 'correct-answer') {
        answer = {
          ...answer,
          props: {
            ...answer.props,
            disabled: true,
            className: 'answer-btn correct',
          },
        };
      } else {
        answer = {
          ...answer,
          props: {
            ...answer.props,
            disabled: true,
            className: 'answer-btn invalid',
          },
        };
      }
      return answer;
    });

    dispatch(arrIsShuffle(true, color));
    dispatch(countdownActionCreator(true, 0, time));
  }

  handleNextQuestion = () => {
    const MAX_COLORS = 5;
    const { numberLoop } = this.state;
    const { dispatch, questions, history: { push } } = this.props;
    const classCategory = `color-${Math.floor(Math.random() * MAX_COLORS)}`;

    const QUESTION_QUANTITY = questions.length;
    if (numberLoop < QUESTION_QUANTITY - 1) {
      this.setState(
        {
          numberLoop: numberLoop + 1,
          classCategory,
        },
      );
      dispatch(arrIsShuffle(false, []));
      dispatch(countdownActionCreator(false));
    } else {
      this.setState({ numberLoop: 0 });
      push('/feedback');
    }
  }

  render() {
    const { numberLoop, classCategory } = this.state;
    const { questions, isVisible } = this.props;

    return (
      <section className="question-container">
        <p
          className={ `question__category ${classCategory}` }
          data-testid="question-category"
        >
          {questions[numberLoop].category}
        </p>
        <p data-testid="question-text">{questions[numberLoop].question}</p>
        <Random
          question={ questions[numberLoop] }
          colorClick={ this.handleClick }
          shuffle={ false }
        />
        { isVisible === true
          ? (<Button clicked={ this.handleNextQuestion } />)
          : null }
        <QuestionTimer />
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  randomAnswers: state.card.randomAnswers,
  isVisible: state.timer.isVisible,
  id: state.timer.id,
  time: state.timer.seconds,
});

export default connect(mapStateToProps)(withRouter(Question));

Question.defaultProps = {
  id: 0,
  randomAnswers: [],
  history: {
    push: () => '',
  },
};

Question.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.any).isRequired,
  isVisible: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.number,
  randomAnswers: PropTypes.arrayOf(PropTypes.any),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};
