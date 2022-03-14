import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { countdown } from '../redux/Action';

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
    const { dispatch } = this.props;

    clearInterval(this.intervelId);
    this.setState({ seconds: 0 });
    dispatch(countdown(true, this.intervelId));
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
});

export default connect(mapStateToProps)(QuestionTimer);

QuestionTimer.defaultProps = {
  // secondsGlobalState: 30,
};

QuestionTimer.propTypes = {
  // secondsGlobalState: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
};
