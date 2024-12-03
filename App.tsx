import 'react-native-gesture-handler';
import React from 'react';
import TodoInput from './src/components/TodoInput';
import {Provider} from 'react-redux';
import {store} from './src/store';
import TodoList from './src/components/TodoList';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <Provider store={store}>
      <Toast />
      <TodoInput />
      <TodoList />
    </Provider>
  );
};

export default App;
