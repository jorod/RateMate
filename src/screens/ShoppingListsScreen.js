import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from 'react-native-elements';

import { shareList } from '../helpers/utils';
import ShoppingListItem from '../components/ShoppingListItem';
import KeyboardShift from '../components/KeyboardShift';
import { getShoppingLists } from '../redux/shoppingLists/selectors';
import { createList, removeList, loadLists, updateList, loadUnits } from '../redux/shoppingLists/actions';

const ShoppingListsScreen = ({ navigation }) => {
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const lists = useSelector((state) => getShoppingLists(state));

  const listRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUnits());
    dispatch(loadLists()).finally(() => setInitialDataLoaded(true));
  }, []);

  useEffect(() => {
    let listsLoaded = lists && lists.length >= 0;

    // setIsRefreshing(!listsLoaded);
  }, [lists]);

  const getLists = () => {
    dispatch(loadLists()).finally(() => setIsRefreshing(false));
  };

  const addNewList = () => {
    dispatch(createList(`Списък ${lists.length + 1}`));
  };

  const deleteList = async (list) => {
    await dispatch(removeList(list));
  };

  const updateListTitle = (list, name) => {
    dispatch(updateList({ ...list, name }));
  };

  return (
    <KeyboardShift>
      {() =>
        initialDataLoaded ? (
          <View style={styles.container}>
            <FlatList
              ref={listRef}
              data={lists}
              refreshing={isRefreshing}
              onRefresh={() => {
                setIsRefreshing(true);
                getLists();
              }}
              ListFooterComponent={() => <View style={{ height: 100 }} />}
              keyExtractor={({ id }) => id + ''}
              renderItem={({ item }) => (
                <ShoppingListItem
                  item={item}
                  onTitleChanged={(text) => {
                    updateListTitle(item, text);
                  }}
                  onDelete={() => deleteList(item)}
                  onShare={() => shareList(item)}
                  onPress={() => navigation.navigate('EditListScreen', { listId: item.id })}
                />
              )}
            />
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                addNewList();
                listRef.current.scrollToEnd();
              }}
            >
              <Icon name="add" size={40} color="white" containerStyle={styles.iconContainer} />
            </TouchableOpacity>
          </View>
        ) : (
          <ActivityIndicator color="gray" style={{ flex: 1, alignSelf: 'center' }} />
        )
      }
    </KeyboardShift>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: 'white',
  },
  addButton: {
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 20,
    left: 20,
    borderRadius: 30,
    overflow: 'hidden',
  },
  iconContainer: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#FFE708',
  },
});

export default ShoppingListsScreen;
