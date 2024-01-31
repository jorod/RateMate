import {
  SET_FEATURED_PRODUCTS,
  SET_CATEGORY_PRODUCTS,
  SET_CATEGORY_SUBCATEGORIES,
  UPDATE_PRODUCT,
  SET_RATED_PRODUCTS,
  SET_PRODUCT_RATING_CATEGORIES,
} from './actionTypes';
import {
  dislikeProduct,
  getFeaturedProducts,
  getMyRatedProducts,
  getProduct,
  getProductNutrients,
  getProductRatingCategories,
  getProductRatingInfo,
  likeProduct,
  searchProductByCategoryId,
  searchProductBySubcategoryId,
  searchSubcategories,
} from '../../managers/ProductService';

export const setCategoryProducts = (categoryId, products, total) => ({
  type: SET_CATEGORY_PRODUCTS,
  payload: {
    categoryId,
    products,
    total,
  },
});

export const getPopularProducts = () => {
  return (dispatch) => {
    getFeaturedProducts().then((products) =>
      dispatch({
        type: SET_FEATURED_PRODUCTS,
        payload: products,
      }),
    );
  };
};

export const getRatedProducts = () => {
  return (dispatch) => {
    getMyRatedProducts().then((products) =>
      dispatch({
        type: SET_RATED_PRODUCTS,
        payload: products,
      }),
    );
  };
};

export const getCategoryProducts = (categoryId, start, limit) => {
  return async (dispatch) => {
    try {
      const response = await searchProductByCategoryId(categoryId, start, limit);
      dispatch({
        type: SET_CATEGORY_PRODUCTS,
        payload: {
          categoryId,
          products: response.productList,
          total: response.total,
          start,
        },
      });
    } catch (error) {
      alert(error);
    }
  };
};

export const getCategorySubcategories = (categoryId) => {
  return (dispatch) => {
    searchSubcategories(categoryId).then((subcategories) => {
      dispatch({
        type: SET_CATEGORY_SUBCATEGORIES,
        payload: {
          categoryId,
          subcategories,
        },
      });
    });
  };
};

export const getSubcategoryProducts = (categoryId, subcategoryId, start, limit) => {
  return async (dispatch) => {
    try {
      const response = await searchProductBySubcategoryId(subcategoryId, start, limit);
      dispatch({
        type: SET_CATEGORY_PRODUCTS,
        payload: {
          categoryId,
          products: response.productList,
          total: response.total,
          start,
        },
      });
    } catch (error) {
      alert(error);
    }
  };
};

export const loadProduct = (id) => {
  return (dispatch, getState) => {
    getProduct(id).then((product) => {
      const state = getState();
      const categoryId = product.parentCategoryId;
      dispatch({
        type: SET_CATEGORY_PRODUCTS,
        payload: {
          categoryId,
          products: [...(state.products[categoryId]?.products || []), product],
          total: (state.products[categoryId]?.total || 0) + 1,
        },
      });
    });
  };
};

export const rateProduct = (product, like, reloadInfo = false, ratingCategoryId = null, ratingComment = null) => {
  const rateAction = like ? likeProduct : dislikeProduct;

  return (dispatch) => {
    rateAction(product, ratingCategoryId, ratingComment).then((ratedProduct) => {
      dispatch({
        type: UPDATE_PRODUCT,
        payload: ratedProduct,
      });
      if (reloadInfo == true) {
        dispatch(loadProductRatingInfo(ratedProduct));
        // dispatch(loadProductNutrients(ratedProduct));
      }
    });
  };
};

export const loadProductNutrients = (product) => {
  return (dispatch) => {
    getProductNutrients(product.id).then((nutrients) =>
      dispatch({
        type: UPDATE_PRODUCT,
        payload: { ...product, nutrients },
      }),
    );
  };
};

export const loadProductRatingInfo = (product) => {
  return (dispatch) => {
    getProductRatingInfo(product.id).then((ratingInfo) =>
      dispatch({
        type: UPDATE_PRODUCT,
        payload: { ...product,  ratingInfo },
      }),
    );
  };
};

export const loadProductRatingCategories = () => {
  return (dispatch) => {
    getProductRatingCategories().then((categories) =>
      dispatch({
        type: SET_PRODUCT_RATING_CATEGORIES,
        payload: categories,
      }),
    );
  };
};

export const updateProductInfo = (product) => ({
  type: UPDATE_PRODUCT,
  payload: product,
});
