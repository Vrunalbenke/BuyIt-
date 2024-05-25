import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../resources/colors';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Control, Controller, FieldValues, Path} from 'react-hook-form';
import FastImage from 'react-native-fast-image';

type PressableInputProps<FormFieldValues extends FieldValues> = {
  control: Control<FormFieldValues>;
  name: keyof FormFieldValues;
  label: string;
  placeholder: string;
  disabled?: boolean;
  onPress: () => void;
  url?: string | undefined;
};
const PressableInput = <FormFieldValues extends FieldValues>({
  control,
  name,
  label,
  disabled,
  url,
  onPress,
  placeholder,
}: PressableInputProps<FormFieldValues>) => {
  return (
    <Controller
      control={control}
      name={name as Path<FormFieldValues>}
      render={({field: {value}, fieldState: {error}}) => {
        return (
          <View style={styles.MainContainer}>
            {label && (
              <View style={styles.LabelContainer}>
                <Text style={styles.LabelText}>{label}</Text>
                <Text style={styles.MandatoryText}>*</Text>
              </View>
            )}
            <Pressable
              disabled={disabled}
              onPress={onPress}
              style={styles.InputContainer}>
              {url && (
                <View style={styles.ImageContainer}>
                  <FastImage
                    style={styles.ImageSize}
                    source={{
                      uri: `http://${url}`,
                      headers: {Authorization: 'someAuthToken'},
                      priority: FastImage.priority.normal,
                      cache: FastImage.cacheControl.immutable,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                </View>
              )}
              <Text
                style={[
                  styles.Input,
                  {
                    color: value === undefined ? Colors.gray : Colors.black,
                  },
                ]}>
                {value ? value : placeholder}
              </Text>
            </Pressable>
            {error && <Text style={styles.ErrorText}>{error?.message}</Text>}
          </View>
        );
      }}
    />
  );
};

export default PressableInput;

const styles = StyleSheet.create({
  MainContainer: {
    width: wp(92),
    justifyContent: 'center',
    alignItems: 'center',
    gap: 3,
  },
  LabelContainer: {
    width: wp(92),
    paddingHorizontal: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  LabelText: {
    fontFamily: 'Inter Medium',
    fontSize: wp(4),
    color: Colors.darkGray,
  },

  OptionalText: {
    fontSize: wp(3.5),
    color: Colors.gray,
    fontFamily: 'Inter Medium',
  },
  MandatoryText: {
    color: Colors.errorRed,
    fontSize: wp(4),
  },

  InputContainer: {
    width: wp(92),
    height: wp(12),
    borderWidth: 2,
    borderRadius: 5,
    borderColor: Colors.darkLightGray,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  ImageContainer: {
    flex: 1.5,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImageSize: {
    width: wp(10),
    height: wp(10),
  },
  Input: {
    flex: 8,
    paddingLeft: 10,
    fontSize: wp(4.5),
    fontFamily: 'Inter Regular',
  },
  IconTOP: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ErrorText: {
    width: wp(90),
    textAlign: 'left',
    paddingLeft: 10,
    fontWeight: '500',
    color: Colors.errorRed,
    fontFamily: 'Inter Medium',
  },
});
