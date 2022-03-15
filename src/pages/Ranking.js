import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../components/Forms/Button';

class Ranking extends Component {
  handleClick = () => {
    const { history: { push } } = this.props;
    push('/');
  }

  render() {
    return (
      <main>
        <h1 data-testid="ranking-title">Ranking</h1>
        <Button
          clicked={ this.handleClick }
          btnName="Jogar Novamente"
          dataTestId="btn-go-home"
        />
      </main>
    );
  }
}

export default Ranking;

Ranking.defaultProps = {
  history: {},
};

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};
