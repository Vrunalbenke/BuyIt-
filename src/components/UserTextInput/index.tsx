import {
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {useState} from 'react';
import {Control, Controller, FieldValues, Path} from 'react-hook-form';
import {Colors} from '../../resources/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  // heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

type UserTextInputProps<FormFieldValues extends FieldValues> = {
  control: Control<FormFieldValues>;
  name: keyof FormFieldValues;
  label: string;
  placeholder: string;
  placeholderTextColor?: string;
  disabled?: boolean;
  right?: boolean;
  secureTextEntry?: boolean;
  autoCapitalize?: boolean;
  autoComplete?: boolean;
  autoCorrect?: boolean;
  multiline?: boolean;
  WithCountryPicker?: boolean;
  inputMode:
    | 'decimal'
    | 'email'
    | 'none'
    | 'numeric'
    | 'search'
    | 'tel'
    | 'text'
    | 'url';
  icon?: string;
  toggleicon?: string;
  TextInputStyle?: StyleProp<ViewStyle>;
  Optional?: boolean;
  maxLength?: number;
  size?: number;
  iconColor?: string;
  url?: ImageSourcePropType;
  DisplayCountryPicker?: React.ReactElement;
};

const UserTextInput = <FormFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  placeholderTextColor,
  disabled,
  right,
  icon,
  toggleicon,
  WithCountryPicker,
  secureTextEntry,
  Optional,
  size,
  maxLength,
  iconColor,
  url,
  DisplayCountryPicker,
}: UserTextInputProps<FormFieldValues>) => {
  const [toggleIcon, setToggleIcon] = useState(icon);

  const handleIconPress = () => {
    if (toggleIcon === icon) {
      setToggleIcon(toggleicon);
    } else {
      setToggleIcon(icon);
    }
  };
  return (
    <Controller
      control={control}
      name={name as Path<FormFieldValues>}
      render={({field: {onChange, onBlur, value}, fieldState: {error}}) => {
        return (
          <View style={styles.MainContainer}>
            {label && (
              <View style={styles.LabelContainer}>
                <Text style={styles.LabelText}>{label}</Text>
                {/* <View style={styles.LabelRightContainer}> */}
                {Optional ? (
                  <Text style={styles.OptionalText}>Optional</Text>
                ) : (
                  <Text style={styles.MandatoryText}>*</Text>
                )}
                {/* </View> */}
              </View>
            )}
            <View style={styles.InputContainer}>
              {url && (
                <View style={styles.ImageContainer}>
                  <Image
                    source={url}
                    style={styles.ImageSize}
                    resizeMode="cover"
                  />
                </View>
              )}
              {WithCountryPicker && DisplayCountryPicker}
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                secureTextEntry={
                  toggleIcon === icon ? !secureTextEntry : secureTextEntry
                }
                placeholderTextColor={placeholderTextColor}
                style={styles.Input}
                editable={!disabled}
                autoCapitalize={'none'}
                autoCorrect={false}
                autoComplete="sms-otp"
                maxLength={maxLength}
              />
              {right && toggleIcon && (
                <TouchableOpacity
                  onPress={handleIconPress}
                  style={styles.IconTOP}>
                  <Ionicons name={toggleIcon} size={size} color={iconColor} />
                </TouchableOpacity>
              )}
            </View>
            {error && <Text style={styles.ErrorText}>{error?.message}</Text>}
          </View>
        );
      }}
    />
  );
};

export default UserTextInput;

const styles = StyleSheet.create({
  MainContainer: {
    width: wp(90),
    justifyContent: 'center',
    alignItems: 'center',
    gap: 3,
  },
  LabelContainer: {
    width: wp(90),
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
    width: wp(90),
    height: wp(12),
    borderWidth: 2,
    borderRadius: 5,
    borderColor: Colors.darkLightGray,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    borderRadius: wp(5),
  },
  Input: {
    flex: 8,
    height: '100%',
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
