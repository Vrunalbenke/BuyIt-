import React, {useContext} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../resources/colors';
import {ThemeContext} from '../../resources/themes';
export type ItemObjectProp = {
  id: string;
  title: string;
  icon: string;
  rightIcon?: string;
  naviagteTo: string;
  navigationParams: object;
};

type ScreenListProps = {
  item: ItemObjectProp;
  onPress: (item: ItemObjectProp) => void;
};
const ScreenList = ({item, onPress}: ScreenListProps) => {
  const scheme = useContext(ThemeContext);
  return (
    <View style={styles.root}>
      <View style={styles.LeftContainer}>
        <Ionicons
          name={item.icon}
          size={wp(6)}
          color={scheme === 'dark' ? Colors.white : Colors.black}
        />
        <Text
          style={[
            styles.TitleText,
            {color: scheme === 'dark' ? Colors.white : Colors.black},
          ]}>
          {item.title}
        </Text>
      </View>

      <Pressable onPress={() => onPress(item)}>
        <Ionicons
          name={item?.rightIcon ? item?.rightIcon : 'chevron-forward-outline'}
          size={wp(6)}
          color={scheme === 'dark' ? Colors.white : Colors.black}
        />
      </Pressable>
    </View>
  );
};

export default ScreenList;

const styles = StyleSheet.create({
  root: {
    width: wp(100),
    padding: wp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  TitleText: {
    fontSize: wp(5),
    fontFamily: 'Inter Medium',
  },
  LeftContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
