import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <main>
        <h1>Trivia</h1>
        <header>
          <button type="button" data-testid="btn-settings">
            <Link to="/settings">Settings</Link>
          </button>
        </header>
      </main>
    );
  }
}

export default Home;
