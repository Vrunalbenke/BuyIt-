import React from 'react';
import {View} from 'react-native';
import HomeIcon from '../../../assets/svg/home.svg';
import LocationIcon from '../../../assets/svg/location.svg';
import FavoriteIcon from '../../../assets/svg/favorite.svg';
import ProfileIcon from '../../../assets/svg/profile.svg';
import ChatsIcon from '../../../assets/svg/chats.svg';
import {Colors} from '../../resources/colors';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
type BottomTabIconProp = {
  route: string;
  isFocused: boolean;
};

const BottomTabIcon = ({route, isFocused}: BottomTabIconProp) => {
  const renderIcon = (routeName: string, isRouteFocused: boolean) => {
    let height: number = wp(7);
    let width: number = wp(7);

    switch (routeName.name) {
      case 'Home':
        return (
          <HomeIcon
            height={height}
            width={width}
            fill={isRouteFocused ? Colors.green : Colors.white}
          />
        );
      case 'Location':
        return (
          <LocationIcon
            height={height}
            width={width}
            fill={isRouteFocused ? Colors.green : Colors.white}
          />
        );
      case 'Favorite':
        return (
          <FavoriteIcon
            height={height}
            width={width}
            fill={isRouteFocused ? Colors.green : Colors.white}
          />
        );
      case 'Profile':
        return (
          <ProfileIcon
            height={height}
            width={width}
            fill={isRouteFocused ? Colors.green : Colors.white}
          />
        );
      case 'Chats':
        return (
          <ChatsIcon
            height={height}
            width={width}
            fill={isRouteFocused ? Colors.green : Colors.white}
          />
        );
      default:
        break;
    }
  };
  return <View>{renderIcon(route, isFocused)}</View>;
};

export default BottomTabIcon;
