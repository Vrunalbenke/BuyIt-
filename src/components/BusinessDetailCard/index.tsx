import React, {useContext} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import {Colors} from '../../resources/colors';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import ToggleSwitch from '../ToggleSwitch';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ThemeContext} from '../../resources/themes';

const BusinessDetailCard = ({item, colorCode}) => {
  const scheme = useContext(ThemeContext);
  return (
    <View style={styles.BusinessContainer}>
      <View
        style={[
          styles.ImageContainer,
          {
            backgroundColor: colorCode ? colorCode : Colors.green,
          },
        ]}>
        <Text style={styles.ImageText}>{item.name[0]}</Text>
      </View>
      <View style={styles.BusinessDetailContainer}>
        <Text
          style={[
            styles.NameText,
            {color: scheme === 'dark' ? Colors.white : Colors.black},
          ]}>
          {item.name}
        </Text>
        <Text
          style={[
            styles.DescText,
            {color: scheme === 'dark' ? Colors.white : Colors.black},
          ]}>
          {item?.description}
        </Text>
      </View>
      <View style={styles.BusinessIconContainer}>
        <ToggleSwitch />
        <Pressable>
          <Ionicons
            name="qr-code-outline"
            size={wp(6)}
            color={scheme === 'dark' ? Colors.white : Colors.black}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default BusinessDetailCard;

const styles = StyleSheet.create({
  root: {
    width: wp(100),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  BusinessContainer: {
    width: wp(100),
    paddingHorizontal: wp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingVertical: wp(2),
    height: wp(20),
  },
  ImageContainer: {
    width: wp(16),
    height: wp(16),
    borderRadius: wp(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImageText: {
    fontSize: wp(6),
    fontFamily: 'Inter Medium',
    color: Colors.white,
  },
  BusinessDetailContainer: {
    width: wp(56),
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 5,
  },
  NameText: {
    fontSize: wp(5),
    fontFamily: 'Inter Medium',
  },
  DescText: {
    fontSize: wp(3.5),
    fontFamily: 'Inter Regular',
  },
  BusinessIconContainer: {
    gap: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
