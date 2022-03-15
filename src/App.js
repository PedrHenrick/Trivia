import React from 'react';
// import logo from './trivia.png';
// import './App.css';
import { Switch, Route } from 'react-router-dom';
import Feedback from './pages/Feedback';
import Game from './pages/Game';
import Login from './pages/Login';
import Ranking from './pages/Ranking';
import Settings from './pages/Settings';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/feedback" component={ Feedback } />
      <Route path="/game" component={ Game } />
      <Route path="/settings" component={ Settings } />
      <Route path="/ranking" component={ Ranking } />
    </Switch>
  );
}
