export const LOGIN_USER = 'LOGIN_USER';
export const ADD_SCORE = 'ADD_SCORE';
export const ADD_CORRECT_ANSWERS = 'ADD_CORRECT_ANSWERS';

const INITIAL_STATE = {
  name: '',
  email: '',
  score: 0,
  assertions: 0,
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN_USER:
    return ({
      ...state,
      name: action.payload.name,
      email: action.payload.email,
    });
  case ADD_SCORE:
    return ({
      ...state,
      score: state.score + action.payload.score,
    });
  case ADD_CORRECT_ANSWERS:
    return ({
      ...state,
      assertions: action.payload.assertions,
    });

  default:
    return state;
  }
};

export default loginReducer;
