export const FETCH_TOKEN = 'FETCH_TOKEN';

const INITIAL_STATE = '';

export const tokenReducer = (state = INITIAL_STATE, action) => {
  if (action.type === FETCH_TOKEN) {
    const { token } = action;
    return token;
  }
  return state;
};
