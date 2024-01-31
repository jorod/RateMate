export const getFeaturedProducts = (state) => state.products.featured || [];
export const getMyProducts = (state) => state.products.rated || [];
export const getRatingCategories = (state) => state.products.ratingCategories || [];
export const getProductsForCategory = (state, categoryId) => state.products[categoryId]?.products || [];
export const getTotalForCategory = (state, categoryId) => state.products[categoryId]?.total || 0;
export const getSubcategoriesForCategory = (state, categoryId) => state.products[categoryId]?.subcategories || [];
export const getProductById = (state, id) => {
  let product = undefined;

  Object.keys(state.products).forEach((type) => {
    if (product === undefined) {
      let productsForType = state.products[type];
      let searchArray = Array.isArray(productsForType) ? productsForType : productsForType?.products ?? [];

      let currentProduct = searchArray.find((item) => item.id === id);

      if (currentProduct !== undefined) {
        product = currentProduct;
      }
    }
  });

  return product;
};
