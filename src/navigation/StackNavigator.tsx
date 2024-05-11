import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '../screens/Auth/SignIn';
import SignUp from '../screens/Auth/SignUp';
import OTP from '../screens/Auth/OTP';
import {SignData} from './type';

export type RootStackParams = {
  SignIn: undefined;
  SignUp: undefined;
  OTP: {userData: SignData | undefined};
};

const RootStack = createNativeStackNavigator<RootStackParams>();
const StackNavigator = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <RootStack.Screen name="SignIn" component={SignIn} />
      <RootStack.Screen name="SignUp" component={SignUp} />
      <RootStack.Screen name="OTP" component={OTP} />
    </RootStack.Navigator>
  );
};

export default StackNavigator;
