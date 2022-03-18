import React, { Component } from 'react';
import imgSrc from '../assets/img/not-found.jpg';

class NotFound extends Component {
  render() {
    return (
      <div className="ranking-background">
        <div className="ranking-container">
          <h3 className="not-found__heading">Que Pena... :( página não encontrada.</h3>
          <img
            src={ imgSrc }
            alt="not found img show do milhao"
            className="not-found__img"
          />

        </div>
      </div>
    );
  }
}

export default NotFound;
