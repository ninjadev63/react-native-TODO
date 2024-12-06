import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {View} from 'react-native';
import {Provider} from 'react-redux';
import TodoInput from './src/components/TodoInput';
import SeederLoading from './src/components/SeederLoading';
import {store} from './src/store';
import TodoList from './src/components/TodoList';
import LoadingBar from './src/components/LoadingBar';

const App = () => {
  const [isSeeding, setIsSeeding] = useState(true);

  return (
    <Provider store={store}>
      {isSeeding ? (
        <SeederLoading setIsSeeding={setIsSeeding} />
      ) : (
        <View>
          <LoadingBar />
          <TodoInput />
          <TodoList />
        </View>
      )}
    </Provider>
  );
};

export default App;
