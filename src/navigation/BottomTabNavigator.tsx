import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import React from 'react';
import Home from '../screens/BottomTab/Home';
import Location from '../screens/BottomTab/Location';
import Favorite from '../screens/BottomTab/Favorite';
import Profile from '../screens/BottomTab/Profile';
import CustomBottomTab from '../components/CustomBottomTab';

export type RootBottomTabParams = {
  Home: undefined;
  Location: undefined;
  Favorite: undefined;
  Profile: undefined;
};

const RootBottomTab = createBottomTabNavigator<RootBottomTabParams>();

const CustomBottomTabs = (props: BottomTabBarProps) => {
  return <CustomBottomTab {...props} />;
};

const BottomTabNavigator = () => {
  return (
    <RootBottomTab.Navigator
      tabBar={CustomBottomTabs}
      screenOptions={{
        headerShown: false,
      }}>
      <RootBottomTab.Screen name={'Home'} component={Home} />
      <RootBottomTab.Screen name={'Location'} component={Location} />
      <RootBottomTab.Screen name={'Favorite'} component={Favorite} />
      <RootBottomTab.Screen name={'Profile'} component={Profile} />
    </RootBottomTab.Navigator>
  );
};

export default BottomTabNavigator;
