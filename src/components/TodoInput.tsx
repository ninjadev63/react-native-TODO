import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import uuid from 'react-native-uuid';
import {useAppDispatch} from '../hooks/storeHook';
import {addTodo} from '../features/todos/todosSlice';
import Toast from 'react-native-toast-message';

const TodoInput = () => {
  const [todo, setTodo] = useState('');
  const dispatch = useAppDispatch();

  const onSubmitTodo = () => {
    if (todo.trim() === '') {
      Toast.show({
        type: 'info',
        text1: 'Dear user, please enter a todo',
        text2: 'Todo cannot be empty',
      });
      return;
    }
    const newTodo = {
      id: uuid.v4(),
      name: todo.trim(),
      isCompleted: false,
    };
    Toast.show({
      type: 'success',
      text1: `${newTodo.name} todo was added successfully`,
    });

    dispatch(addTodo(newTodo));

    setTodo('');
  };

  return (
    <View>
      <Text style={styles.textStyle}>Todo List</Text>
      <TextInput
        style={styles.inputStyle}
        placeholder="Add Todo..."
        value={todo}
        onChangeText={text => setTodo(text)}
      />
      <TouchableOpacity
        style={styles.buttonStyle}
        activeOpacity={0.8}
        onPress={onSubmitTodo}>
        <Text style={styles.buttonTextStyle}>Add Todo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TodoInput;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    textAlign: 'center',
  },
  inputStyle: {
    borderColor: 'grey',
    borderWidth: 1,
    padding: 20,
    fontSize: 18,
    width: '90%',
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 40,
  },
  buttonStyle: {
    backgroundColor: 'grey',
    padding: 10,
    margin: 10,
    width: '80%',
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonTextStyle: {
    color: 'white',
    fontSize: 16,
  },
});
