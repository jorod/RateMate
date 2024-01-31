import Autocomplete from 'react-native-autocomplete-input';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, LogBox } from 'react-native';
import { searchProductsByText } from '../managers/ProductService';
import Fonts from '../constants/Fonts';

class AutocompleteExample extends Component {
  constructor(props) {
    super(props);
    this.navigation = props.navigation;
    this.state = {
      products: [],
      query: '',
    };
  }

  findProduct(query) {
    if (query === '') {
      return [];
    }
  }

  onPressItem = (productId, categoryId) => {
    this.props.onClose();
    let product = this.state.products.filter((p) => p.id === productId)[0];

    this.props.onPressItem
      ? this.props.onPressItem(product)
      : this.navigation.navigate('ProductInfoScreen', { productId, categoryId });
  };

  onChangeQuery = async (newQuery) => {
    this.setState({ query: newQuery });
    try {
      let products = await searchProductsByText(newQuery);
      console.log(products);
      this.setState({ products: products });
    } catch (error) {
      console.log('Fail: ' + error);
    }
  };

  render() {
    const { query } = this.state;
    LogBox.ignoreAllLogs(true);

    return (
      <View style={[styles.container, this.props.style, this.props.shouldFocus && this.props.onFocusStyle]}>
        <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.autocompleteContainer}
          inputContainerStyle={{ borderWidth: this.props.withBorder ? 1 : 0, paddingLeft: 22 }}
          listStyle={{ borderWidth: this.props.withBorder ? 1 : 0, maxHeight: 300 }}
          data={this.state.products}
          defaultValue={query}
          onChangeText={(text) => this.onChangeQuery(text)}
          placeholder="Въведете продукт"
          renderTextInput={(props) => (
            <TextInput
              ref={(input) => {
                this.textInput = input;
              }}
              autoFocus={this.props.shouldFocus}
              onFocus={() => {
                this.props.onFocus ? this.props.onFocus() : {};
              }}
              onBlur={() => {
                this.props.onClose();
              }}
              returnKeyType={this.props.returnKeyType || 'default'}
              onSubmitEditing={() => this.props.onReturnPressed?.(query)}
              {...props}
            />
          )}
          renderItem={({ item, i }) => (
            <TouchableOpacity
              style={{ backgroundColor: 'white', paddingLeft: 10, height: 45 }}
              onPress={() => this.onPressItem(item.id, item.parentCategoryId)}
            >
              <Text style={styles.itemText} ellipsizeMode="tail" numberOfLines={2}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
        <Image
          style={{ width: 14, height: 14, position: 'absolute', left: 7, top: 12, zIndex: 1001 }}
          source={require('../assets/images/search.png')}
        />
        {this.props.shouldFocus && (
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              height: 40,
              width: 40,
              zIndex: 1001,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              this.props.onClose();
            }}
          >
            <Image
              style={{ width: 16, height: 16, alignSelf: 'center' }}
              source={require('../assets/images/close.png')}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
    position: 'absolute',
  },
  autocompleteContainer: {
    backgroundColor: 'white',
    width: '100%',
    alignSelf: 'center',
  },
  itemText: {
    fontSize: 15,
    fontFamily: Fonts.FontFamily,
    margin: 2,
    height: 45,
    top: 8,
    lineHeight: 19,
  },
  descriptionContainer: {
    // `backgroundColor` needs to be set otherwise the
    // autocomplete input will disappear on text input.
    backgroundColor: '#F5FCFF',
    marginTop: 25,
  },
});

export default AutocompleteExample;
