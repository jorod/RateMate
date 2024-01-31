import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Image, Keyboard } from 'react-native';
import Colors from '../constants/Colors';

export default ({ createComment }) => {
  const [commentText, setCommentText] = useState('');

  return (
    <View style={styles.commentContainer}>
      <TextInput
        autoCorrect={false}
        style={styles.commentInput}
        placeholder="Добави коментар..."
        placeholderTextColor={Colors.DarkGrey2}
        value={commentText}
        maxLength={256}
        onChangeText={(value) => setCommentText(value)}
        onSubmitEditing={Keyboard.dismiss}
        returnKeyType="done"
        blurOnSubmit={true}
        multiline
      />
      <TouchableOpacity
        style={styles.commentButton}
        onPress={() => {
          createComment(commentText);
          setCommentText('');
          Keyboard.dismiss();
        }}
        disabled={commentText.trim().length === 0}
      >
        <Image
          style={[styles.commentButtonImage]}
          source={
            commentText.trim().length === 0
              ? require('../assets/images/send_gray.png')
              : require('../assets/images/send.png')
          }
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: Colors.LightGrey3,
  },
  commentInput: {
    marginVertical: 10,
    marginLeft: 30,
    marginEnd: 20,
    fontSize: 14,
    flex: 1,
  },
  commentButton: {
    width: 50,
    height: 50,
    paddingTop: 15,
    marginEnd: 20,
  },
  commentButtonImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});
