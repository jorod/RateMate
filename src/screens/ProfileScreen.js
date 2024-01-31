import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../redux/auth/actions';
import { getUser } from '../redux/auth/selectors';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import AppStyles from '../config/AppStyles';

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => getUser(state));

  return (
    <ScrollView style={AppStyles.main}>
      <View style={styles.containerHeader}>
        <Image
          style={styles.facebookImage}
          label="rate mate logo"
          source={user.avatar ? { uri: user.avatar } : require('../assets/images/avatar.png')}
        />
        <Text style={styles.label}>{user.username}</Text>
        <Text style={[styles.label, { fontSize: 15, fontWeight: 'bold' }]}>{user.email}</Text>
      </View>
      <TouchableOpacity
        style={styles.containerProfileItems}
        onPress={() => {
          navigation.navigate('UserInfoScreen');
        }}
      >
        <View style={styles.profileListItem}>
          <View style={styles.textContainer}>
            <Text style={styles.label}>Моите данни</Text>
          </View>
          <View style={styles.arrowContainer}>
            <Image
              style={styles.arrowImage}
              label="rate mate logo"
              source={require('../assets/images/chevron-right.png')}
            />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.containerProfileItems}
        onPress={() => {
          navigation.navigate('RatedProductsScreen');
        }}
      >
        <View style={styles.profileListItem}>
          <View style={styles.textContainer}>
            <Text style={styles.label}>Оценени продукти</Text>
          </View>
          <View style={styles.arrowContainer}>
            <Image
              style={styles.arrowImage}
              label="rate mate logo"
              source={require('../assets/images/chevron-right.png')}
            />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.containerProfileItems}
        onPress={() => {
          navigation.navigate('ShoppingListTab');
        }}
      >
        <View style={styles.profileListItem}>
          <View style={styles.textContainer}>
            <Text style={styles.label}>Списъци с покупки</Text>
          </View>
          <View style={styles.arrowContainer}>
            <Image
              style={styles.arrowImage}
              label="rate mate logo"
              source={require('../assets/images/chevron-right.png')}
            />
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.containerPolicyItems}>
        <View style={styles.profileListItem}>
          <View style={styles.textContainer}>
            <Text
              style={styles.label}
              onPress={() => {
                navigation.navigate('EULAScreen', { showAccept: false });
              }}
            >
              Условия на RateMate
            </Text>
          </View>
        </View>
        <View style={styles.profileListItem}>
          <View style={styles.textContainer}>
            <Text
              style={styles.label}
              onPress={() => {
                Linking.openURL('mailto:team@ratemate.eu');
              }}
            >
              Свържи се с нас
            </Text>
          </View>
        </View>
        <View style={styles.profileListItem}>
          <View style={styles.textContainer}>
            <TouchableOpacity onPress={() => dispatch(userLogout())}>
              <Text style={styles.label}>Изход</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    padding: 10,
  },
  label: {
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    color: Colors.Grey2,
    fontSize: 20,
    fontFamily: Fonts.FontFamily,
  },
  arrowImage: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    alignSelf: 'flex-end',
  },
  facebookImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    resizeMode: 'contain',
  },
  profileListItem: {
    width: '90%',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    padding: 20,
    flexDirection: 'row',
  },
  containerProfileItems: {
    marginTop: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderTopColor: Colors.Grey2,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Grey2,
  },
  containerPolicyItems: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  arrowContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default ProfileScreen;
