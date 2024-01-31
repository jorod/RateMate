export const getUserDetails = (state) => state.userDetails.details;
export const getLocationsList = (state) => state.userDetails.locations || [];
export const getGendersList = (state) => state.userDetails.genders || [];
export const getMaritalStatusesList = (state) => state.userDetails.maritalStatuses || [];