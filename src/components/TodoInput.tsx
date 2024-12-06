import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import uuid from 'react-native-uuid';
import {useCreateNewTaskOnDbMutation} from '../features/todos/todosSlice';
import Toast from 'react-native-toast-message';
import {Todo} from '../interfaces/interface';
import {setLoading} from '../features/todos/todosSlice';
import {useAppDispatch} from '../hooks/storeHook';

const TodoInput = () => {
  const [todo, setTodo] = useState('');
  const dispatch = useAppDispatch();

  // Mutation hook for updating the board in the database
  const [createNewTaskOnDb] = useCreateNewTaskOnDbMutation();

  const onSubmitTodo = async () => {
    dispatch(setLoading(true));
    if (todo.trim() === '') {
      Toast.show({
        type: 'info',
        text1: 'Dear user, please enter a todo',
        text2: 'Todo cannot be empty',
      });
      return;
    }
    const newTodo: Todo = {
      id: uuid.v4(),
      name: todo.trim(),
      isComplete: false,
    };
    await createNewTaskOnDb(newTodo).unwrap();
    setTodo('');
    dispatch(setLoading(false));
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
