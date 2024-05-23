import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import {
  widthPercentageToDP as wp,
  // heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors} from '../../resources/colors';

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
    return (
      <View style={styles.MainContainer}>
        <Text style={styles.NormalText}>{NormalText}</Text>
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
    color: Colors.black,
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
