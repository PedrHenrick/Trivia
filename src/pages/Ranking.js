import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

import Button from '../components/Forms/Button';

class Ranking extends Component {
  state = {
    players: [],
  }

  componentDidMount() {
    let players = localStorage.getItem('game');
    if (players) {
      players = JSON.parse(players).sort((a, b) => b.score - a.score);
      this.setState({ players });
    }
  }

  handleClick = () => {
    const { history: { push } } = this.props;
    push('/');
  }

  render() {
    const { players } = this.state;
    return (
      <main>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ul>
          { players.map(({ email, name, score }, index) => {
            const emailCrypto = md5(email).toString();
            return (
              <li key={ index }>
                <img
                  className="gravatar"
                  alt="imagem do avatar"
                  src={ `https://www.gravatar.com/avatar/${emailCrypto}` }
                />
                <h5 data-testid={ `player-name-${index}` }>{name}</h5>
                <h6 data-testid={ `player-score-${index}` }>{score}</h6>
              </li>
            );
          }) }
        </ul>
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
