import React from 'react';
import PropTypes from 'prop-types';
import Button from './Forms/Button';

function Question(props) {
  const { question, answers, clicked } = props;
  const MAX_COLORS = 5;
  const classCategory = `color-${Math.floor(Math.random() * MAX_COLORS)}`;
  return (
    <section className="question-container">
      <p
        className={ `question__category ${classCategory}` }
        data-testid="question-category"
      >
        {question.category}
      </p>
      <p data-testid="question-text">{question.question}</p>
      <div data-testid="answer-options" className="answer-options">{answers}</div>
      <Button clicked={ clicked } />
    </section>
  );
}

Question.defaultProps = {
  answers: [],
  clicked: () => '',
};

Question.propTypes = {
  question: PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
  }).isRequired,
  answers: PropTypes.arrayOf(PropTypes.shape({})),
  clicked: PropTypes.func,

};

export default Question;
