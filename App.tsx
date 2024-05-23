import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/store';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {themes} from './src/resources/themes';
import Toast from 'react-native-toast-message';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  const scheme = useColorScheme();
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={styles.root}>
        <Provider store={store}>
          <SafeAreaView style={styles.root}>
            <StatusBar
              backgroundColor={themes[scheme].backgroundColor}
              barStyle={scheme === 'light' ? 'dark-content' : 'light-content'}
            />
            <NavigationContainer>
              <StackNavigator />
            </NavigationContainer>
            <Toast visibilityTime={2000} />
          </SafeAreaView>
        </Provider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
