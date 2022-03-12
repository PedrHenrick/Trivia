import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './Forms/Button';
import Random from './Random';

class Question extends Component {
  render() {
    const {
      question,
      clicked,
      colorClick,
      answered,
      isNotVisible,
    } = this.props;
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
        <Random
          question={ question }
          colorClick={ colorClick }
          answered={ answered }
          isNotVisible={ isNotVisible }
        />
        <Button clicked={ clicked } />
      </section>
    );
  }
}

Question.defaultProps = {
  clicked: () => '',
  colorClick: () => {},
};

Question.propTypes = {
  question: PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
  }).isRequired,
  clicked: PropTypes.func,
  colorClick: PropTypes.func,
  answered: PropTypes.bool.isRequired,
  isNotVisible: PropTypes.bool.isRequired,

};

export default Question;
