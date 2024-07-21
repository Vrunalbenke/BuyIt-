import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useContext} from 'react';
import {
  widthPercentageToDP as wp,
  // heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors} from '../../resources/colors';
import {ThemeContext} from '../../resources/themes';

type LargeButtonProps = {
  BTNText: string;
  onPress: () => void;
  isDisable: boolean;
  isSkipBtn?: boolean;
  loader?: boolean;
  isPasswordUpdate?: boolean;
};

const LargeButton = ({
  BTNText,
  onPress,
  isDisable,
  isSkipBtn = false,
  loader = false,
  isPasswordUpdate = false,
}: LargeButtonProps) => {
  const scheme = useContext(ThemeContext);
  return (
    <TouchableOpacity
      style={[
        styles.TOPContainer,
        {
          backgroundColor: isSkipBtn
            ? Colors.transparent
            : isDisable
            ? Colors.lightGray
            : isPasswordUpdate
            ? Colors.white
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
          {
            color: isPasswordUpdate
              ? Colors.black
              : scheme === 'dark'
              ? Colors.white
              : isDisable
              ? Colors.darkGray
              : Colors.black,
          },
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
    fontSize: wp(4.5),
  },
});
