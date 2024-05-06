import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/store';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;

// const styles = StyleSheet.create({
//   root: {
//     flex: 1,
//     backgroundColor: 'purple',
//   },
// });
