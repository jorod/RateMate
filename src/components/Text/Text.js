import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default (props) => {
  const oldStyle = props.style || {};
  const oldStyles = Array.isArray(oldStyle) ? oldStyle : [oldStyle];
  const style = [...oldStyles, styles.text];
  const newProps = {
    ...props,
    style,
  };

  return <Text {...newProps} />;
};

const styles = StyleSheet.create({});
