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
import Chats from '../screens/BottomTab/Chats';

export type RootBottomTabParams = {
  Home: undefined;
  Location: {
    isFromRecent: boolean;
    openBusList: boolean;
    timeStamp: Date;
    isDraggable: boolean;
  };
  Favorite: undefined;
  Profile: undefined;
  Chats: undefined;
};

const RootBottomTab = createBottomTabNavigator<RootBottomTabParams>();

const CustomBottomTabs = (props: BottomTabBarProps) => {
  return <CustomBottomTab {...props} />;
};

const BottomTabNavigator = () => {
  return (
    <RootBottomTab.Navigator
      tabBar={CustomBottomTabs}
      // initialRouteName="Favorite"
      screenOptions={{
        headerShown: false,
      }}>
      <RootBottomTab.Screen name={'Home'} component={Home} />
      <RootBottomTab.Screen name={'Location'} component={Location} />
      <RootBottomTab.Screen name={'Favorite'} component={Favorite} />
      <RootBottomTab.Screen name={'Chats'} component={Chats} />
      <RootBottomTab.Screen name={'Profile'} component={Profile} />
    </RootBottomTab.Navigator>
  );
};

export default BottomTabNavigator;
