import { makeRequest } from './ApiService';

export const eula = async () => {
  try {
    let eula = await makeRequest('GET', {}, '/eula/all');

    return eula.data;
  } catch (error) {
    console.error('EULA fail with error: ' + error);
    throw error;
  }
};

export const privacyPolicy = async () => {
  try {
    let privacyPolicyResponse = await makeRequest('GET', {}, '/eula/privacyStatement');

    return privacyPolicyResponse.data;
  } catch (error) {
    console.log('Failed loading policy data: ' + error);
  }
};

export const getUserDetails = async () => {
  try {
    let response = await makeRequest('GET', {}, '/userDetails/userDetails');

    if (response.status === 204) { return {}; }

    return response.data;
  } catch (error) {
    console.error('User details failed with error: ' + error);
  }
};

export const updateUserDetails = async (details) => {
  try {
    let response = await makeRequest('POST', {}, '/userDetails/userDetails', { ...details });

    console.log("-------Details updated!:", response.data);

    return response.data;
  } catch (error) {
    console.error('Update user details failed with error: ' + error);
    throw error;
  }
};

export const getLocations = async () => {
  try {
    let response = await makeRequest('GET', {}, '/userDetails/locationsList');

    return response.data;
  } catch (error) {
    console.error('Locations failed with error: ' + error);
  }
};

export const getGenders = async () => {
  try {
    let response = await makeRequest('GET', {}, '/userDetails/gendersList');

    return response.data;
  } catch (error) {
    console.error('Genders failed with error: ' + error);
  }
};

export const getMaritalStatuses = async () => {
  try {
    let response = await makeRequest('GET', {}, '/userDetails/maritalStatusList');

    return response.data;
  } catch (error) {
    console.error('Marital statuses failed with error: ' + error);
  }
};

export const register = async (email, password, username) => {
  try {
    let data = {
      email: email,
      password: password,
      username: username,
    };

    let response = await makeRequest('POST', {}, '/user/register', data);
    
    return response.data;
  } catch (error) {
    console.log('Register failed with error: ' + error);
    throw error;
  }
};

export const loginWithEmail = async (email, password) => {
  try {
    let data = {
      email: email,
      password: password,
    };

    let response = await makeRequest('POST', {}, '/user/login', data);

    return response.data;
  } catch (error) {
    console.error('Login with email and password fails with error: ' + error);
    throw error;
  }
};

export const appleLogin = async (name, email, appleToken) => {
  try {
    let data = {
      username: name,
      email: email,
      appleToken: appleToken,
    };

    let response = await makeRequest('POST', {}, '/user/applelogin', data);

    return response.data;
  } catch (error) {
    console.error('Login with AppleId fails with error: ' + error);
    throw error;
  }
};

export const fbLogin = async (email, fbToken) => {
  try {
    let data = {
      email: email,
      fbToken: fbToken,
    };

    let response = await makeRequest('POST', {}, '/user/fblogin', data);

    return response.data;
  } catch (error) {
    if (error == 'Error: Error with FB token validation') {
      alert(error);
    } else {
      console.error('Login with facebook fails with error: ' + error);
      throw error;
    }
  }
};

export const getRMUser = (user) => {
  const username = user.name;
  const email = user.email;
  const avatar = user.imageURL ?? '';

  return { username, email, avatar };
};

export const getAppleUsername = (user) => {
  return user.fullName
    ? (user.fullName.givenName ? user.fullName.givenName : '') +
        ' ' +
        (user.fullName.familyName ? user.fullName.familyName : '')
    : '';
};
