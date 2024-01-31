import {
  ADD_SHOPPING_LIST,
  DELETE_SHOPPING_LIST,
  SET_SHOPPING_LISTS,
  SET_SHOPPING_LIST_UNITS,
  UPDATE_SHOPPING_LIST,
} from './actionTypes';

const shoppingListsReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case SET_SHOPPING_LISTS: {
      return {
        ...state,
        lists: payload.lists,
      };
    }
    case ADD_SHOPPING_LIST: {
      return {
        ...state,
        lists: [...(state.lists || []), payload.list],
      };
    }
    case UPDATE_SHOPPING_LIST: {
      return {
        ...state,
        lists: state.lists.map((list) => (list.id === payload.list.id ? payload.list : list)),
      };
    }
    case DELETE_SHOPPING_LIST: {
      return {
        ...state,
        lists: (state.lists || []).filter((list) => list !== payload.list),
      };
    }
    case SET_SHOPPING_LIST_UNITS: {
      return {
        ...state,
        units: payload.units,
      };
    }
    // case SET_CATEGORY_SUBCATEGORIES: {
    //   return {
    //     ...state,
    //     [action.payload.categoryId]: {
    //       ...state[action.payload.categoryId],
    //       subcategories: action.payload.subcategories,
    //     }
    //   }
    // }
    default: {
      return state;
    }
  }
};

export default shoppingListsReducer;
