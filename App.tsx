import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/store';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar, useColorScheme} from 'react-native';
import {themes} from './src/resources/themes';

const App = () => {
  const scheme = useColorScheme();
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar
          backgroundColor={themes[scheme].backgroundColor}
          barStyle={scheme === 'light' ? 'dark-content' : 'light-content'}
        />
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
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
