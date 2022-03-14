import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import Button from './Forms/Button';
import Random from './Random';
import { countdown, arrIsShuffle } from '../redux/Action';
import QuestionTimer from './QuestionTimer';

class Question extends Component {
  state = {
    numberLoop: 0,
  }

  handleClick = () => {
    const { dispatch, id, randomAnswers } = this.props;

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
    dispatch(countdown(true));
  }

  handleNextQuestion = () => {
    const { numberLoop } = this.state;
    const { dispatch, questions } = this.props;

    const QUESTION_QUANTITY = questions.length;
    if (numberLoop < QUESTION_QUANTITY - 1) {
      this.setState(
        {
          numberLoop: numberLoop + 1,
        },
      );
      dispatch(arrIsShuffle(false, []));
      dispatch(countdown(false));
    } else this.setState({ numberLoop: 0 });
  }

  render() {
    const { numberLoop } = this.state;
    const { questions, isNotVisible } = this.props;

    const MAX_COLORS = 5;
    const classCategory = `color-${Math.floor(Math.random() * MAX_COLORS)}`;

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
        <Button clicked={ this.handleNextQuestion } isNotVisible={ isNotVisible } />
        <QuestionTimer />
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  randomAnswers: state.card.randomAnswers,
  isNotVisible: state.timer.isNotVisible,
  id: state.timer.id,
});

export default connect(mapStateToProps)(Question);

Question.defaultProps = {
  id: 0,
  randomAnswers: [],
};

Question.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.any).isRequired,
  isNotVisible: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.number,
  randomAnswers: PropTypes.arrayOf(PropTypes.any),
};
