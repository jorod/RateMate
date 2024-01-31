import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

export default ({ title, selected, onPress }) => (
  <TouchableWithoutFeedback onPress={() => onPress()}>
    <View style={[styles.container, { borderBottomWidth: selected === true ? 5 : 0 }]}>
      <Text style={styles.titleText}>{title}</Text>
    </View>
  </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginBottom: -3,
    borderBottomColor: Colors.Blue,
  },
  titleText: {
    color: Colors.Blue,
    paddingBottom: 10,
    paddingTop: 5,
    fontSize: 16,
    fontFamily: Fonts.FontFamilyMedium,
    textAlign: 'center',
  },
});
