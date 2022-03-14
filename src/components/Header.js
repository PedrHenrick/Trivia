import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import { PropTypes } from 'prop-types';

import logo from '../trivia.png';
import '../css/header.css';

class Header extends Component {
  state = {
    score: 0,
  }

  render() {
    const { user: { name, email } } = this.props;
    const emailCrypto = md5(email).toString();
    const { score } = this.state;
    return (
      <header>
        <img
          className="logoTrivia"
          src={ logo }
          alt="logo trivia"
        />
        <ul>
          <li>
            <img
              className="gravatar"
              data-testid="header-profile-picture"
              alt="imagem do avatar"
              src={ `https://www.gravatar.com/avatar/${emailCrypto}` }
            />
          </li>
          <li data-testid="header-player-name">{`Player: ${name}`}</li>
          <li data-testid="header-score">{`Score: ${score}`}</li>
          <li><Link to="/">Sair</Link></li>
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
