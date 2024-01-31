import React, { useState, useRef, useEffect } from 'react';

import { View, Image, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Text } from 'react-native';
import { Icon } from 'react-native-elements';

import _ from 'lodash';

import { shareList } from '../helpers/utils';
import Fonts from '../constants/Fonts';
import AutocompleteExample from '../components/Autocomplete';
import KeyboardShift from '../components/KeyboardShift';
import ProductListItem from '../components/ProductListItem';
import { useSelector, useDispatch } from 'react-redux';
import { getShoppingListById } from '../redux/shoppingLists/selectors';
import { addProduct, completeList, loadLists, removeProduct, updateProduct } from '../redux/shoppingLists/actions';

const EditListScreen = ({ navigation, route }) => {
  const list = useSelector((state) => getShoppingListById(state, route.params.listId));
  const products = list.products;

  const dispatch = useDispatch();

  const [showSearch, setShowSearch] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);

  const flatListRef = useRef();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: list.name,
    });
  }, [navigation]);

  useEffect(() => {
    const productsCompleted = products.length >= 0 && !products.some((product) => !product.checked);
    if (productsCompleted && !list.checked) {
      dispatch(completeList(list, true));
    }

    if (!productsCompleted && list.checked) {
      dispatch(completeList(list, false));
    }

    setInitialDataLoaded(products.length >= 0);
  }, [products]);

  const getProducts = () => {
    dispatch(loadLists()).finally(() => setIsRefreshing(false));
  };

  const createProduct = (newProduct) => {
    const productToAdd = {
      productId: newProduct.id || 2312,
      productName: _.upperFirst(_.toLower(newProduct.name || newProduct)),
      measure: 1,
      unit: null,
      checked: false,
    };

    dispatch(addProduct(list, productToAdd));
  };

  const productUpdate = (updatedProduct) => {
    dispatch(updateProduct(list, updatedProduct));
  };

  const deleteProduct = async (removedProduct) => {
    await dispatch(removeProduct(list, removedProduct));
  };

  const renderSearch = () => (
    <View style={styles.searchContainer}>
      <AutocompleteExample
        style={{ width: '100%' }}
        withBorder
        shouldFocus={true}
        onPressItem={createProduct}
        onClose={() => setShowSearch(false)}
        returnKeyType="done"
        onReturnPressed={createProduct}
      />
    </View>
  );

  const renderAddProductButton = () => (
    <TouchableOpacity
      style={styles.addButton}
      onPress={() => {
        setShowSearch(!showSearch);
      }}
    >
      <Icon
        name="add"
        size={40}
        color="white"
        containerStyle={{
          flex: 1,
          paddingTop: 10,
          backgroundColor: '#FFE708',
        }}
      />
    </TouchableOpacity>
  );

  const renderHeader = () =>
    products.length > 0 ? (
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.shareContainer} onPress={() => shareList(list)}>
          <Image style={styles.iconButton} source={require('../assets/images/share.png')} />
          <Text style={styles.shareText}>Сподели</Text>
        </TouchableOpacity>
        {products.length > 0 && !products.some((product) => !product.checked) ? (
          <View style={styles.completeContainer}>
            <Text style={styles.completeText}>Списъкът е готов!</Text>
          </View>
        ) : null}
      </View>
    ) : null;

  return (
    <KeyboardShift>
      {() =>
        initialDataLoaded ? (
          <View style={styles.container}>
            {showSearch && renderSearch()}
            <View style={{ flex: 1, zIndex: -1 }}>
              <FlatList
                refreshing={isRefreshing}
                onRefresh={() => {
                  setIsRefreshing(true);
                  getProducts();
                }}
                onContentSizeChange={(w, h) => {
                  h < h && flatListRef.current.scrollToEnd();
                  h = h;
                }}
                ListHeaderComponent={renderHeader}
                ListFooterComponent={() => <View style={{ height: 100 }} />}
                ref={flatListRef}
                data={products}
                showsVerticalScrollIndicator={false}
                keyExtractor={({ id }) => id + ''}
                renderItem={({ item }) => (
                  <ProductListItem item={item} onDelete={() => deleteProduct(item)} onProductUpdate={productUpdate} />
                )}
              />
              {renderAddProductButton()}
            </View>
          </View>
        ) : (
          <ActivityIndicator color="gray" style={{ alignSelf: 'center', flex: 1 }} />
        )
      }
    </KeyboardShift>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: 'white',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  shareContainer: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    marginHorizontal: 20,
    flex: 1,
  },
  searchContainer: {
    marginTop: 10,
    height: 50,
    marginHorizontal: 20,
  },
  iconButton: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  shareText: {
    flex: 1,
    fontSize: 18,
    fontFamily: Fonts.FontFamilyMedium,
    marginLeft: 10,
    paddingTop: 5,
    color: '#717076',
  },
  completeContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#59E16F',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginHorizontal: 20,
  },
  completeText: {
    flex: 1,
    fontSize: 16,
    fontFamily: Fonts.FontFamilyMedium,
    color: '#59E16F',
    padding: 10,
  },
  addButton: {
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 20,
    left: 20,
    borderRadius: 30,
    overflow: 'hidden',
  },
});

export default EditListScreen;
