import { LOGIN_USER } from '../Reducer/loginReducer';
import { FETCH_TOKEN } from '../Reducer/tokenReducer';
import { COUNTDOWN } from '../Reducer/countdownReducer';
import { CARD_SHUFFLE, ARR_SHUFFLE } from '../Reducer/cardReducer';

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
export const countdown = (bool, id) => ({
  type: COUNTDOWN,
  bool,
  id,
});

export const isShuffle = (bool) => ({
  type: CARD_SHUFFLE,
  bool,
});

export const arrIsShuffle = (bool, arr) => ({
  type: ARR_SHUFFLE,
  bool,
  arr,
});
