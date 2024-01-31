import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import CommentListItem from './CommentListItem';
import withSwipeDelete from './withSwipeDelete';

const CommentRow = CommentListItem;
const DeletableRow = withSwipeDelete(CommentListItem, {});

export default ({ comments, onDeleteComment }) => (
  <View style={styles.container}>
    <FlatList
      data={comments}
      keyExtractor={(item, index) => 'key' + index}
      renderItem={({ item }) =>
        item.isMe ? <DeletableRow item={item} onDelete={() => onDeleteComment(item.id)} /> : <CommentRow item={item} />
      }
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
});
