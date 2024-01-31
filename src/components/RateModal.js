import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import Overlay from 'react-native-modal-overlay';
import AppStyles from '../config/AppStyles';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

export default ({ options, visible, onClose, onSubmit }) => {
  const categoriesData = options.map((category) => {
    return {
      id: category.id,
      label: category.value,
      labelStyle: styles.radioLabel,
      containerStyle: { marginRight: 'auto' },
      color: Colors.Blue,
      value: category.id,
    };
  });

  const [selectedId, setSelectedId] = useState(null);
  const [scrollViewMargin, setScrollViewMargin] = useState(0);
  const [comment, setComment] = useState('');

  const radioButtons = useMemo(() => (categoriesData), []);

  const onButtonPressed = () => {
    if (selectedId === null) {
      Alert.alert('Грешка', 'Моля, изберете причина');
      return
    }

    onSubmit(selectedId, comment)
    setSelectedId(null)
  }

  const onClosePressed = () => {
    onClose()
    setSelectedId(null)
  }

  return (
    <Overlay
      visible={visible}
      animationType="zoomIn"
      containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.0)' }}
      childrenWrapperStyle={styles.modalStyle}
      animationDuration={300}
    >
      <TouchableOpacity style={styles.closeButtonContainer} onPress={onClosePressed}>
        <Text style={styles.closeButton}>X</Text>
      </TouchableOpacity>
      <ScrollView style={{paddingBottom: scrollViewMargin}}>
        <Text style={styles.title}>{"Коя е главната причина за вашата оценка?".toUpperCase()}</Text>
        <View style={styles.radioButtonsContainer}>
          <RadioGroup radioButtons={radioButtons} onPress={setSelectedId} selectedId={selectedId}/>
        </View>
        {/* <Text style={styles.commentLabel}>КОМЕНТАР:</Text>
        <TextInput 
          style={styles.input}
          maxLength={30} 
          numberOfLines={3} 
          multiline
          onFocus={() => { setScrollViewMargin(200) }}
          onBlur={() => { setScrollViewMargin(0) }}
          blurOnSubmit
          onChangeText={(text) => setComment(text)}
        /> */}
        <TouchableOpacity style={styles.button} onPress={onButtonPressed}>
          <Text style={[AppStyles.whiteText, { fontSize: 18 }]}>ЗАПАЗИ</Text>
        </TouchableOpacity>
      </ScrollView>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  modalStyle: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.Blue,
    shadowColor: 'rgba(0,0,0, .5)',
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  closeButton: {
    fontSize: 20,
    fontFamily: Fonts.FontFamilyBold,
    color: Colors.Blue,
  },
  closeButtonContainer: {
    width: 15,
    height: 20,
    marginLeft: 'auto',
  },
  title: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 25,
    fontFamily: Fonts.FontFamilyMedium,
    color: Colors.Blue,
  },
  radioButtonsContainer: {
    marginLeft: -10,
  },
  radioLabel: {
    fontFamily: Fonts.FontFamily,
    fontSize: 14,
  },
  commentLabel: {
    paddingTop: 20,
    fontFamily: Fonts.FontFamily,
    fontSize: 14,
  },
  input: {
    marginTop: 10,
    width: '80%',
    height: 60,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.Blue,
    shadowColor: 'rgba(0,0,0, .5)',
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    fontFamily: Fonts.FontFamily,
    fontSize: 16,
    backgroundColor: 'white',
  },
  button: {
    marginTop: 50,
    backgroundColor: Colors.Blue,
    borderRadius: 4,
    width: '40%',
    justifyContent: 'center',
    height: 40,
  },
});
