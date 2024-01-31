import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

export default ({ nutrients }) => {
  const { energy, fats, saturatedFats, carbohydrates, sugars, proteins, salt, fiber } = nutrients;

  const titles = [
    'Енергийност (kcal/kJ)',
    'Въглехидрати (g)',
    '- от които захари (g)',
    'Мазнини (g)',
    '- от които наситени (g)',
    'Протеини (g)',
    'Сол (g)',
    'Фибри (g)',
  ];

  const values = [energy, carbohydrates, sugars, fats, saturatedFats, proteins, salt, fiber];

  return (
    <View style={styles.container}>
      <Text style={[styles.contentText, { paddingBottom: 10, fontFamily: Fonts.FontFamilyBold }]}>
        Хранителни стойности за 100 g:
      </Text>
      <View style={styles.row}>
        <View>
          {titles.map((title, index) => {
            return (
              <Text style={styles.contentText} key={index}>
                {title}
              </Text>
            );
          })}
        </View>
        <View>
          {values.map((value, index) => {
            return (
              <Text style={styles.titleText} key={index}>
                {values.indexOf(value) === 0 || value > 0 ? value : '-'}
              </Text>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    marginHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentText: {
    fontSize: 14,
    fontFamily: Fonts.FontFamily,
    lineHeight: 20,
  },
  titleText: {
    color: Colors.Blue,
    fontSize: 14,
    lineHeight: 20,
    paddingEnd: 20,
    fontFamily: Fonts.FontFamilyMedium,
  },
});
