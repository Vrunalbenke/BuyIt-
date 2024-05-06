import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '../screens/Auth/SignIn';

export type RootStackParams = {
  SignIn: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParams>();
const StackNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="SignIn" component={SignIn} />
    </RootStack.Navigator>
  );
};

export default StackNavigator;
