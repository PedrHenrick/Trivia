export const CARD_SHUFFLE = 'CARD_SHUFFLE';
export const ARR_SHUFFLE = 'ARR_SHUFFLE';

const INITIAL_STATE = {
  isShuffle: false,
  randomAnswers: [],
};

const cardReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CARD_SHUFFLE:
    return ({
      ...state,
      isShuffle: action.bool,
    });
  case ARR_SHUFFLE:
    return ({
      ...state,
      isShuffle: action.bool,
      randomAnswers: action.arr,
    });
  default:
    return state;
  }
};

export default cardReducer;
