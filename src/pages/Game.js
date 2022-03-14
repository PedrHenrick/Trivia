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
  }

  componentDidMount = async () => {
    const { token } = this.props;
    const { results } = await fetchQuestions(token);
    this.setState({ questions: results, tokenUser: token });
  }

  render() {
    const { questions, tokenUser } = this.state;
    return (
      <div>
        <Header />
        { tokenUser
          ? (
            <main className="question-background">
              <Question questions={ questions } />
            </main>
          ) : null }
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
