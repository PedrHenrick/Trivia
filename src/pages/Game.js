import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Game extends Component {
  render() {
    return (
      <main>
        <Header />
      </main>

    );
  }
}
const mapStateToProps = (state) => ({ user: state.user });

export default connect(mapStateToProps)(Game);
