import { LOGIN_USER } from '../Reducer/loginReducer';

export const loginUser = (infoUser) => ({
  type: LOGIN_USER,
  payload: {
    name: infoUser.name,
    email: infoUser.email,
  },
});

export const SoPRaPArarDeBUGAR = () => {};
