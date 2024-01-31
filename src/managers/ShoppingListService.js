import store from '../redux/store';

import { makeRequest } from './ApiService';
import Units from '../constants/Units';

export const getUnitsMap = () => {
  const units = store.getState().shoppingLists.units;

  return units.map((x) => ({ value: x, label: Units[x] ?? '.' }));
};

export const getUnits = async () => {
  try {
    let response = await makeRequest('GET', {}, '/shoppinglistItem/units');

    return response.data;
  } catch (error) {
    console.error('ShoppingList units failed with error: ' + error);
    // throw error
  }
};

export const getShoppingLists = async () => {
  try {
    const response = await makeRequest('GET', {}, '/shoppinglist/getAll');
    let lists = response.data;

    const fullLists = await Promise.all(
      lists.map(async (list) => {
        let products = await getShoppingListItems(list.id);

        return { ...list, products };
      }),
    );

    return fullLists;
  } catch (error) {
    console.error('Get shopping lists failed with error: ' + error);
    throw error;
  }
};

export const updateShoppingList = async (list) => {
  try {
    let response = await makeRequest('PUT', {}, '/shoppinglist', { ...list });
    return response.data;
  } catch (error) {
    console.error('Update shopping list failed with error: ' + error);
    throw error;
  }
};

export const createShoppingList = async (name) => {
  try {
    let response = await makeRequest('POST', {}, '/shoppinglist', { name });
    return response.data;
  } catch (error) {
    console.error('Create shopping list failed with error: ' + error);
    throw error;
  }
};

export const deleteShoppingList = async (id) => {
  try {
    let response = await makeRequest('DELETE', {}, `/shoppinglist/${id}`);
    return response.data;
  } catch (error) {
    console.error('Delete shopping list failed with error: ' + error);
    throw error;
  }
};

export const getShoppingListItems = async (listId) => {
  try {
    let response = await makeRequest('GET', {}, `/shoppinglistItem/${listId}`);
    return response.data;
  } catch (error) {
    console.error('Get items failed with error: ' + error);
    throw error;
  }
};

export const updateShoppingListItem = async (listId, item) => {
  try {
    let response = await makeRequest('PUT', {}, `/shoppinglistItem/${listId}`, item);
    return response.data;
  } catch (error) {
    console.error('Update item failed with error: ' + error);
    throw error;
  }
};

export const createShoppingListItem = async (listId, item) => {
  try {
    let response = await makeRequest('POST', {}, `/shoppinglistItem/${listId}`, item);
    return response.data;
  } catch (error) {
    console.error('Create item failed with error: ' + error);
    throw error;
  }
};

export const deleteShoppingListItem = async (listId, itemId) => {
  try {
    let response = await makeRequest('DELETE', {}, `/shoppinglistItem/${listId}/${itemId}`);
    return response.data;
  } catch (error) {
    console.error('Delete item failed with error: ' + error);
    throw error;
  }
};
