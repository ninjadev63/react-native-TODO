import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {View} from 'react-native';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import TodoInput from './src/components/TodoInput';
import SeederLoading from './src/components/SeederLoading';
import {store} from './src/store';
import TodoList from './src/components/TodoList';

const App = () => {
  const [isSeeding, setIsSeeding] = useState(true);

  return (
    <Provider store={store}>
      {isSeeding ? (
        <SeederLoading setIsSeeding={setIsSeeding} />
      ) : (
        <View>
          <Toast />
          <TodoInput />
          <TodoList />
        </View>
      )}
    </Provider>
  );
};

export default App;
