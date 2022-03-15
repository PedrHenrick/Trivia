import { ADD_SCORE, LOGIN_USER } from '../Reducer/loginReducer';
import { FETCH_TOKEN } from '../Reducer/tokenReducer';
import { COUNTDOWN } from '../Reducer/countdownReducer';
import { ARR_SHUFFLE } from '../Reducer/cardReducer';

export const loginUser = (infoUser) => ({
  type: LOGIN_USER,
  payload: {
    name: infoUser.name,
    email: infoUser.email,
  },
});

export const fetchTokenThunk = (token) => ({
  type: FETCH_TOKEN,
  token,
});

// Controlador do timer
export const countdownActionCreator = (bool, id, seconds) => ({
  type: COUNTDOWN,
  bool,
  id,
  seconds,
});

export const arrIsShuffle = (bool, arr) => ({
  type: ARR_SHUFFLE,
  bool,
  arr,
});

export const addScoreAction = (score) => ({
  type: ADD_SCORE,
  payload: {
    score,
  },
});
