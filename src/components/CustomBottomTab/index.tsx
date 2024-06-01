import React from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {StyleSheet} from 'react-native';
import {View, Text, Pressable} from 'react-native';
import {Colors} from '../../resources/colors';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import BottomTabIcon from '../BottomTabIcon';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useWindowDimensions} from 'react-native';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';

const CustomBottomTab = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();
  const {width} = useWindowDimensions();
  // const MARGIN = 10;
  const TAB_BAR_WIDTH = width;
  const TAB_WIDTH = TAB_BAR_WIDTH / state.routes.length;

  const translateAnimation = useAnimatedStyle(() => {
    return {
      transform: [{translateX: withTiming(TAB_WIDTH * state.index)}],
    };
  });
  return (
    <View
      style={[
        styles.CustomBottomTab,
        // {width: TAB_BAR_WIDTH}
      ]}>
      <Animated.View
        style={[
          styles.slidingTabContainer,
          {width: TAB_WIDTH},
          translateAnimation,
        ]}>
        <View style={styles.slidingTab} />
      </Animated.View>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <Pressable
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.routePressable}>
            <View style={styles.contentContainer}>
              <BottomTabIcon route={route} isFocused={isFocused} />
              {isFocused && (
                <Text
                  style={[
                    styles.LabelText,
                    {color: isFocused ? Colors.green : Colors.white},
                  ]}>
                  {route.name}
                </Text>
              )}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

export default CustomBottomTab;

const styles = StyleSheet.create({
  CustomBottomTab: {
    // flex: 1,
    flexDirection: 'row',
    width: wp(100),
    height: wp(20),
    // position: 'absolute',
    backgroundColor: Colors.green,
    // alignSelf: 'center',
    // borderRadius: wp(12),
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    // bottom: 0,
  },
  routePressable: {
    flex: 1,
  },
  slidingTabContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slidingTab: {
    width: wp(16),
    height: wp(16),
    borderRadius: wp(2),
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  LabelText: {
    fontFamily: 'Inter Medium',
    fontSize: wp(3.5),
  },
});
