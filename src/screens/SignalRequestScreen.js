import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, BackHandler, Platform } from 'react-native';
import { HeaderBackButton } from '@react-navigation/elements';
import Colors from '../constants/Colors';
import Overlay from 'react-native-modal-overlay';
import Fonts from '../constants/Fonts';
import AppStyles from '../config/AppStyles';
import { sendSignal } from '../managers/ProductService';

const SignalRequestScreen = ({ navigation, route }) => {
  const [textLength, setTextLength] = useState(0);
  const [text, setText] = useState('');
  const [textError, setTextError] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalClosed, setIsModalClosed] = useState(false);

  const isIOS = Platform.OS === 'ios';

  useEffect(() => {
    navigation.setOptions({
      headerBackVisible: false,
      headerLeft: () => (
        <HeaderBackButton
          style={{ marginLeft: isIOS ? -15 : -5 }}
          tintColor="white"
          onPress={() => {
            handleBackButton();
          }}
        />
      ),
      headerTitle: () => (
        <Image source={require('../assets/images/warning_white.png')} style={{ width: 30, height: 26 }} />
      ),
      headerTitleAlign: 'center',
    });
  }, [navigation]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);

  const handleBackButton = () => {
    showCloseSignalModal(true);
    return true;
  };

  const onChangeText = (text) => {
    setText(text);
    setTextLength(text.length);
    setTextError(text === '' ? '*Моля, въведете Вашия сигнал' : '');
  };

  const onClose = () => {
    setIsModalVisible(false);
  };

  const showCloseSignalModal = (visible) => {
    setIsModalClosed(visible);
  };

  const handleSendSignal = async () => {
    if (text === '') {
      setTextError('*Моля, въведете Вашия сигнал');
      return;
    }

    try {
      await sendSignal(text, route.params.productId);
      setIsModalVisible(!isModalVisible);
    } catch (error) {
      alert('Грешка при подаване на сигнал. Моля опитайте отново ');
    }
  };

  const handleCloseSignal = async () => {
    try {
      await showCloseSignalModal(false);
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Моля, опишете сигнала за нередност</Text>
      <TextInput style={styles.input} multiline={true} numberOfLines={10} maxLength={250} onChangeText={onChangeText} />
      <Text style={styles.signalMaxLengthText}>{textLength}/250 символа макс.</Text>
      <Text style={[AppStyles.errorInput]}>{textError}</Text>
      <Overlay
        visible={isModalVisible}
        onClose={onClose}
        closeOnTouchOutside
        animationType="zoomIn"
        containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: 3 }}
        childrenWrapperStyle={{ backgroundColor: Colors.Yellow }}
        animationDuration={300}
      >
        <Text style={{ fontSize: 20, textAlign: 'center', marginTop: 10, marginBottom: 10 }}>
          Успешно подаден сигнал!
        </Text>
        <TouchableOpacity
          style={[AppStyles.loginButton, { height: 40, width: 70 }]}
          onPress={() => {
            onClose();
            navigation.goBack();
          }}
        >
          <Text style={[AppStyles.whiteText, { fontSize: 18 }]}>OК</Text>
        </TouchableOpacity>
      </Overlay>
      <Overlay
        visible={isModalClosed}
        animationType="zoomIn"
        containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: 3 }}
        childrenWrapperStyle={{ backgroundColor: Colors.Yellow }}
        animationDuration={300}
      >
        <Text
          style={{ fontSize: 20, textAlign: 'center', marginTop: 10, marginBottom: 10, fontFamily: Fonts.FontFamily }}
        >
          Сигурни ли сте, че искате да прекратите подаването на сигнал?
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={[AppStyles.loginButton, { height: 40, width: 70, margin: 20, backgroundColor: 'rgb(90,90,90)' }]}
            onPress={() => {
              handleCloseSignal();
            }}
          >
            <Text style={[AppStyles.whiteText, { fontSize: 18 }]}>ДА</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[AppStyles.loginButton, { height: 40, width: 70, margin: 20 }]}
            onPress={() => {
              showCloseSignalModal(false);
            }}
          >
            <Text style={[AppStyles.whiteText, { fontSize: 18 }]}>НЕ</Text>
          </TouchableOpacity>
        </View>
      </Overlay>
      <TouchableOpacity
        style={[AppStyles.loginButton, { marginTop: 3 }]}
        onPress={() => {
          handleSendSignal();
        }}
      >
        <Text style={[AppStyles.whiteText, { padding: 5 }]}>ПОДАЙ</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Colors.White,
  },
  headerText: {
    fontSize: 18,
    textAlign: 'center',
    margin: 20,
    fontFamily: Fonts.FontFamily,
  },
  signalMaxLengthText: {
    fontSize: 18,
    alignSelf: 'flex-end',
    marginRight: '14%',
    marginTop: 2,
    fontFamily: Fonts.FontFamily,
  },
  input: {
    textAlign: 'left',
    textAlignVertical: 'top',
    color: '#000',
    fontSize: 18,
    marginBottom: 5,
    lineHeight: 30,
    fontFamily: Fonts.FontFamily,
    marginTop: 10,
    padding: 5,
    height: '30%',
    width: Fonts.Width,
    borderColor: 'lightgrey',
    borderWidth: 2,
    borderRadius: 2,
  },
});

export default SignalRequestScreen;
