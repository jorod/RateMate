import React, { useState } from 'react';
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Fonts from '../constants/Fonts';
import CheckMark from './CheckMark';
import withSwipeDelete from './withSwipeDelete';

const ListItem = ({ item, onTitleChanged, onShare, onPress }) => {
  const [editting, setEditing] = useState(false);
  const [sharing, setSharing] = useState(false);

  return (
    <View style={styles.listItem}>
      {editting ? (
        <View style={styles.container}>
          <CheckMark enabled={item.checked} />
          <TextInput
            autoCorrect={false}
            style={styles.nameInput}
            placeholder="Име на списък"
            maxLength={25}
            onSubmitEditing={({ nativeEvent }) => {
              onTitleChanged(nativeEvent.text);
              setEditing(false);
            }}
            returnKeyType="done"
            onBlur={() => setEditing(false)}
            blurOnSubmit={false}
            autoFocus
            defaultValue={item.name}
          />
        </View>
      ) : (
        <TouchableOpacity style={styles.container} onPress={onPress}>
          <CheckMark enabled={item.checked} />
          <Text style={styles.nameText} numberOfLines={1}>
            {item.name}
          </Text>
        </TouchableOpacity>
      )}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => setEditing(true)}>
          <Image
            style={[styles.iconButton, { marginHorizontal: 20 }]}
            source={require('../assets/images/edit.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSharing(true);
            onShare?.().finally(() => setSharing(false));
          }}
        >
          {sharing ? (
            <ActivityIndicator color="gray" style={[styles.iconButton]} />
          ) : (
            <Image style={[styles.iconButton]} source={require('../assets/images/share.png')} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default withSwipeDelete(ListItem, {
  borderWidth: 1,
  borderRadius: 5,
  borderColor: '#E6E7E8',
  borderBottomWidth: 0,
  shadowColor: '#000000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
  marginHorizontal: 20,
  marginTop: 20,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  iconButton: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  nameText: {
    flex: 1,
    fontSize: 18,
    fontFamily: Fonts.FontFamilyMedium,
    marginLeft: 20,
    color: '#717076',
  },
  nameInput: {
    paddingLeft: 10,
    marginLeft: 20,
    marginVertical: 5,
    borderRadius: 8,
    height: 25,
    fontSize: 15,
    flex: 1,
    borderWidth: 1,
    borderColor: '#E6E7E8',
  },
});
