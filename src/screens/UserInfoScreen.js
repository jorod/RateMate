import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import _ from 'lodash';
import RNPickerSelect from 'react-native-picker-select';

import { loadGenders, loadLocations, loadMaritalStatuses, loadUserDetails, updateDetails } from '../redux/userDetails/actions';
import { getGendersList, getLocationsList, getMaritalStatusesList, getUserDetails } from '../redux/userDetails/selectors';

import Fonts from '../constants/Fonts';
import AppStyles from '../config/AppStyles';

const ChevronIcon = () => (
    <Image
      style={{ width: 10, height: 5, resizeMode: 'contain' }}
      label="select-icon"
      source={require('../assets/images/chevron-down.png')}
    />
  );

const UserInfoScreen = () => {
  const dispatch = useDispatch();

  const [yearOfBirth, setYearOfBirth] = useState(0);
  const [location, setLocation] = useState(0);
  const [gender, setGender] = useState(0);
  const [maritalStatus, setMaritalStatus] = useState(0);
  const [email, setEmail] = useState('');

  const locations = useSelector((state) => getLocationsList(state)).map((location) => ({ value: location.id, label: location.name })) || []; 
  const genders = useSelector((state) => getGendersList(state)).map((location) => ({ value: location.id, label: location.value })) || [];
  const maritalStatuses = useSelector((state) => getMaritalStatusesList(state)).map((location) => ({ value: location.id, label: location.value })) || [];
  const userDetails = useSelector((state) => getUserDetails(state)) || {};

  useEffect(() => {
    if (_.isEmpty(locations)) {
      dispatch(loadLocations());
    }

    if (_.isEmpty(genders)) {
      dispatch(loadGenders());
    }

    if (_.isEmpty(maritalStatuses)) {
      dispatch(loadMaritalStatuses());
    }

    if (_.isEmpty(userDetails)) {
      dispatch(loadUserDetails());
    }
  }, []);

  useEffect(() => {
    if (userDetails && !_.isEmpty(userDetails)) {
      setYearOfBirth(userDetails.yearOfBirth)
      setLocation(userDetails.location.id)
      setGender(userDetails.gender.id)
      setMaritalStatus(userDetails.maritalStatus.id)
      setEmail(userDetails.contactMail)
    }
  }, [userDetails])

  const saveInfo = () => {
    const currentYear = new Date().getFullYear()

    if (yearOfBirth == 0 || yearOfBirth == null ||
        location == 0 || location == null || 
        gender == 0 || gender == null ||  
        maritalStatus == 0 || maritalStatus == null ||
        email == '' || email == null) {
      Alert.alert('Липсваща информация', 'Моля, попълнете всички полета');
      return
    } 

    if (yearOfBirth < currentYear - 100 || yearOfBirth > currentYear - 16) {
      Alert.alert('Грешна година', 'Моля, попълнете правилно годината си на раждане');
      return
    }

    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    
    if (!emailRegex.test(email.toLowerCase())) {
      Alert.alert('Грешен email', 'Моля, попълнете правилно email адреса си');
      return
    }

    let updatedUserDetails = {
      id: userDetails.id,
      gender: { id: gender },
      location: { id: location },
      maritalStatus: { id: maritalStatus },
      yearOfBirth: yearOfBirth,
      contactMail: email
    }
    
    dispatch(updateDetails(updatedUserDetails)).finally(() => { 
      Alert.alert('Данните са запазени успешно.')
    });
  };

  return (
    <View style={AppStyles.main}>
      <View style={[styles.listItem, { marginTop: 20 }]}>
        <Text style={styles.nameText}>Година на раждане:</Text>
        <TextInput
          style={styles.textInput}
          maxLength={4}
          keyboardType="decimal-pad"
          value={yearOfBirth === 0 ? "" : yearOfBirth.toString()}
          onChangeText={setYearOfBirth}
        />
      </View>
      <View style={styles.listItem}>
        <Text style={styles.nameText}>Местоживеене:</Text>
        <View style={styles.pickerSelect}>
          <RNPickerSelect
            style={{ ...pickerSelectStyles, iconContainer: { top: 13, right: 10 } }}
            Icon={ChevronIcon}
            placeholder={{ label: 'Избери', value: null, color: '#9EA0A4' }}
            items={locations}
            useNativeAndroidPickerStyle={false}
            value={location}
            onValueChange={setLocation}
          />
        </View>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.nameText}>Пол:</Text>
        <View style={styles.pickerSelect}>
          <RNPickerSelect
            style={{ ...pickerSelectStyles, iconContainer: { top: 13, right: 10 } }}
            Icon={ChevronIcon}
            placeholder={{ label: 'Избери', value: null, color: '#9EA0A4' }}
            items={genders}
            useNativeAndroidPickerStyle={false}
            value={gender}
            onValueChange={setGender}
          />
        </View>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.nameText}>Семеен статус:</Text>
        <View style={styles.pickerSelect}>
          <RNPickerSelect
            style={{ ...pickerSelectStyles, iconContainer: { top: 13, right: 10 } }}
            Icon={ChevronIcon}
            placeholder={{ label: 'Избери', value: null, color: '#9EA0A4' }}
            items={maritalStatuses}
            useNativeAndroidPickerStyle={false}
            value={maritalStatus}
            onValueChange={setMaritalStatus}
          />
        </View>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.nameText}>Мейл за комуникация:</Text>
        <TextInput
          style={styles.textInput}
          keyboardType="email-address"
          autoCorrect={false}
          // autoComplete={false}
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <TouchableOpacity
        style={[AppStyles.loginButton, { alignSelf: 'center', marginTop: 50, height: 44 }]}
        onPress={saveInfo}
      >
        <Text style={AppStyles.whiteText}>ЗАПАЗИ</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    height: 60,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 5,
  },
  nameText: {
    flex: 1,
    alignSelf: 'center',
    fontSize: 16,
    fontFamily: Fonts.FontFamilyMedium,
    color: '#717076',
  },
  pickerSelect: {
    flex: 1,
    height: 30,
  },
  textInput: {
    textAlign: 'center',
    borderRadius: 8,
    height: 30,
    fontSize: 14,
    flex: 1,
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

export default UserInfoScreen;
