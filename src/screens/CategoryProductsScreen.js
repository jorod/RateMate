import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Badge } from 'react-native-elements';
import ModalDropdown from 'react-native-modal-dropdown';
import StarRating from 'react-native-star-rating';
import Spinner from 'react-native-loading-spinner-overlay';

import RateModal from '../components/RateModal';

import Fonts from '../constants/Fonts';
import Colors from '../constants/Colors';

import {
  getCategoryProducts,
  getCategorySubcategories,
  getSubcategoryProducts,
  rateProduct,
  setCategoryProducts,
} from '../redux/products/actions';
import { getProductsForCategory, getTotalForCategory, getSubcategoriesForCategory, getRatingCategories } from '../redux/products/selectors';

const PAGE_SIZE = 20;

const categories = Object.freeze({
  1: { title: 'МЛЕЧНИ', icon: require('../assets/images/cheese.png') },
  2: { title: 'КОЛБАСИ', icon: require('../assets/images/sausage.png') },
  3: { title: 'ЗАХАРНИ', icon: require('../assets/images/cookie.png') },
});

function CategoryProductsScreen({ navigation, route }) {
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [rateModalVisible, setRateModalVisible] = useState(false);
  const [isLikeModalShown, setLikeModalShown] = useState(false);
  const [ratedProduct, setRatedProduct] = useState(null);

  const categoryId = route.params.categoryId;

  const dispatch = useDispatch();
  const products = useSelector((state) => getProductsForCategory(state, categoryId));
  const total = useSelector((state) => getTotalForCategory(state, categoryId));
  const subcategories = useSelector((state) => getSubcategoriesForCategory(state, categoryId));
  const ratingCategories = useSelector((state) => getRatingCategories(state)) || [];

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.header}>
          <Image source={categories[categoryId].icon} style={styles.headerIcon} />
          <Text style={styles.headerText}>{categories[categoryId].title}</Text>
        </View>
      ),
    });
  }, [categoryId, navigation]);

  useEffect(() => {
    dispatch(setCategoryProducts(categoryId, [], 0));
    loadProducts(0);
    dispatch(getCategorySubcategories(categoryId));
  }, []);

  useEffect(() => {
    dispatch(setCategoryProducts(categoryId, [], 0));
    loadProducts(0);
  }, [selectedSubcategory]);

  const loadProducts = (startIndex) => {
    if (isAnimating || (products.length > 0 && products.length >= total && startIndex === undefined)) {
      return;
    }

    setIsAnimating(true);

    selectedSubcategory
      ? dispatch(
          getSubcategoryProducts(categoryId, selectedSubcategory.id, startIndex ?? products.length, PAGE_SIZE),
        ).finally(() => setIsAnimating(false))
      : dispatch(getCategoryProducts(categoryId, startIndex ?? products.length, PAGE_SIZE)).finally(() =>
          setIsAnimating(false),
        );
  };

  const onSelectSubcategory = (idx) => {
    setSelectedSubcategory(subcategories[idx]);
  };

  const onCloseSubcategory = () => {
    setSelectedSubcategory(null);
  };

  const handleLikeProduct = (product) => {
    if (product.likedByMe) {
      dispatch(rateProduct(product, true))
      return
    }
    
    setRatedProduct(product);
    setLikeModalShown(true);
    setRateModalVisible(true);
  }

  const handleDislikeProduct = (product) => {
    if (product.dislikedByMe) {
      dispatch(rateProduct(product, false))
      return
    }

    setRatedProduct(product);
    setLikeModalShown(false);
    setRateModalVisible(true);
  }

  const handleRateProduct = (option, comment) => {
    dispatch(rateProduct(ratedProduct, isLikeModalShown, false, option, comment));
    setRateModalVisible(false);
  };

  const closeRateModal = () => {
    setRatedProduct(null);
    setRateModalVisible(false);
  }

  console.log(ratedProduct);

  const renderSubcategoryRow = (rowData, rowID) => (
    <View style={{ flexDirection: 'row', width: '80%' }}>
      <Text style={styles.dropdownStyleText}>{rowData}</Text>
      <Text style={styles.dropdownStyleTextResults}>({subcategories[rowID].productsCount})</Text>
    </View>
  );

  const renderSubcategorySelect = () => (
    <View style={styles.labelContainer}>
      <ModalDropdown
        options={subcategories.map((subcat) => subcat.name)}
        onSelect={(idx) => {
          onSelectSubcategory(idx);
        }}
        animated={false}
        renderSeparator={() => <View />}
        renderRow={renderSubcategoryRow}
        style={styles.dropDown}
        dropdownStyle={styles.dropdownStyle}
      >
        <View style={styles.wrapperSubcategoryDropdownView}>
          <Image style={styles.catArrow} source={require('../assets/images/filter_icon.png')} />
          <Text style={[styles.catLabel, { paddingEnd: 20 }]}>ФИЛТЪР</Text>
          {selectedSubcategory && (
            <>
              <Text style={styles.catLabel} ellipsizeMode={'tail'}>
                {selectedSubcategory.name.toUpperCase()}
              </Text>
              <Text style={styles.catLabel}> ({selectedSubcategory.productsCount})</Text>
              <TouchableOpacity
                style={styles.catArrow}
                onPress={() => {
                  onCloseSubcategory();
                }}
              >
                <Image style={styles.closeSubcategoryIcon} source={require('../assets/images/cat_close_dd.png')} />
              </TouchableOpacity>
            </>
          )}
        </View>
      </ModalDropdown>
    </View>
  );

  const renderProductImageSection = (item) => (
    <TouchableOpacity
      style={styles.productImageProductsScreen}
      onPress={() => {
        navigation.navigate('ProductInfoScreen', { productId: item.id, categoryId: categoryId });
      }}
    >
      <Image
        style={{ width: '100%', height: 100, resizeMode: 'contain' }}
        label="Product"
        source={{ uri: item.imageUrl }}
      />
    </TouchableOpacity>
  );

  const renderProductInfoSection = (item) => (
    <View
      style={{
        flexDirection: 'column',
        paddingLeft: 10,
        width: '50%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      }}
    >
      <Text style={styles.item}>{item.name.toUpperCase()}</Text>
      <View style={{ flexDirection: 'row', marginTop: 5, flexWrap: 'wrap' }}>
        <View style={{ flexDirection: 'row' }}>
          <Image style={styles.blueThumb} label="Product" source={require('../assets/images/like_blue.png')} />
          <Text style={styles.likes}>{item.likes.toLocaleString('en')}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Image style={[styles.blueThumb]} label="Product" source={require('../assets/images/dislike_blue.png')} />
          <Text style={styles.likes}>{item.dislikes.toLocaleString('en')}</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 10, width: '90%' }}>
        <StarRating
          disabled={true}
          emptyStarColor="grey"
          fullStarColor={'grey'}
          maxStars={5}
          rating={item.averageRating ? item.averageRating : 0}
          starSize={16}
        />
        <Text style={styles.catTotal}>
          {item.totalRateCount} {item.totalRateCount == 1 ? 'ОЦЕНКA' : 'ОЦЕНКИ'}
        </Text>
      </View>
    </View>
  );

  const renderActionsRow = (item) => (
    <View style={{ flex: 0.3, flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
      <View style={styles.greyThumbContainer}>
        <TouchableWithoutFeedback onPress={() => handleLikeProduct(item)}>
          <Image
            style={[styles.greyThumb, { bottom: 2, left: 15 }]}
            label="Like"
            source={
              item.likedByMe
                ? require('../assets/images/like_selected.png')
                : require('../assets/images/like_unselected.png')
            }
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => handleDislikeProduct(item)}>
          <Image
            style={[styles.greyThumb, { top: 2, right: 8 }]}
            label="Dislike"
            source={
              item.dislikedByMe
                ? require('../assets/images/dislike_selected.png')
                : require('../assets/images/dislike_unselected.png')
            }
          />
        </TouchableWithoutFeedback>
        <TouchableOpacity
          style={{ alignSelf: 'center', right: 25 }}
          onPress={() => {
            navigation.navigate('ProductInfoScreen', { productId: item.id, categoryId: categoryId });
          }}
        >
          <>
            <Image
              style={{ resizeMode: 'contain', width: 22 }}
              label="Comments"
              source={require('../assets/images/comments.png')}
            />
            {item.totalComments > 0 && (
              <Badge
                value={item.totalComments}
                textStyle={{ color: '#316EAD', fontSize: 10, fontFamily: Fonts.FontFamilyBold, top: 1 }}
                badgeStyle={{ backgroundColor: Colors.Yellow }}
                containerStyle={{ position: 'absolute', top: -8, right: -10}}
              />
            )}
          </>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.infoButton}
        onPress={() => {
          navigation.navigate('ProductInfoScreen', {
            productId: item.id,
            categoryId: categoryId,
          });
        }}
      >
        <Text style={styles.infoButtonText}>ПРЕГЛЕД</Text>
      </TouchableOpacity>
    </View>
  );

  const renderItemRow = (item) => {
    return (
      <View style={styles.listItem}>
        <View style={{ flexDirection: 'row' }}>
          {renderProductImageSection(item)}
          <Image style={styles.divider} label="Product" source={require('../assets/images/Vertical_Line_Shape.png')} />
          {renderProductInfoSection(item)}
        </View>
        {renderActionsRow(item)}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Spinner visible={isAnimating} />
      {renderSubcategorySelect()}
      <View style={styles.flatlistContainer}>
        <FlatList
          data={products}
          onEndReached={() => loadProducts()}
          onEndThreshold={0.1}
          keyExtractor={({ id }) => id + ''}
          renderItem={({ item }) => renderItemRow(item)}
        />
      </View>
      <RateModal
        visible={rateModalVisible}
        options={ratingCategories}
        onClose={closeRateModal}
        onSubmit={handleRateProduct}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 0.75,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIcon: {
    width: 27,
    height: 24,
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    marginLeft: 5,
    fontFamily: Fonts.FontFamilyBold,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.White,
  },
  labelContainer: {
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  flatlistContainer: {
    flex: 1,
    borderTopColor: Colors.Grey2,
    borderTopWidth: 1,
  },
  catLabel: {
    fontSize: 18,
    fontFamily: Fonts.FontFamily,
    paddingTop: 5,
  },
  infoButton: {
    flex: 0.5,
    backgroundColor: Colors.Blue,
    borderBottomRightRadius: 3,
    borderTopRightRadius: 3,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoButtonText: {
    alignSelf: 'center',
    marginTop: Platform.OS === 'ios' ? 5 : 0,
    color: '#fff',
    fontSize: 18,
    fontFamily: Fonts.FontFamilyBold,
  },
  likes: {
    alignSelf: 'center',
  },
  listItem: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    borderTopColor: Colors.Graphite,
    paddingTop: 20,
  },
  productImageProductsScreen: {
    width: '50%',
    height: 100,
    padding: 10,
    resizeMode: 'contain',
  },
  catArrow: {
    marginHorizontal: 5,
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  dropDown: {
    flex: 1,
    marginLeft: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeSubcategoryIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  divider: {
    width: 1,
    height: '100%',
    paddingTop: 10,
    paddingBottom: 10,
  },
  item: {
    width: '90%',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: Fonts.FontFamily,
    lineHeight: 20,
  },
  blueThumb: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  greyThumb: {
    width: '20%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  greyThumbContainer: {
    flex: 0.5,
    flexDirection: 'row',
    height: 40,
    borderLeftColor: Colors.Graphite,
    borderBottomColor: Colors.Graphite,
    borderTopColor: Colors.Graphite,
    borderBottomLeftRadius: 3,
    borderTopLeftRadius: 3,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  catTotal: {
    marginLeft: 4,
    marginTop: Platform.OS === 'ios' ? 2.5 : 0,
    fontSize: 14,
    alignSelf: 'center',
    textAlign: 'left',
    textAlignVertical: 'center',
    fontFamily: Fonts.FontFamily,
  },
  wrapperSubcategoryDropdownView: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  dropdownStyle: {
    backgroundColor: Colors.LightGrey4,
  },
  dropdownStyleText: {
    width: '97%',
    margin: 5,
    padding: 3,
    fontSize: 18,
    textAlign: 'left',
    textAlignVertical: 'center',
    color: Colors.DarkGrey1,
    lineHeight: 30,
    fontFamily: Fonts.FontFamily,
  },
  dropdownStyleTextResults: {
    margin: 5,
    padding: 3,
    fontSize: 18,
    textAlign: 'right',
    textAlignVertical: 'center',
    color: Colors.Blue,
    lineHeight: 30,
    fontFamily: Fonts.FontFamily,
  },
});

export default CategoryProductsScreen;
