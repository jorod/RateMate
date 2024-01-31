import React from 'react';
import { View, Image, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import Fonts from '../constants/Fonts';
import { getUnitsMap } from '../managers/ShoppingListService';
import withSwipeDelete from './withSwipeDelete';
import CheckMark from './CheckMark';

const ChevronIcon = () => (
  <Image
    style={{ width: 10, height: 5, resizeMode: 'contain' }}
    label="select-icon"
    source={require('../assets/images/chevron-down.png')}
  />
);

const ProductListItem = ({ item, onProductUpdate }) => {
  return (
    <View style={styles.listItem}>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => onProductUpdate({ ...item, checked: !item.checked })}>
          <CheckMark enabled={item.checked} />
        </TouchableOpacity>
        <Text style={[styles.nameText, { textDecorationLine: item.checked ? 'line-through' : 'none' }]}>
          {item.productName}
        </Text>
      </View>
      <View style={{ flex: 1, flexDirection: 'row', paddingVertical: 5 }}>
        <TextInput
          style={styles.amountInput}
          placeholder="Количество"
          maxLength={5}
          onEndEditing={(event) => onProductUpdate({ ...item, measure: event.nativeEvent.text })}
          keyboardType="decimal-pad"
          defaultValue={String(item.measure) || ''}
        />
        <View style={styles.pickerSelect}>
          <RNPickerSelect
            placeholder={{ label: '-', value: null, color: '#9EA0A4' }}
            onValueChange={(value) => onProductUpdate({ ...item, unit: value })}
            items={getUnitsMap()}
            style={{
              ...pickerSelectStyles,
              iconContainer: {
                top: 13,
                right: 10,
              },
            }}
            value={item.unit}
            useNativeAndroidPickerStyle={false}
            Icon={ChevronIcon}
          />
        </View>
      </View>
    </View>
  );
};

export default withSwipeDelete(ProductListItem, {
  borderWidth: 1,
  borderRadius: 5,
  borderColor: '#E6E7E8',
  borderBottomWidth: 0,
  shadowColor: '#000000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
  marginHorizontal: 20,
  marginTop: 20,
});

const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  nameText: {
    flex: 1,
    alignSelf: 'center',
    fontSize: 16,
    fontFamily: Fonts.FontFamilyMedium,
    marginHorizontal: 20,
    color: '#717076',
  },
  pickerSelect: {
    flex: 0.25,
    marginHorizontal: 10,
    height: 30,
  },
  amountInput: {
    paddingLeft: 10,
    marginLeft: 50,
    borderRadius: 8,
    height: 30,
    fontSize: 14,
    flex: 0.2,
    borderWidth: 1,
    borderColor: '#E6E7E8',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    textAlign: 'center',
    fontSize: 14,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: '#E6E7E8',
    borderRadius: 8,
    color: 'black',
    paddingRight: 15,
  },
  inputAndroid: {
    textAlign: 'center',
    fontSize: 14,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: '#E6E7E8',
    borderRadius: 8,
    color: 'black',
    paddingRight: 15,
  },
});
