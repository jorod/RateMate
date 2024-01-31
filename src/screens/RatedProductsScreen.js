import React, { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import StarRating from 'react-native-star-rating';
import { useDispatch, useSelector } from 'react-redux';
import { getMyProducts } from '../redux/products/selectors';
import { getRatedProducts } from '../redux/products/actions';

const RatedProductsScreen = ({ navigation }) => {
  const products = useSelector((state) => getMyProducts(state));

  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(getRatedProducts());
    }, []),
  );

  return (
    <View style={styles.container}>
      <View style={[{ flexDirection: 'row' }, styles.labelContainer]}>
        <Image style={styles.catArrow} label="Product" source={require('../assets/images/chevron-right.png')} />
        <Text style={styles.catLabel}>Оценени продукти ({products.length})</Text>
      </View>
      <View style={styles.flatlistContainer}>
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <View style={{ flexDirection: 'row' }}>
                <View
                  style={{
                    flexDirection: 'column',
                    marginLeft: 10,
                    padding: 5,
                    width: '30%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Image style={styles.productImageProductsScreen} label="Product" source={{ uri: item.imageUrl }} />
                </View>
                <Image
                  style={styles.divider}
                  label="Product"
                  source={require('../assets/images/Vertical_Line_Shape.png')}
                />
                <View
                  style={{
                    flexDirection: 'column',
                    paddingLeft: 10,
                    width: '66%',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                  }}
                >
                  <Text style={styles.item}>{item.name.toUpperCase()}</Text>
                  <View style={{ flexDirection: 'row', marginTop: 5, left: -5 }}>
                    <Image
                      style={styles.blueThumb}
                      label="Product"
                      source={require('../assets/images/like_blue.png')}
                    />
                    <Text style={styles.likes}>{item.likes}</Text>
                    <Image
                      style={[styles.blueThumb]}
                      label="Product"
                      source={require('../assets/images/dislike_blue.png')}
                    />
                    <Text style={styles.likes}>{item.dislikes}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', marginTop: 7, width: '90%' }}>
                    <StarRating
                      disabled={true}
                      emptyStarColor="grey"
                      fullStarColor={'grey'}
                      maxStars={5}
                      rating={item.averageRating}
                      starSize={20}
                    />
                    <Text style={styles.catTotal}>
                      {item.totalRateCount} {item.totalRateCount == 1 ? 'ОЦЕНКA' : 'ОЦЕНКИ'}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                <TouchableOpacity
                  style={styles.infoButton}
                  textStyle={{ fontSize: 16 }}
                  onPress={() => {
                    navigation.navigate('ProductInfoScreen', {
                      productId: item.id,
                      categoryId: item.parentCategoryId,
                    });
                  }}
                >
                  <Text style={styles.infoButtonText}>ПРЕГЛЕД</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelContainer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginLeft: 30,
  },
  flatlistContainer: {
    flex: 1,
    borderTopColor: Colors.Grey2,
    borderTopWidth: 1,
  },
  catLabel: {
    fontSize: 20,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: Fonts.FontFamily,
  },
  infoButton: {
    flex: 0.9,
    backgroundColor: Colors.Blue,
    borderRadius: 3,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoButtonText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: Fonts.FontFamilyBold,
  },
  likes: {
    marginRight: 10,
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
    width: '70%',
    height: 100,
    padding: 10,
    resizeMode: 'contain',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  catArrow: {
    height: '25%',
    marginLeft: 10,
    resizeMode: 'contain',
    alignSelf: 'center',
    padding: 4,
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
  },
  blueThumb: {
    width: 40,
    height: 40,
    alignSelf: 'center',
  },
  catTotal: {
    marginLeft: 4,
    alignSelf: 'center',
    marginTop: Platform.OS === 'ios' ? 5 : 0,
    fontSize: 14,
    textAlign: 'left',
    textAlignVertical: 'top',
    fontFamily: Fonts.FontFamily,
  },
});

export default RatedProductsScreen;
