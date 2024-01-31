import { SET_USER_DETAILS_LOCATIONS, SET_USER_DETAILS_GENDERS, SET_USER_DETAILS_MARITAL_STATUSES, USER_DETAILS } from './actionTypes';

const userDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DETAILS: {
      return {
        ...state,
        details: action.payload.details,
      }
    }
    case SET_USER_DETAILS_LOCATIONS: {
      return {
        ...state,
        locations: action.payload.locations,
      };
    }
    case SET_USER_DETAILS_GENDERS: {
      return {
        ...state,
        genders: action.payload.genders,
      };
    }
    case SET_USER_DETAILS_MARITAL_STATUSES: {
      return {
        ...state,
        maritalStatuses: action.payload.maritalStatuses,
      };
    }
    default: {
      return state;
    }
  }
};

export default userDetailsReducer;
