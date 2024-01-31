import {
  ADD_SHOPPING_LIST,
  DELETE_SHOPPING_LIST,
  SET_SHOPPING_LISTS,
  SET_SHOPPING_LIST_UNITS,
  UPDATE_SHOPPING_LIST,
} from './actionTypes';
import {
  createShoppingList,
  getShoppingLists,
  deleteShoppingList,
  updateShoppingList,
  getUnits,
  createShoppingListItem,
  deleteShoppingListItem,
  updateShoppingListItem,
} from '../../managers/ShoppingListService';

export const loadLists = () => {
  return async (dispatch) => {
    try {
      const lists = await getShoppingLists();
      dispatch({
        type: SET_SHOPPING_LISTS,
        payload: {
          lists,
        },
      });
    } catch (error) {
      alert(error);
    }
  };
};

export const createList = (name) => {
  return (dispatch) => {
    createShoppingList(name).then((list) =>
      dispatch({
        type: ADD_SHOPPING_LIST,
        payload: {
          list: {
            ...list,
            products: [],
          },
        },
      }),
    );
  };
};

export const updateList = (list) => {
  return (dispatch) => {
    updateShoppingList({ id: list.id, name: list.name }).then(() =>
      dispatch({
        type: UPDATE_SHOPPING_LIST,
        payload: {
          list,
        },
      }),
    );
  };
};

export const removeList = (list) => {
  return async (dispatch) => {
    try {
      await deleteShoppingList(list.id);
      dispatch({
        type: DELETE_SHOPPING_LIST,
        payload: {
          list,
        },
      });
    } catch (error) {
      alert(error);
      throw error;
    }
  };
};

export const completeList = (list, completed) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_SHOPPING_LIST,
      payload: {
        list: {
          ...list,
          checked: completed,
        },
      },
    });
  };
};

export const addProduct = (list, product) => {
  return (dispatch) => {
    createShoppingListItem(list.id, product).then((newProduct) =>
      dispatch({
        type: UPDATE_SHOPPING_LIST,
        payload: {
          list: {
            ...list,
            products: [...list.products, newProduct],
          },
        },
      }),
    );
  };
};

export const updateProduct = (list, updatedProduct) => {
  return (dispatch) => {
    updateShoppingListItem(list.id, updatedProduct).then(() =>
      dispatch({
        type: UPDATE_SHOPPING_LIST,
        payload: {
          list: {
            ...list,
            products: list.products.map((product) => (product.id === updatedProduct.id ? updatedProduct : product)),
          },
        },
      }),
    );
  };
};

export const removeProduct = (list, removedProduct) => {
  return async (dispatch) => {
    try {
      await deleteShoppingListItem(list.id, removedProduct.id);
      dispatch({
        type: UPDATE_SHOPPING_LIST,
        payload: {
          list: {
            ...list,
            products: list.products.filter((product) => product.id !== removedProduct.id),
          },
        },
      });
    } catch (error) {
      alert(error);
      throw error;
    }
  };
};

export const loadUnits = () => {
  return (dispatch) => {
    getUnits().then((units) =>
      dispatch({
        type: SET_SHOPPING_LIST_UNITS,
        payload: {
          units,
        },
      }),
    );
  };
};
