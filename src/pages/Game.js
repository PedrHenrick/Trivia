import React, { Component } from 'react';
import { connect } from 'react-redux';

class Game extends Component {
  render() {
    return (
      <div>
        Welcome
      </div>
    );
  }
}
const mapStateToProps = (state) => ({ user: state.user });

export default connect(mapStateToProps)(Game);
