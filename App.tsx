import React, {useEffect, useLayoutEffect} from 'react';
import {Provider} from 'react-redux';
import {store} from './src/store';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  Appearance,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {ThemeContext, themes} from './src/resources/themes';
import Toast from 'react-native-toast-message';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();
const App = () => {
  const scheme = useColorScheme();

  useLayoutEffect(() => {
    const res = storage.getString('theme');
    Appearance.setColorScheme(res ? res : scheme);
    storage.set('theme', res ? res : scheme);
  }, []);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={styles.root}>
        <Provider store={store}>
          <SafeAreaView style={styles.root}>
            <StatusBar
              backgroundColor={themes[scheme].backgroundColor}
              barStyle={scheme === 'light' ? 'dark-content' : 'light-content'}
            />
            <ThemeContext.Provider value={scheme}>
              <NavigationContainer>
                <StackNavigator />
              </NavigationContainer>
            </ThemeContext.Provider>
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
