import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Checkbox} from 'react-native-paper';
import {ThemeProp} from 'react-native-paper/lib/typescript/types';
import {Colors} from '../../resources/colors';
import {
  widthPercentageToDP as wp,
  // heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

type CheckboxWithTextProps = {
  NormalText: string;
  TOPText?: string;
  status: boolean;
  disabled?: boolean;
  onPress: () => void;
  onPressTOP?: () => void;
  //   uncheckedColor: string;
  //   color: string;
  //   theme: ThemeProp;
};

const CheckboxWithText = ({
  NormalText,
  TOPText,
  status,
  disabled,
  onPress,
  onPressTOP,
}: CheckboxWithTextProps) => {
  return (
    <View style={styles.MainContainer}>
      <Checkbox.Android
        status={status ? 'checked' : 'unchecked'}
        color={Colors.green}
        uncheckedColor={Colors.darkLightGray}
        onPress={onPress}
        disabled={disabled}
      />
      {NormalText && <Text style={[styles.NormalText]}>{NormalText} </Text>}
      {TOPText && (
        <TouchableOpacity style={styles.TOPContainer} onPress={onPressTOP}>
          <Text style={styles.TOPText}>{TOPText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CheckboxWithText;

const styles = StyleSheet.create({
  MainContainer: {
    flexDirection: 'row',
    // backgroundColor: 'pink',
    height: wp(6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  NormalText: {
    fontSize: wp(4),
    fontFamily: 'Inter Medium',
  },
  TOPContainer: {
    marginTop: 1,
  },
  TOPText: {
    fontSize: wp(4),
    fontFamily: 'Inter Bold',
    color: Colors.green,
  },
});
