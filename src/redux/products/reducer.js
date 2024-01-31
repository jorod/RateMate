import {
  SET_FEATURED_PRODUCTS,
  SET_CATEGORY_PRODUCTS,
  SET_CATEGORY_SUBCATEGORIES,
  UPDATE_PRODUCT,
  SET_RATED_PRODUCTS,
  SET_PRODUCT_RATING_CATEGORIES,
} from './actionTypes';

const productsReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_FEATURED_PRODUCTS: {
      return {
        ...state,
        featured: action.payload,
      };
    }
    case SET_RATED_PRODUCTS: {
      return {
        ...state,
        rated: action.payload,
      };
    }
    case SET_PRODUCT_RATING_CATEGORIES: {
      return {
        ...state,
        ratingCategories: action.payload,
      }
    }
    case SET_CATEGORY_PRODUCTS: {
      const oldProducts = state[action.payload.categoryId]?.products || [];
      const newProducts = action.payload.products;

      const allProducts =
        action.payload.start > 0 ? Array.from(new Set([...oldProducts, ...newProducts])) : newProducts;

      return {
        ...state,
        [action.payload.categoryId]: {
          ...state[action.payload.categoryId],
          products: allProducts,
          total: action.payload.total,
        },
      };
    }
    case SET_CATEGORY_SUBCATEGORIES: {
      return {
        ...state,
        [action.payload.categoryId]: {
          ...state[action.payload.categoryId],
          subcategories: action.payload.subcategories,
        },
      };
    }
    case UPDATE_PRODUCT: {
      const updatedProduct = action.payload;

      // console.log('----PRODUCT----- :  ', updatedProduct)

      const currentCategoryProducts = state[updatedProduct.parentCategoryId]?.products;
      const updatedCategoryProducts = currentCategoryProducts?.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product,
      );

      const updatedFeaturedProducts = state.featured?.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product,
      );

      const updatedRatedProducts = state.rated?.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product,
      );

      return {
        ...state,
        [updatedProduct.parentCategoryId]: {
          ...state[updatedProduct.parentCategoryId],
          products: updatedCategoryProducts,
        },
        featured: updatedFeaturedProducts,
        rated: updatedRatedProducts,
      };
    }
    default: {
      return state;
    }
  }
};

export default productsReducer;
