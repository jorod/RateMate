import * as Analytics from 'expo-firebase-analytics';

import Product from '../models/Product';
import { makeRequest } from './ApiService';
import Subcategory from '../models/Subcategory';

// export const getCategoryProducts = (categoryId) => {
//   return products.filter(product => product.parentCategoryId == categoryId)
// }

// export const getCategorySubcategories = (categoryId) =>{
//   var allSubcategoriesByCategoryId = subcategories.filter(catsubcategories => catsubcategories.parentCategoryId == categoryId)
//   var allSubcategoriesNames = []

//   allSubcategoriesByCategoryId.map((subcategory) => {
//     if (subcategory.name !== '') {
//       allSubcategoriesNames.push(subcategory.name);
//     }
//   });

//   return allSubcategoriesNames
// }

// export const getSubcategories = (categoryId) => {
//   return subcategories.filter(catsubcategories => catsubcategories.parentCategoryId == categoryId)
// }

// export const getSubcategoryProducts = (subcategoryId) => {
//   return products.filter(product => product.parentSubcategoryId == subcategoryId)
// }

// export const getActualSubcategoryProducts = async (subcategoryId) => {
//   try {
//     let allProducts = await searchProductBySubcategoryId(subcategoryId, 0, 20)
//     return allProducts
//   }
//   catch (error) {
//     console.error(error);
//   }
// }

export const getFeaturedProducts = async () => {
  try {
    let response = await makeRequest('GET', {}, '/product/featured');

    return response.data.map((product) => new Product(product));
  } catch (error) {
    console.error('Featured Products fails with error: ' + error);
    throw error;
  }
};

export const getMyRatedProducts = async () => {
  try {
    let response = await makeRequest('GET', {}, '/product/myRated');

    return response.data.map((product) => new Product(product));
  } catch (error) {
    console.error('Get My rated products fails with error: ' + error);
    throw error;
  }
};

export const getProductRatingCategories = async () => {
  try {
    let response = await makeRequest('GET', {}, '/rating/ratingCategoriesList');

    return response.data;
  } catch (error) {
    console.error('Featured Products fails with error: ' + error);
    throw error;
  }
};

export const getProduct = async (productId) => {
  let response = await makeRequest('GET', {}, '/product/' + productId);

  return new Product(response.data);
};

export const updateProduct = async (productId, liked, disliked, rating, ratingCategoryId, ratingComment) => {
  let data = { rating: rating, liked: liked, disliked: disliked, ratingCategoryId: ratingCategoryId, ratingComment: ratingComment };

  let response = await makeRequest('POST', {}, '/rating/' + productId, data);

  return new Product(response.data);
};

export const likeProduct = async (product, ratingCategoryId, ratingComment) => {
  Analytics.logEvent('like_product');

  try {
    let updatedProduct = await updateProduct(product.id, !product.likedByMe, false, product.averageRating, ratingCategoryId, ratingComment);
    return updatedProduct;
  } catch (error) {
    console.error('Like Product fails with error: ' + error);
    throw error;
  }
};

export const dislikeProduct = async (product, ratingCategoryId, ratingComment) => {
  Analytics.logEvent('dislike_product');

  try {
    let updatedProduct = await updateProduct(product.id, false, !product.dislikedByMe, product.averageRating, ratingCategoryId, ratingComment);
    return updatedProduct;
  } catch (error) {
    console.error('Dislike Product fails with error: ' + error);
    throw error;
  }
};

// export const searchCategories = async () => {
//   try {
//     let response = await makeRequest('GET', {}, '/category')
//     return response.data;
//   } catch (error) {
//     console.error('Search Categoriess fails with error: ' + error)
//     throw error
//   }
// }

export const searchSubcategories = async (id) => {
  try {
    let params = { categoryId: id };

    let response = await makeRequest('GET', params, '/subcategory');

    return response.data.map((subcat) => new Subcategory(subcat));
  } catch (error) {
    console.error('Get Subcategories fails with error: ' + error);
    throw error;
  }
};

export const searchProductsByText = async (text) => {
  try {
    let params = { text: text };

    let response = await makeRequest('GET', params, '/product');

    return response.data;
  } catch (error) {
    console.error('Get Product fails with error: ' + error);
    throw error;
  }
};

export const searchProductByCategoryId = async (id, start, limit) => {
  try {
    let params = { categoryId: id, start: start, limit: limit };

    let response = await makeRequest('GET', params, '/product/findByCategory');

    let responseJson = response.data;
    let allProducts = responseJson.productList.map((product) => new Product(product));

    return { productList: allProducts, total: responseJson.total };
  } catch (error) {
    console.error('Search Product by Category fails with error: ' + error);
    throw error;
  }
};

export const searchProductBySubcategoryId = async (id, start, limit) => {
  try {
    let params = { subcategoryId: id, start: start, limit: limit };

    let response = await makeRequest('GET', params, '/product/findBySubcategory');

    let responseJson = response.data;
    let allProducts = responseJson.productList.map((product) => new Product(product));

    return { productList: allProducts, total: responseJson.total };
  } catch (error) {
    console.error('Search Product by SubCategory fails with error: ' + error);
    throw error;
  }
};

// export const getProductRating = async (id) => {
//   try {
//     let params = { productId: id }

//     let response = await makeRequest('GET', params, '/rating/' + id)
//     return response.data;
//   } catch (error) {
//     console.error('Get Product Raiting fails with error: ' + error)
//     throw error
//   }
// }

// export const updateProductRating = async (productId, rating, liked, disliked) => {
//   try {
//     let data = { rating: rating, liked: liked, disliked: disliked }

//     let response = await makeRequest('POST', {}, '/rating/' + productId, data)
//     return response.data;
//   } catch (error) {
//     console.error('Update Product Rating fails with error: ' + error)
//     throw error
//   }
// }

export const getProductNutrients = async (id) => {
  try {
    let params = { productId: id };

    let response = await makeRequest('GET', params, '/nutrient');
    return response.data;
  } catch (error) {
    console.error('Get Product Nutrients fails with error: ' + error);
    throw error;
  }
};

export const getProductRatingInfo = async (id) => {
  try {
    let response = await makeRequest('GET', {}, '/rating/ratingSummary/' + id);

    let dataArray = response.data.map((category) => {
      let defaultCategory = { 'name': category.ratingCategoryName, 'likes': 0, 'dislikes': 0 }
      
      if (category.liked === true) {
        return { ...defaultCategory, 'likes': category.count }
      } else if (category.disliked === true) {
        return { ...defaultCategory, 'dislikes': category.count }
      } else {
        return defaultCategory
      }
    })

    let categories = [];

    dataArray.forEach(element => {
      const index = categories.findIndex(e => e.name === element.name);

      if (index > -1) {
        categories[index].likes += element.likes;
        categories[index].dislikes += element.dislikes; 
      } else {
        categories.push(element)
      }
    });

    return categories;
  } catch (error) {
    console.error('Get Product Raiting Info fails with error: ' + error);
    throw error;
  }
};

export const sendSignal = async (text, productId) => {
  try {
    await makeRequest('POST', {}, '/signal/' + productId, text);
  } catch (error) {
    console.error('Send Signal Product fail with error: ' + error);
    throw error;
  }
};
