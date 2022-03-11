import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class QuestionTimer extends Component {
  state = {
    seconds: 5,
  }

  componentDidMount() {
    const ONE_SECOND = 1000;
    this.intervelId = setInterval(() => {
      this.setState((prevState) => ({ seconds: prevState.seconds - 1 }));
    }, ONE_SECOND);
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.seconds === 1) {
      this.secondMutate();
    }
  }

  secondMutate = () => {
    clearInterval(this.intervelId);
    this.setState({ seconds: 0 });
  }

  render() {
    const { seconds } = this.state;
    const { handleChange } = this.props;
    return (
      <section>
        <h3
          onChange={ handleChange }
        >
          { seconds }
        </h3>
      </section>
    );
  }
}

export default QuestionTimer;

QuestionTimer.defaultProps = {
  handleChange: () => {},
};

QuestionTimer.propTypes = {
  handleChange: PropTypes.func,
};
