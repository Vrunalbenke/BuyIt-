import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {
  widthPercentageToDP as wp,
  // heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ThemeContext, themes} from '../../../resources/themes';
import UserTextInput from '../../../components/UserTextInput';
import {useForm} from 'react-hook-form';
import LargeButton from '../../../components/LargeButton';
import {z} from 'zod';
import {resetPasswordSchema} from '../authType';
import {zodResolver} from '@hookform/resolvers/zod';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../navigation/StackNavigator';
import {useResetPasswordMutation} from '../../../services/Auth';
import {Colors} from '../../../resources/colors';

type CreateNewPasswordFields = z.infer<typeof resetPasswordSchema>;

type CreateNewPasswordProps = NativeStackScreenProps<
  RootStackParams,
  'CreateNewPassword'
>;
const CreateNewPassword = ({route, navigation}: CreateNewPasswordProps) => {
  const scheme = useContext(ThemeContext);
  const {control, handleSubmit} = useForm<CreateNewPasswordFields>({
    resolver: zodResolver(resetPasswordSchema),
  });
  const {country_code, phone_number} = route.params;
  const [resetPassword, {isSuccess, isLoading}] = useResetPasswordMutation();

  useEffect(() => {
    if (isSuccess) {
      navigation.navigate('PasswordUpdated');
    }
  }, [isSuccess]);

  const handleResetPassword = (data: CreateNewPasswordFields) => {
    console.log(data);
    const RequestData = {
      ...data,
      country_code: country_code,
      phone_number: phone_number,
    };
    resetPassword(RequestData);
  };
  return (
    <View
      style={[
        styles.root,
        {
          backgroundColor:
            scheme === 'dark'
              ? themes.dark.backgroundColor
              : themes.light.backgroundColor,
        },
      ]}>
      <View style={styles.TopContainer}>
        <View style={styles.TitleAndSubTitleContainer}>
          <Text
            style={[
              styles.TitleText,
              {color: scheme === 'dark' ? Colors.white : Colors.black},
            ]}>
            Create New Password
          </Text>
          <Text
            style={[
              styles.SubTitleText,
              {color: scheme === 'dark' ? Colors.offWhite : Colors.black},
            ]}>
            Your new Password Must be Different from Previouly used password
          </Text>
        </View>
        <View style={styles.PasswordContainer}>
          <UserTextInput
            control={control}
            name={'new_password'}
            label="New Password"
            placeholder={'********'}
            disabled={false}
            right={true}
            icon={'eye-outline'}
            toggleicon={'eye-off-outline'}
            secureTextEntry={true}
            size={wp(7)}
            iconColor={'#899499'}
            inputMode={'text'}
          />
          <UserTextInput
            control={control}
            name={'confirm_password'}
            label="Confirm Password"
            placeholder={'********'}
            disabled={false}
            right={true}
            icon={'eye-outline'}
            toggleicon={'eye-off-outline'}
            secureTextEntry={true}
            size={wp(7)}
            iconColor={'#899499'}
            inputMode={'text'}
          />
        </View>
      </View>
      <View style={styles.BottomContainer}>
        <LargeButton
          BTNText={'Save'}
          onPress={handleSubmit(handleResetPassword)}
          isDisable={isLoading}
          loader={true}
        />
      </View>
    </View>
  );
};

export default CreateNewPassword;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  TopContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    width: wp(100),
    alignItems: 'center',
    gap: 40,
  },
  BottomContainer: {
    flex: 1,
    width: wp(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
  TitleAndSubTitleContainer: {
    width: wp(92),
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 10,
  },
  TitleText: {
    fontSize: wp(6.5),
    fontFamily: 'Inter Medium',
  },
  SubTitleText: {
    fontSize: wp(3.5),
    fontFamily: 'Inter Regular',
  },
  PasswordContainer: {
    gap: 10,
  },
});
