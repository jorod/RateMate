import { USER_LOGIN, USER_LOGOUT } from './actionTypes';

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN: {
      return {
        ...action.payload,
        loggedIn: true,
      };
    }
    case USER_LOGOUT: {
      return {
        loggedIn: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
