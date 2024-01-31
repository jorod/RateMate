import { Share } from 'react-native';
import { getUnitsMap } from '../managers/ShoppingListService';

export const shareList = async (list) => {
  const unitMaps = getUnitsMap();

  try {
    const productsText = list.products
      .map(
        (product) =>
          `${product.productName} - ${product.measure || ''} ${
            unitMaps.find((x) => x.value === product.unit)?.label || ''
          }`,
      )
      .toString()
      .replace(/,/g, '\n');

    const result = await Share.share({
      message: `${list.name}\n\n${productsText}`,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        console.log('shared with activityType', result);
      } else {
        console.log('shared successfully', result);
      }
    }
  } catch (error) {
    alert(error.message);
  }
};

export const isValidPassword = (pass) => {
  return pass !== null && pass !== '' && pass.trim() !== '' && pass.length >= 6;
};

export const isValidEmail = (email) => {
  var regEx =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return regEx.test(email);
};

export const isValidUsername = (name) => {
  return name !== null && name !== '' && name.trim() !== '' && name.length >= 4;
};
