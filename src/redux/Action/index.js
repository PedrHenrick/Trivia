import { LOGIN_USER } from '../Reducer/loginReducer';
import { FETCH_TOKEN } from '../Reducer/tokenReducer';

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
