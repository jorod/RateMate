import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

export default ({ ratingInfo, categoriesList }) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <Text style={[styles.contentText, { fontFamily: Fonts.FontFamilyBold }]}>ПРИЧИНИ ЗА ОЦЕНКИТЕ</Text>
      <View style={styles.row}>
        <Image style={styles.thumbIcon} source={require('../assets/images/like_unselected.png')} />
        <Image
          style={[styles.thumbIcon, { marginLeft: 15, marginTop: 6 }]}
          source={require('../assets/images/dislike_unselected.png')}
        />
      </View>
    </View>
    {categoriesList.map((category, index) => {
      let info = ratingInfo.find((info) => info.name === category.value);
      
      if (!info) { return }

      return (
        <View style={[styles.row, { marginHorizontal: 20 }]}>
          <Text style={styles.contentText}>{info.name}</Text> 
          <View style={styles.row}>
            <Text style={[styles.titleText, { marginRight: 15, color: 'black' }]} key={`likes_${index}`}>{info.likes}</Text>
            <Text style={[styles.titleText, { color: 'black' }]} key={`dislikes_${index}`}>{info.dislikes}</Text>
          </View>
        </View>
      )
    })}
    <View style={styles.separator} />
    <View style={styles.total}>
      <Text style={[styles.titleText, { marginRight: 15 }]}>{ratingInfo.reduce((n, { likes }) => n + likes, 0)}</Text>
      <Text style={styles.titleText}>{ratingInfo.reduce((n, { dislikes }) => n + dislikes, 0)}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  thumbIcon: {
    width: 30,
    height: 30,
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
    fontFamily: Fonts.FontFamilyMedium,
    width: 30,
    textAlign: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: Colors.Grey2,
    marginVertical: 10,
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginEnd: 20,
  },
});
