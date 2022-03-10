import React from 'react';
// import logo from './trivia.png';
// import './App.css';
import { Switch, Route } from 'react-router-dom';
import Game from './pages/Game';
import Login from './pages/Login';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/" component={ Game } />
    </Switch>
  );
}
