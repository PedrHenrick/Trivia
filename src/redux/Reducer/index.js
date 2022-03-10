import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import { tokenReducer } from './tokenReducer';

const rootReducer = combineReducers({
  user: loginReducer,
  token: tokenReducer,
});

export default rootReducer;
