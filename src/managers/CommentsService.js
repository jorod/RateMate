import * as Analytics from 'expo-firebase-analytics';

import { makeRequest } from './ApiService';

export const getProductComments = async (productId, start, limit) => {
  try {
    let response = await makeRequest('GET', { productId, start, limit }, `/productcomment`);

    return {
      commentsList: response.data.productCommentList.sort((a, b) => {
        return b.dateCreated - a.dateCreated;
      }),
      total: response.data.total,
    };
  } catch (error) {
    console.error('Get comments failed with error: ' + error);
    throw error;
  }
};

export const createComment = async (productId, text) => {
  Analytics.logEvent('comment_product');

  try {
    let response = await makeRequest('POST', {}, '/productcomment', { text, productId });
    return response.data;
  } catch (error) {
    console.error('Create comment failed with error: ' + error);
    throw error;
  }
};

export const deleteComment = async (commentId) => {
  try {
    let response = await makeRequest('DELETE', {}, `/productcomment/${commentId}`);
    return response.data;
  } catch (error) {
    console.error('Delete comment failed with error: ' + error);
    throw error;
  }
};
