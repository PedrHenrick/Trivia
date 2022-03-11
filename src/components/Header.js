import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import { PropTypes } from 'prop-types';
import './header.css';

class Header extends Component {
  state = {
    score: 0,
  }

  render() {
    const { user: { name, email } } = this.props;
    const emailCrypto = md5(email).toString();
    console.log('Teste: ', emailCrypto);
    const { score } = this.state;
    return (
      <header>
        <h2 id="logo">Trivia</h2>
        <ul>
          <li data-testid="header-player-name">{`Player: ${name}`}</li>
          <li data-testid="header-score">{`Score: ${score}`}</li>
          <li><Link to="/">Sair</Link></li>
          <li>
            <img
              id="gravatar"
              data-testid="header-profile-picture"
              alt="imagem do avatar"
              src={ `https://www.gravatar.com/avatar/${emailCrypto}` }
            />
          </li>
        </ul>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({ user: state.user });

Header.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps)(Header);
