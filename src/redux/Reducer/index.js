import { combineReducers } from 'redux';

import { tokenReducer } from './tokenReducer';
import loginReducer from './loginReducer';
import countdownReducer from './countdownReducer';
import cardReducer from './cardReducer';

const rootReducer = combineReducers({
  player: loginReducer,
  token: tokenReducer,
  timer: countdownReducer,
  card: cardReducer,
});

export default rootReducer;
