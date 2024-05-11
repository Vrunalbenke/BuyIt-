import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  // heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors} from '../../resources/colors';

type LargeButtonProps = {
  BTNText: string;
  onPress: () => void;
  isDisable: boolean;
  isSkipBtn?: boolean;
  loader?: boolean;
};

const LargeButton = ({
  BTNText,
  onPress,
  isDisable,
  isSkipBtn = false,
  loader = false,
}: LargeButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.TOPContainer,
        {
          backgroundColor: isSkipBtn
            ? Colors.transparent
            : isDisable
            ? Colors.lightGray
            : Colors.green,
          borderColor: isSkipBtn ? Colors.orange : Colors.transparent,
          borderWidth: isSkipBtn ? 1 : 0,
        },
      ]}
      onPress={onPress}
      disabled={isDisable}>
      {isDisable && loader && (
        <ActivityIndicator
          animating={true}
          color={Colors.white}
          size={'small'}
        />
      )}
      <Text
        style={[
          styles.BTNText,
          {color: isDisable ? Colors.white : Colors.black},
        ]}>
        {BTNText}
      </Text>
    </TouchableOpacity>
  );
};

export default LargeButton;

const styles = StyleSheet.create({
  TOPContainer: {
    width: wp(92),
    // padding: 12,
    height: wp(11),
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  BTNText: {
    fontFamily: 'Inter Regular',
    fontSize: 16,
  },
});
