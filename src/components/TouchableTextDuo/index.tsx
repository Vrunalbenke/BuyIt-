import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo, useContext} from 'react';
import {
  widthPercentageToDP as wp,
  // heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors} from '../../resources/colors';
import {ThemeContext} from '../../resources/themes';

type TouchableTextDuoProps = {
  NormalText: string;
  TOPText: string;
  OTPCounter: number;
  isDisable?: boolean;
  onPress: () => void;
};

const TouchableTextDuo = memo(
  ({
    NormalText,
    TOPText,
    OTPCounter,
    isDisable,
    onPress,
  }: TouchableTextDuoProps) => {
    const scheme = useContext(ThemeContext);
    return (
      <View style={styles.MainContainer}>
        <Text
          style={[
            styles.NormalText,
            {color: scheme === 'dark' ? Colors.white : Colors.black},
          ]}>
          {NormalText}
        </Text>
        <TouchableOpacity
          onPress={onPress}
          style={styles.TOPContainer}
          disabled={isDisable}>
          <Text
            style={[
              styles.TOPText,
              {color: isDisable ? Colors.darkLightGray : Colors.orange},
            ]}>
            {' '}
            {isDisable ? TOPText + `(${OTPCounter}s)` : TOPText}
          </Text>
        </TouchableOpacity>
      </View>
    );
  },
);

export default TouchableTextDuo;

const styles = StyleSheet.create({
  MainContainer: {
    flexDirection: 'row',
  },
  NormalText: {
    fontFamily: 'Inter Regular',
    fontSize: wp(4),
  },
  TOPContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  TOPText: {
    fontFamily: 'Inter Medium',
    fontSize: wp(4),
    textDecorationLine: 'underline',
  },
});
