import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '../screens/Auth/SignIn';
import SignUp from '../screens/Auth/SignUp';
import OTP from '../screens/Auth/OTP';
import CreateNewPassword from '../screens/Auth/CreateNewPassword';
import PasswordUpdated from '../screens/Auth/PasswordUpdated';
import IsSellerOrCustomer from '../screens/NativeStack/IsSellerOrCustomer';
import AddBusiness, {
  AddBusinessFields,
} from '../screens/NativeStack/AddBusiness';
import AddInventory from '../screens/NativeStack/AddInventory';
import BottomTabNavigator from './BottomTabNavigator';
import {accessToken} from '../screens/common';
import MyBusiness from '../screens/NativeStack/MyBusiness';
import Setting from '../screens/NativeStack/Setting';
import MyProducts from '../screens/NativeStack/MyProducts';
import {SearchBusinessResponse} from '../services/Business/businessTypes';

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
  AddBusiness: {
    isFromSignUp: boolean;
    isUpdate?: boolean;
    EditBusiness?: AddBusinessFields;
  };
  AddInventory: {
    is_service: boolean;
    business_type: string;
    // id?: string;
    from_business: boolean;
    business_id: string;
  };
  BottomTabNavigator: undefined;
  MyBusiness: undefined;
  Setting: undefined;
  MyProducts: {
    business: SearchBusinessResponse;
  };
};

const RootStack = createNativeStackNavigator<RootStackParams>();

const StackNavigator = () => {
  return (
    <RootStack.Navigator
      initialRouteName={accessToken ? 'BottomTabNavigator' : 'SignIn'}
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
      <RootStack.Screen name="AddInventory" component={AddInventory} />
      <RootStack.Screen name="MyBusiness" component={MyBusiness} />
      <RootStack.Screen name="MyProducts" component={MyProducts} />
      <RootStack.Screen name="Setting" component={Setting} />
      <RootStack.Screen
        name="BottomTabNavigator"
        component={BottomTabNavigator}
      />
    </RootStack.Navigator>
  );
};

export default StackNavigator;
