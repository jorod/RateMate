export const getShoppingLists = (state) => state.shoppingLists.lists || [];
export const getShoppingListById = (state, id) => state.shoppingLists.lists.filter((list) => list.id === id)[0] || {};
export const getShoppingListUnits = (state) => state.shoppingLists.units || [];
