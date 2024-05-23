import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '../screens/Auth/SignIn';
import SignUp from '../screens/Auth/SignUp';
import OTP from '../screens/Auth/OTP';
import CreateNewPassword from '../screens/Auth/CreateNewPassword';
import PasswordUpdated from '../screens/Auth/PasswordUpdated';
import IsSellerOrCustomer from '../screens/NativeStack/IsSellerOrCustomer';
import AddBusiness from '../screens/NativeStack/AddBusiness';

export type RootStackParams = {
  SignIn: undefined;
  SignUp: undefined;
  OTP: {
    device_id?: string;
    email?: string;
    fcm_token?: string;
    name?: string;
    password?: string;
    phone_number?: string;
    isFromSignUp: boolean;
    isSellerOrUser?: boolean;
    country_code?: string;
    country_cca2?: string;
  };
  CreateNewPassword: {
    country_code: string;
    phone_number: string;
  };
  PasswordUpdated: undefined;
  IsSellerOrCustomer: undefined;
  AddBusiness: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParams>();

const StackNavigator = () => {
  return (
    <RootStack.Navigator
      initialRouteName="AddBusiness"
      screenOptions={{
        headerShown: false,
      }}>
      <RootStack.Screen name="SignIn" component={SignIn} />
      <RootStack.Screen name="SignUp" component={SignUp} />
      <RootStack.Screen name="OTP" component={OTP} />
      <RootStack.Screen
        name="CreateNewPassword"
        component={CreateNewPassword}
      />
      <RootStack.Screen name="PasswordUpdated" component={PasswordUpdated} />
      <RootStack.Screen
        name="IsSellerOrCustomer"
        component={IsSellerOrCustomer}
      />
      <RootStack.Screen name="AddBusiness" component={AddBusiness} />
    </RootStack.Navigator>
  );
};

export default StackNavigator;
