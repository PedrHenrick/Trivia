import { ADD_CORRECT_ANSWERS, ADD_SCORE, LOGIN_USER } from '../Reducer/loginReducer';
import { FETCH_TOKEN } from '../Reducer/tokenReducer';
import { COUNTDOWN } from '../Reducer/countdownReducer';
import { ARR_SHUFFLE } from '../Reducer/cardReducer';

export const loginUser = (infoUser) => {
  if (infoUser === undefined) {
    return {
      type: LOGIN_USER,
      payload: {
        name: '',
        email: '',
      },
    };
  } if (infoUser !== undefined) {
    return {
      type: LOGIN_USER,
      payload: {
        name: infoUser.name,
        email: infoUser.email,
      },
    };
  }
};

export const fetchTokenThunk = (token) => {
  if (token === undefined) {
    return {
      type: FETCH_TOKEN,
      token,
    };
  } if (token !== undefined) {
    return {
      type: FETCH_TOKEN,
      token,
    };
  }
};

// Controlador do timer
export const countdownActionCreator = (bool) => {
  if (bool === undefined) {
    return {
      type: COUNTDOWN,
      bool: false,
    };
  } if (bool !== undefined) {
    return {
      type: COUNTDOWN,
      bool,
    };
  }
};

export const arrIsShuffle = (bool, arr) => {
  if (bool === undefined && arr === undefined) {
    return {
      type: ARR_SHUFFLE,
      bool: false,
      arr: [],
    };
  } if (bool !== undefined && arr !== undefined) {
    return {
      type: ARR_SHUFFLE,
      bool,
      arr,
    };
  }
};

export const addScoreAction = (score) => {
  if (score === undefined) {
    return {
      type: ADD_SCORE,
      payload: {
        score: 0,
      },
    };
  } if (score !== undefined) {
    return {
      type: ADD_SCORE,
      payload: {
        score,
      },
    };
  }
};

export const correctAnswersAction = (assertions) => {
  if (assertions === undefined) {
    return {
      type: ADD_CORRECT_ANSWERS,
      payload: {
        assertions: 0,
      },
    };
  } if (assertions !== undefined) {
    return {
      type: ADD_CORRECT_ANSWERS,
      payload: {
        assertions,
      },
    };
  }
};
