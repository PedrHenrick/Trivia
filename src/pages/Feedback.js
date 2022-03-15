import React, { Component } from 'react';
import Button from '../components/Forms/Button';
import Header from '../components/Header';

class Feedback extends Component {
  handleClickRanking = () => {}

  handleClickPlayAgain = () => {}

  render() {
    return (
      <div className="feedback-container">
        <Header />
        <div className="feedback_headings">
          <h2 data-testid="feedback-text">Feedback</h2>
          <h3>
            <span>Você acertou 2 Questoes</span>
            <span>Um total de 20 Pontos</span>
          </h3>
        </div>
        <div className="feedback_controls">
          <Button clicked={ this.handleClickRanking } btnName="Ranking" />
          <Button clicked={ this.handleClickPlayAgain } btnName="Play Again" />
        </div>
      </div>
    );
  }
}

export default Feedback;
