import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useAppDispatch, useAppSelector} from '../hooks/storeHook';
import Icon from 'react-native-vector-icons/Ionicons';
import {deleteTodo, toggleTodo} from '../features/todos/todosSlice';
import Toast from 'react-native-toast-message';
import type {Todo} from '../interfaces/interface';

const TodoList = () => {
  const todosState = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();

  const OnDeleteTodo = (id: String) => {
    dispatch(deleteTodo(id));
    Toast.show({
      type: 'error',
      text1: 'Todo was deleted successfully',
    });
  };

  const onToggleTodo = (id: String) => {
    dispatch(toggleTodo(id));
    Toast.show({
      type: 'success',
      text1: 'Todo was completed successfully',
    });
  };

  const renderItem = ({item}: {item: Todo}) => {
    return (
      <View style={styles.itemContainer}>
        {item.isComplete ? (
          <Text style={styles.lineThrough}>{item.name}</Text>
        ) : (
          <Text style={styles.itemText}>{item.name}</Text>
        )}
        <TouchableOpacity>
          <View style={styles.buttonContainer}>
            <Icon
              name="trash-outline"
              size={25}
              color="#333"
              onPress={() => OnDeleteTodo(item.id)}
            />
            <Icon
              name="checkmark-circle-outline"
              size={25}
              color="#333"
              onPress={() => onToggleTodo(item.id)}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={todosState}
        renderItem={({item}) => renderItem({item})}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default TodoList;

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  lineThrough: {
    textDecorationLine: 'line-through',
    fontSize: 16,
    color: '#333',
  },
});
