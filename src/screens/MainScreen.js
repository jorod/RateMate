import React, { useState, useCallback, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Modal, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getPopularProducts, loadProductRatingCategories } from '../redux/products/actions';
import { getFeaturedProducts } from '../redux/products/selectors';
import { loadUserDetails } from '../redux/userDetails/actions';

import Colors from '../constants/Colors';
import AutocompleteExample from '../components/Autocomplete';
import Fonts from '../constants/Fonts';

const MainScreen = ({ navigation }) => {
  const featuredProducts = useSelector((state) => getFeaturedProducts(state));
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(getPopularProducts());
      dispatch(loadUserDetails());
    }, []),
  );

  useEffect(() => {
    dispatch(loadProductRatingCategories());
  }, []);

  const renderSearchBar = () => (
    <View style={styles.searchImageBackgroundContainer}>
      <Image
        source={require('../assets/images/main_background.png')}
        style={{ width: '100%', height: '100%', position: 'absolute' }}
      />
      {isModalVisible ? (
        <Modal transparent style={styles.modal}>
          <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View style={[styles.searchContainer, Platform.OS === 'ios' && { marginTop: 70 }]}>
              <AutocompleteExample
                style={{ top: 40 }}
                onFocusStyle={{ top: 17 }}
                onClose={() => setIsModalVisible(false)}
                navigation={navigation}
                shouldFocus={true}
              />
            </View>
          </View>
        </Modal>
      ) : (
        <View style={styles.searchContainer}>
          <AutocompleteExample
            style={{ top: 40 }}
            onClose={() => setIsModalVisible(false)}
            onFocus={() => setIsModalVisible(true)}
            navigation={navigation}
            shouldFocus={false}
          />
        </View>
      )}
    </View>
  );

  const renderCategory = (id, name, imageSrc) => (
    <TouchableOpacity
      underlayColor={Colors.Yellow}
      style={{ ...styles.categoryItem, marginRight: id === 3 ? 10 : 0 }}
      onPress={() => {
        navigation.navigate('CategoryProductsScreen', { categoryId: id });
      }}
    >
      <View>
        <Image style={styles.categoryImage} label={name} source={imageSrc} resizeMode="contain" />
        <Text style={styles.label}>{name}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderCategories = () => (
    <View style={styles.containerCategories}>
      {renderCategory(1, 'МЛЕЧНИ', require('../assets/images/cheese.png'))}
      {renderCategory(2, 'КОЛБАСИ', require('../assets/images/sausage.png'))}
      {renderCategory(3, 'ЗАХАРНИ', require('../assets/images/cookie.png'))}
    </View>
  );

  const renderPopular = () => (
    <View style={styles.containerPopularProducts}>
      <Text style={styles.labelPopularTitle}>ПОПУЛЯРНИ ДНЕС</Text>
      <View style={styles.containerPopularProductsSlider}>
        <FlatList
          horizontal
          data={featuredProducts}
          extraData={featuredProducts}
          keyExtractor={({ id }) => id + ''}
          renderItem={({ item }) => (
            <View style={styles.popularItem}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ProductInfoScreen', {
                    productId: item.id,
                    categoryId: item.parentCategoryId,
                  });
                }}
              >
                <View style={styles.popularItemContainer}>
                  <View style={{ flex: 0.4, width: 80 }}>
                    <Image
                      style={styles.popularImage}
                      label="rate mate product"
                      source={item.imageUrl ? { uri: item.imageUrl } : require('../assets/images/no-image.png')}
                    />
                  </View>
                  <View style={styles.popularItemTitleContainer}>
                    <Text style={styles.labelPopular} numberOfLines={3} ellipsizeMode={'tail'}>
                      {item.name.toUpperCase()}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderSearchBar()}
      {renderCategories()}
      {renderPopular()}
    </View>
  );
};

const styles = StyleSheet.create({
  searchImageBackgroundContainer: {
    flex: 1.4,
    width: '100%',
    height: '100%',
  },
  searchContainer: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
  searchInput: {
    width: '75%',
    backgroundColor: Colors.White,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    fontSize: 20,
    fontFamily: Fonts.FontFamily,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  searchImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  searchIconContainer: {
    width: 33,
    height: 48,
    padding: 5,
    backgroundColor: Colors.White,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  modal: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 300,
    bottom: 0,
    zIndex: 1000,
  },
  label: {
    width: '100%',
    marginTop: 25,
    color: Colors.Grey1,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: Fonts.FontFamilyBold,
  },
  labelPopularTitle: {
    marginTop: 20,
    marginBottom: 10,
    color: Colors.Grey1,
    fontSize: 19,
    fontFamily: Fonts.FontFamily,
  },
  labelPopular: {
    marginTop: 20,
    marginBottom: 20,
    color: Colors.Grey1,
    fontSize: 14,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: Fonts.FontFamily,
  },
  popularItemTitleContainer: {
    flex: 0.6,
    width: 90,
    alignSelf: 'flex-start',
  },
  categoryImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  popularImage: {
    height: 70,
    width: 70,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: Colors.White,
  },
  categoryItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#316EAD',
    borderWidth: 0.5,
    marginLeft: 10,
    shadowColor: 'rgba(0,0,0, .5)',
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
  popularItemContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  popularItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerCategories: {
    flex: 1.5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 20,
    marginBottom: 10,
  },
  containerPopularProducts: {
    flex: 2,
    justifyContent: 'flex-start',
    backgroundColor: Colors.White,
    alignItems: 'center',
  },
  containerPopularProductsSlider: {
    flex: 2.5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 15,
    backgroundColor: Colors.White,
  },
});

export default MainScreen;
