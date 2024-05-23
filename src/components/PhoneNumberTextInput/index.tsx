import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import React from 'react';
import {
  Control,
  Controller,
  FieldValues,
  Path,
  UseFormSetValue,
} from 'react-hook-form';
import CountryPicker, {
  Country,
  DARK_THEME,
  DEFAULT_THEME,
} from 'react-native-country-picker-modal';
import {Colors} from '../../resources/colors';
import UserTextInput from '../UserTextInput';
import {
  widthPercentageToDP as wp,
  // heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

type DisplayCountryPickerProps<FormFieldValues extends FieldValues> = {
  control: Control<FormFieldValues>;
  name: keyof FormFieldValues;
  disableOnlyCC: boolean;
  scheme: string | null | undefined;
  setValue: UseFormSetValue<FormFieldValues>;
  name2: Path<FormFieldValues>;
};

const DisplayCountryPicker = <FormFieldValues extends FieldValues>({
  control,
  name,
  disableOnlyCC,
  scheme,
  setValue,
  name2,
}: DisplayCountryPickerProps<FormFieldValues>) => {
  return (
    <Controller
      control={control}
      name={name as Path<FormFieldValues>}
      render={({field: {onChange, value}}) => {
        return (
          <View
            style={styles.CountryPickerContainer}
            pointerEvents={disableOnlyCC ? 'none' : 'auto'}>
            <CountryPicker
              theme={scheme === 'dark' ? DARK_THEME : DEFAULT_THEME}
              countryCode={value}
              onSelect={(country: Country) => {
                onChange(country.cca2);
                setValue(name2, `+${country?.callingCode[0]}`);
              }}
              withCallingCodeButton={true}
              withEmoji={true}
              withCallingCode={true}
              withFilter={true}
              withAlphaFilter={true}
              withFlag={true}
              withFlagButton={true}
            />
          </View>
        );
      }}
    />
  );
};

type UserTextInputProps<FormFieldValues extends FieldValues> = {
  control: Control<FormFieldValues>;
  name: keyof FormFieldValues;
  label: string;
  placeholder: string;
  placeholderTextColor: string;
  disabled?: boolean;
  right?: boolean;
  secureTextEntry?: boolean;
  autoCapitalize?: boolean;
  autoComplete?: boolean;
  autoCorrect?: boolean;
  multiline?: boolean;
  disableOnlyCC: boolean;
  maxLength?: number;
  TextInputStyle: StyleProp<ViewStyle>;
  scheme: string | null | undefined;
  setValue: UseFormSetValue<FormFieldValues>;
  name2: Path<FormFieldValues>;
};

const PhoneNumberTextInput = <FormFieldValues extends FieldValues>({
  control,
  name,
  disableOnlyCC,
  scheme,
  setValue,
  name2,
  maxLength,
  placeholder,
}: UserTextInputProps<FormFieldValues>) => {
  return (
    <UserTextInput
      control={control}
      name={'phone_number'}
      label="Phone Number"
      placeholder={placeholder}
      disabled={false}
      secureTextEntry={false}
      size={wp(7)}
      iconColor={'#899499'}
      WithCountryPicker={true}
      maxLength={maxLength}
      DisplayCountryPicker={
        <DisplayCountryPicker
          control={control}
          name={name}
          disableOnlyCC={disableOnlyCC}
          scheme={scheme}
          setValue={setValue}
          name2={name2}
        />
      }
      inputMode={'numeric'}
    />
  );
};

export default PhoneNumberTextInput;

const styles = StyleSheet.create({
  CountryPickerContainer: {
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    borderRightWidth: 2,
    borderRightColor: Colors.darkLightGray,
  },
});
