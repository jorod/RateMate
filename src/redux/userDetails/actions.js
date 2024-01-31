import { getLocations, getGenders, getMaritalStatuses, getUserDetails, updateUserDetails } from '../../managers/UserService';
import { SET_USER_DETAILS_LOCATIONS, SET_USER_DETAILS_GENDERS, SET_USER_DETAILS_MARITAL_STATUSES, USER_DETAILS } from './actionTypes';

export const loadUserDetails = () => {
  return (dispatch) => {
    getUserDetails().then((details) =>
      dispatch({
        type: USER_DETAILS,
        payload: { details },
      }),
    );
  }
}
  
export const loadLocations = () => {
  return (dispatch) => {
    getLocations().then((locations) =>
      dispatch({
        type: SET_USER_DETAILS_LOCATIONS,
        payload: { locations },
      }),
    );
  };
};
  
export const loadGenders = () => {
  return (dispatch) => {
    getGenders().then((genders) =>
      dispatch({
        type: SET_USER_DETAILS_GENDERS,
        payload: { genders },
      }),
    );
  };
};
  
export const loadMaritalStatuses = () => {
  return (dispatch) => {
    getMaritalStatuses().then((maritalStatuses) =>
      dispatch({
        type: SET_USER_DETAILS_MARITAL_STATUSES,
        payload: { maritalStatuses },
      }),
    );
  };
};

export const updateDetails = (details) => {
  return async (dispatch) => {
    try {
      const updatedDetails = await updateUserDetails(details)
      dispatch({
        type: USER_DETAILS,
        payload: { updatedDetails },
      });
    } catch (error) {
      alert(error);
    }
  };
};