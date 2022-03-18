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
      <main className="ranking-background">
        <div className="ranking-container">
          <div className="ranking-controls">
            <h1 className="ranking-title" data-testid="ranking-title">Ranking</h1>
            <Button
              clicked={ this.handleClick }
              btnName="Jogar Novamente"
              dataTestId="btn-go-home"
              btnClass="btn-play-again"
            />
          </div>
          <ul className="ranking__list">
            { players.map(({ email, name, score }, index) => {
              const emailCrypto = md5(email).toString();
              return (
                <li key={ index } className="ranking__item">
                  <img
                    className="gravatar"
                    alt="imagem do avatar"
                    src={ `https://www.gravatar.com/avatar/${emailCrypto}` }
                  />
                  <div className="ranking__heading">
                    <h5
                      className="ranking__heading--name"
                      data-testid={ `player-name-${index}` }
                    >
                      {name}

                    </h5>
                    <h6
                      className="ranking__heading--score"
                      data-testid={ `player-score-${index}` }
                    >
                      {score}

                    </h6>
                  </div>
                </li>
              );
            }) }
          </ul>
        </div>
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
