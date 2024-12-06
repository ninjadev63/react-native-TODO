import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  useFetchDataFromDbQuery,
  useDeleteTaskOnDbMutation,
  useCompleteTaskOnDbMutation,
} from '../features/todos/todosSlice';
import type {Todo} from '../interfaces/interface';
import {setLoading} from '../features/todos/todosSlice';
import {useAppDispatch} from '../hooks/storeHook';

const TodoList = () => {
  const {data: tasks, refetch} = useFetchDataFromDbQuery();
  const dispatch = useAppDispatch();

  const [deleteTaskOnDb] = useDeleteTaskOnDbMutation();
  const OnDeleteTodo = async (id: string) => {
    dispatch(setLoading(true));
    await deleteTaskOnDb(id).unwrap(); // Wait for the mutation to complete
    refetch();
    dispatch(setLoading(false));
  };

  const [toggleTaskOnDb] = useCompleteTaskOnDbMutation();
  const onToggleTodo = async (id: string) => {
    dispatch(setLoading(true));
    await toggleTaskOnDb(id).unwrap();
    refetch();
    dispatch(setLoading(false));
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
        data={tasks}
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
