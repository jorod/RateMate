import React, { useState } from 'react';
import { TouchableOpacity, Image, StyleSheet, View, ActivityIndicator } from 'react-native';
import SwipeableItem from 'react-native-swipeable-item';

const withSwipeDelete =
  (Component, style) =>
  ({ onDelete, ...passThroughProps }) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const renderUnderlayLeft = () => (
      <View style={[styles.row, styles.underlayRight, { borderRadius: style.borderRadius }]}>
        <TouchableOpacity
          onPress={() => {
            setIsDeleting(true);
            onDelete?.().catch(() => setIsDeleting(false));
          }}
        >
          {isDeleting ? (
            <ActivityIndicator color="red" />
          ) : (
            <Image
              style={{ width: 25, height: 25, resizeMode: 'contain' }}
              source={require('../assets/images/delete.png')}
            />
          )}
        </TouchableOpacity>
      </View>
    );

    return (
      <View style={style}>
        <SwipeableItem
          item={passThroughProps.item}
          overSwipe={20}
          renderUnderlayLeft={renderUnderlayLeft}
          snapPointsLeft={[60]}
        >
          <Component {...passThroughProps} />
        </SwipeableItem>
      </View>
    );
  };

export default withSwipeDelete;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 32,
  },
  underlayRight: {
    flex: 1,
    backgroundColor: '#FFE708',
    justifyContent: 'flex-end',
  },
});
