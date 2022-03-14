import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { countdown, arrIsShuffle } from '../redux/Action';

class QuestionTimer extends Component {
  state = {
    seconds: 30,
  }

  componentDidMount() {
    const { dispatch } = this.props;

    const ONE_SECOND = 1000;
    this.intervelId = setInterval(() => {
      this.setState((prevState) => ({ seconds: prevState.seconds - 1 }));
    }, ONE_SECOND);
    dispatch(countdown(false, this.intervelId));
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.seconds === 1) {
      this.secondMutate();
    }
  }

  secondMutate = () => {
    const { dispatch, randomAnswers } = this.props;

    clearInterval(this.intervelId);
    this.setState({ seconds: 0 });

    const color = randomAnswers.map((answer) => {
      answer = {
        ...answer,
        props: {
          ...answer.props,
          disabled: true,
        },
      };
      return answer;
    });

    dispatch(arrIsShuffle(true, color));
    dispatch(countdown(true, 0));
  }

  render() {
    const { seconds } = this.state;
    return (
      <section>
        <h3>
          { seconds }
        </h3>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  secondsGlobalState: state.timer.seconds,
  randomAnswers: state.card.randomAnswers,
});

export default connect(mapStateToProps)(QuestionTimer);

QuestionTimer.defaultProps = {
  // secondsGlobalState: 30,
  randomAnswers: [],
};

QuestionTimer.propTypes = {
  // secondsGlobalState: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
  randomAnswers: PropTypes.arrayOf(PropTypes.any),
};
