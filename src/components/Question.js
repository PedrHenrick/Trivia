import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import sanitizeHtml from 'sanitize-html';

import PropTypes from 'prop-types';
import Button from './Forms/Button';
import Random from './Random';
import { countdownActionCreator,
  arrIsShuffle,
  addScoreAction,
  correctAnswersAction,
} from '../redux/Action';
import QuestionTimer from './QuestionTimer';

class Question extends Component {
  state = {
    numberLoop: 0,
    classCategory: '',
    correctAnswers: 0,
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

  saveGameinfoInStorage = () => {
    const { player } = this.props;
    const game = { ...player };
    const storage = localStorage.getItem('game');

    let array = [game];

    if (storage) {
      array = [...JSON.parse(storage), game];
    }
    localStorage.setItem('game', JSON.stringify(array));
  }

  handleClick = ({ target }) => {
    const { dispatch, randomAnswers, questions, scoreTotal } = this.props;
    const { numberLoop, correctAnswers } = this.state;
    const currentQuestion = questions[numberLoop];

    if (currentQuestion.correct_answer === target.textContent) {
      const POINTS = 10;
      const time = Number(document.getElementById('countdown').innerText);

      const level = this.getScoreDifficulty(currentQuestion.difficulty);

      const score = POINTS + (time * level);

      this.setState((prevState) => ({
        correctAnswers: prevState.correctAnswers + 1,
        scoreTotal: score + prevState.scoreTotal }));

      dispatch(addScoreAction(score + scoreTotal));
      dispatch(correctAnswersAction(correctAnswers + 1));
    }

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
    dispatch(countdownActionCreator(true));
  }

  handleNextQuestion = () => {
    const MAX_COLORS = 5;
    const { numberLoop } = this.state;
    const { dispatch, questions, history: { push } } = this.props;
    const classCategory = `color-${Math.floor(Math.random() * MAX_COLORS)}`;

    const QUESTION_QUANTITY = questions.length;
    if (numberLoop < QUESTION_QUANTITY - 1) {
      this.setState({ numberLoop: numberLoop + 1, classCategory });
      dispatch(arrIsShuffle(false, []));
      dispatch(countdownActionCreator(false));
    } else {
      this.setState({ numberLoop: 0 });
      this.saveGameinfoInStorage();
      push('/feedback');
    }
  }

  render() {
    const { numberLoop, classCategory } = this.state;
    const { questions, isVisible } = this.props;
    const sanitizedQuestion = sanitizeHtml(questions[numberLoop].question);
    return (
      <section className="question-container">
        <p
          className={ `question__category ${classCategory}` }
          data-testid="question-category"
        >
          {questions[numberLoop].category}
        </p>
        <p data-testid="question-text">{sanitizedQuestion}</p>
        <Random
          question={ questions[numberLoop] }
          colorClick={ this.handleClick }
          shuffle={ false }
        />
        { isVisible === true
          ? (
            <div className="divNext">
              <Button
                clicked={ this.handleNextQuestion }
                dataTestId="btn-next"
                btnName="Next"
                btnClass="buttonNext"
              />
            </div>)
          : (
            <div className="divTimer">
              <QuestionTimer />
            </div>
          ) }
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  randomAnswers: state.card.randomAnswers,
  isVisible: state.timer.isVisible,
  player: state.player,
  scoreTotal: state.player.score,
});

export default connect(mapStateToProps)(withRouter(Question));

Question.defaultProps = {
  randomAnswers: [],
  history: {
    push: () => '',
  },
  isVisible: false,
  player: {},
  scoreTotal: 0,
};

Question.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.any).isRequired,
  isVisible: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  randomAnswers: PropTypes.arrayOf(PropTypes.any),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  player: PropTypes.objectOf(PropTypes.any),
  scoreTotal: PropTypes.number,
};
