import React, { useEffect } from 'react';
import { Animated, Dimensions, Keyboard, StyleSheet, TextInput, UIManager, Platform } from 'react-native';

const KeyboardShift = (props) => {
  const shift = new Animated.Value(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      handleKeyboardDidShow,
    );

    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      handleKeyboardDidHide,
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleKeyboardDidShow = (event) => {
    const keyboardHeight = event.endCoordinates.height;
    const currentlyFocusedInput = TextInput.State.currentlyFocusedInput();

    currentlyFocusedInput &&
      currentlyFocusedInput.measure((originX, originY, width, height, pageX, pageY) => {
        const fieldBottom = pageY + height + 10;
        const gap = Dimensions.get('window').height - keyboardHeight - fieldBottom;

        if (gap >= 0) {
          return;
        }

        Animated.timing(shift, {
          toValue: Platform.OS === 'ios' ? gap : -15,
          duration: 250,
          useNativeDriver: true,
        }).start();
      });
  };

  const handleKeyboardDidHide = () => {
    Animated.timing(shift, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const { children: renderChild } = props;
  return (
    <Animated.View style={[styles.container, { transform: [{ translateY: shift }] }]}>{renderChild()}</Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
  },
});

export default KeyboardShift;
