import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';
import {Checkbox} from 'react-native-paper';
import {Colors} from '../../resources/colors';
import {
  widthPercentageToDP as wp,
  // heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Control, Controller, FieldValues, Path} from 'react-hook-form';
import {ThemeContext} from '../../resources/themes';

type CheckboxWithTextProps<FormFieldValues extends FieldValues> = {
  control: Control<FormFieldValues>;
  name: keyof FormFieldValues;
  NormalText: string;
  TOPText?: string;
  TOPTextColor?: string;
  isCheckBox?: boolean;
  disabled?: boolean;
  onPress: (name: keyof FormFieldValues) => void;
  onPressTOP?: () => void;
};

const CheckboxWithText = <FormFieldValues extends FieldValues>({
  control,
  name,
  NormalText,
  TOPText,
  TOPTextColor,
  isCheckBox = true,
  disabled,
  onPress,
  onPressTOP,
}: CheckboxWithTextProps<FormFieldValues>) => {
  const scheme = useContext(ThemeContext);
  return (
    <Controller
      control={control}
      name={name as Path<FormFieldValues>}
      render={({field: {value}, fieldState: {error}}) => {
        return (
          <View style={styles.MainContainer}>
            {isCheckBox && (
              <Checkbox.Android
                status={value ? 'checked' : 'unchecked'}
                color={Colors.green}
                uncheckedColor={Colors.darkLightGray}
                onPress={() => onPress(name)}
                disabled={disabled}
              />
            )}
            {NormalText && (
              <Text style={[styles.NormalText, {color: Colors.gray}]}>
                {NormalText}{' '}
              </Text>
            )}
            {TOPText && (
              <TouchableOpacity
                style={styles.TOPContainer}
                onPress={onPressTOP}>
                <Text style={[styles.TOPText, {color: TOPTextColor}]}>
                  {TOPText}
                </Text>
              </TouchableOpacity>
            )}
            {error && <Text style={styles.Error}>*</Text>}
          </View>
        );
      }}
    />
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
    fontFamily: 'Inter Regular',
  },
  TOPContainer: {
    marginTop: 1,
  },
  TOPText: {
    fontSize: wp(4),
    fontFamily: 'Inter Medium',
    // color: Colors.green,
  },
  Error: {
    color: Colors.errorRed,
  },
});
