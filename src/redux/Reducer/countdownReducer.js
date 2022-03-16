export const COUNTDOWN = 'COUNTDOWN';

const INITIAL_STATE = {
  isNotVisible: false,
  id: 0,
};

const countdownReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case COUNTDOWN:
    return ({
      ...state,
      isVisible: action.bool,
    });
  default:
    return state;
  }
};

export default countdownReducer;
