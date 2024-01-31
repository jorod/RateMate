import axios from 'axios';
import Environments from '../constants/Environments';
import store from '../redux/store';

export const makeRequest = async (method, params, relUrl, data) => {
  const token = store.getState().user.token;

  try {
    var headers = {
      'Content-Type': 'application/json',
      'user-token': token,
    };

    console.log(
      'URL: ' +
        Environments.TEST_URL +
        relUrl +
        ', params: ' +
        JSON.stringify(params) +
        ', token: ' +
        token +
        ', data: ' +
        JSON.stringify(data),
    );

    let request = axios.create({
      baseURL: Environments.TEST_URL,
    });

    let response = await request({
      method: method,
      url: relUrl,
      params: params,
      data: data,
      headers: headers,
    });

    return response;
  } catch (error) {
    checkErrorStatus(error);
  }
};

const checkErrorStatus = (error) => {
  if (error.response?.status == 400) {
    console.log('errMsg:', error.response.data.message);
    throw new Error(error.response.data.message);
  }

  console.log('API Manager: ' + error);

  throw error;
};
