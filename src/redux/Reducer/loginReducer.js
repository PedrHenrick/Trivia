export const LOGIN_USER = 'LOGIN_USER';

const INITIAL_STATE = {
  name: '',
  email: '',
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN_USER:
    return ({
      ...state,
      name: action.payload.name,
      email: action.payload.email,
    });
  default:
    return state;
  }
};

export default loginReducer;
