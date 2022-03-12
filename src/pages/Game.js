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
    seconds: 30,
    answered: false,
    isNotVisible: false,
  }

  componentDidMount = async () => {
    const { token } = this.props;
    const { results } = await fetchQuestions(token);
    this.setState({ questions: results, tokenUser: token });

    this.timer();
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.seconds === 1) {
      this.secondMutate();
    }
  }

  timer = () => {
    const ONE_SECOND = 1000;
    this.intervelId = setInterval(() => {
      this.setState((prevState) => ({ seconds: prevState.seconds - 1 }));
    }, ONE_SECOND);
  }

  secondMutate = () => {
    clearInterval(this.intervelId);
    this.setState({ seconds: 0, isNotVisible: true });
  }

  handleClick = () => {
    this.setState({ answered: true });
  }

  handleNextQuestion = () => {
    const { numberLoop, questions } = this.state;
    const QUESTION_QUANTITY = questions.length;
    if (numberLoop < QUESTION_QUANTITY) {
      this.setState(
        {
          numberLoop: numberLoop + 1,
          answered: false,
          seconds: 30,
          isNotVisible: false,
        },
      );
      this.timer();
    } else this.setState({ numberLoop: questions.length - 1 });
  }

  quizGame = (question) => {
    const { seconds, answered, isNotVisible } = this.state;
    return (
      <div className="question-background">
        <Question
          question={ question }
          answered={ answered }
          isNotVisible={ isNotVisible }
          clicked={ this.handleNextQuestion }
          colorClick={ this.handleClick }
        />
        <section>
          <h3>{ seconds }</h3>
        </section>
      </div>
    );
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
