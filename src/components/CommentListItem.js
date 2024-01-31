import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

export default ({ item }) => {
  const { username, dateCreated, text } = item;

  const commentDate = new Date(dateCreated);
  const date = commentDate.getDate();
  const month = commentDate.getMonth();
  const hours = commentDate.getHours();
  const minutes = commentDate.getMinutes();

  const dateString =
    ('0' + date).slice(-2) +
    '/' +
    ('0' + (month + 1)).slice(-2) +
    '/' +
    commentDate.getFullYear() +
    '  ' +
    ('0' + hours).slice(-2) +
    ':' +
    ('0' + minutes).slice(-2);

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{username ?? 'Анонимен'}</Text>
      <Text style={styles.dateText}>{dateString}</Text>
      <Text style={styles.contentText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  titleText: {
    color: Colors.Blue,
    paddingBottom: 5,
    fontSize: 14,
    fontFamily: Fonts.FontFamilyMedium,
  },
  dateText: {
    color: Colors.Grey1,
    paddingBottom: 15,
    fontSize: 14,
    fontFamily: Fonts.FontFamily,
  },
  contentText: {
    paddingBottom: 15,
    fontSize: 14,
    fontFamily: Fonts.FontFamily,
  },
});
