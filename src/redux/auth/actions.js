import { loginWithEmail, register, appleLogin } from '../../managers/UserService';
import { USER_LOGIN, USER_LOGOUT } from './actionTypes';

export const userLogin = (user) => ({
  type: USER_LOGIN,
  payload: user,
});

export const userLogout = () => ({
  type: USER_LOGOUT,
});

export const login = (email, password) => {
  return (dispatch) => {
    loginWithEmail(email, password).then(
      (user) =>
        dispatch({
          type: USER_LOGIN,
          payload: user,
        }),
      // (err) => dispatch({
      //   type: 'ADD_TODO_FAIL',
      //   error: true,
      //   payload: err
      // })
    );
  };
};

export const registerRN = (email, password, username) => {
  return (dispatch) => {
    register(email, password, username).then((user) =>
      dispatch({
        type: USER_LOGIN,
        payload: user,
      }),
    );
  };
};

export const loginWithApple = (name, email, appleToken) => {
  return (dispatch) => {
    appleLogin(name, email, appleToken).then((user) =>
      dispatch({
        type: USER_LOGIN,
        payload: { username: user.username ?? name, email: email ?? user.email, token: user.token },
      }),
    );
  };
};
