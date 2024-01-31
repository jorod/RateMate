import { combineReducers } from 'redux';
import userReducer from './auth/reducer';
import userDetailsReducer from './userDetails/reducer';
import productsReducer from './products/reducer';
import shoppingListsReducer from './shoppingLists/reducer';

export default combineReducers({
  user: userReducer,
  userDetails: userDetailsReducer,
  products: productsReducer,
  shoppingLists: shoppingListsReducer,
});
