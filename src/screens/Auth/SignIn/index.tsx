import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import UserTextInput from '../../../components/UserTextInput';
import {
  widthPercentageToDP as wp,
  // heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {z} from 'zod';
import {loginSchema} from '../authType';
import PhoneNumberTextInput from '../../../components/PhoneNumberTextInput';
import {ThemeContext} from '../../../resources/themes';
import LargeButton from '../../../components/LargeButton';
import {Colors} from '../../../resources/colors';
import TextIconButton from '../../../components/TextIconButton';
import {useLazyGetUserQuery, useLoginMutation} from '../../../services/Auth';
import {zodResolver} from '@hookform/resolvers/zod';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../navigation/StackNavigator';
import Toast from 'react-native-toast-message';
import {storage} from '../../../../App';
import {DeviceEventEmitter} from 'react-native';
import {useDispatch} from 'react-redux';
import {setUser} from '../../../Slice/userSlice';

type LoginFields = z.infer<typeof loginSchema>;

type SignInProps = NativeStackScreenProps<RootStackParams, 'SignIn'>;
const SignIn = ({navigation}: SignInProps) => {
  const {control, setValue, getValues, handleSubmit} = useForm<LoginFields>({
    defaultValues: {
      country_cca2: 'US',
      country_code: '+1',
      device_id: 'kbceQRqf0cbNVLJL',
      fcm_token:
        'fZBu0K2YnEKulbvJhxE-Gf:APA91bGgIzpE1vNgiDhhQpyIAiMqGebX7_Xz6uki4lkF-5nBbWIC65OBg_s59W7_VZJaIThnyxcpHdalY9Go_-Z0lVK9dBDvbHhVrji8IFOnRnX00OPnkwMRoU9qd43zimboqbTZWVwl',
      latitude: 18.58561,
      longitude: 73.6807,
    },
    resolver: zodResolver(loginSchema),
  });
  const scheme = useContext(ThemeContext);
  const dispatch = useDispatch();

  const [
    login,
    {data: LoginResponse, isError, error, isLoading, isSuccess, originalArgs},
  ] = useLoginMutation();

  const [
    trigger,
    {
      data: GUData,
      isSuccess: GUIsSuccess,
      error: GUError,
      isError: GUIsError,
      isLoading: GUIsLoading,
    },
  ] = useLazyGetUserQuery();

  if (originalArgs) {
    console.log('URL passed:', originalArgs);
  }

  useEffect(() => {
    if (GUIsSuccess) {
      console.log(originalArgs?.country_cca2, 'User data', GUData);
      const data = {
        country_flag: originalArgs?.country_cca2,
        ...GUData,
      };
      dispatch(setUser(data));
      storage.setString('user', JSON.stringify(data));
      DeviceEventEmitter.emit('user', data);
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'BottomTabNavigator',
            // params: {
            //   isBusinessUser: false,
            // },
          },
        ],
      });
    } else if (GUIsError) {
      console.log(GUError, 'Error While getting user');
    }
  }, [GUData, GUIsSuccess, GUIsError, GUError]);

  useEffect(() => {
    if (isSuccess) {
      console.log('LoginResponse: ', LoginResponse);
      Toast.show({
        type: 'success',
        text1: 'Logged in',
        position: 'bottom',
      });
      const tokenData = JSON.stringify(LoginResponse);
      storage.setString('token', tokenData);
      DeviceEventEmitter.emit('token', LoginResponse);
      trigger();
    } else if (isError) {
      console.log('error: ', error);
      Toast.show({
        type: 'error',
        text1: error?.data?.error || 'Something went wrong',
        position: 'bottom',
      });
    }
  }, [LoginResponse, isError, error, isSuccess]);

  const handleData = (data: LoginFields) => {
    console.log('Pressed');
    login(data);
  };

  const handleForgotPassword = () => {
    navigation.navigate('OTP', {
      isFromSignUp: false,
      isSellerOrUser: false,
      phone_number: getValues('phone_number'),
      country_cca2: getValues('country_cca2'),
      country_code: getValues('country_code'),
    });
  };
  return (
    <View style={styles.root}>
      <Text style={styles.TitleText}>VendIt!</Text>
      <View style={styles.TextInputContainer}>
        <PhoneNumberTextInput
          control={control}
          name={'country_cca2'}
          name2={'country_code'}
          placeholder={'8282928372'}
          disabled={false}
          setValue={setValue}
          label={''}
          maxLength={10}
          placeholderTextColor={''}
          disableOnlyCC={false}
          TextInputStyle={undefined}
          scheme={scheme}
        />
        <View style={styles.PasswordContainer}>
          <UserTextInput
            control={control}
            name={'password'}
            label="Password"
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
          <TextIconButton
            NormalText={'Forgot Password?'}
            NormalTextColor={Colors.black}
            onPress={handleForgotPassword}
          />
        </View>
      </View>

      <View style={styles.ButtonContainer}>
        <LargeButton
          BTNText="Next"
          onPress={handleSubmit(handleData)}
          isDisable={isLoading || GUIsLoading}
          loader={true}
        />
        <LargeButton
          BTNText="Skip"
          onPress={() => console.log('User Skips')}
          isDisable={false}
          isSkipBtn={true}
        />

        <View style={styles.BottomSignUpTextContainer}>
          <Text style={styles.HaveAccountText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.SignUpText}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    gap: 45,
  },
  TitleText: {
    fontSize: wp(9),
    color: Colors.lightGreen,
    fontFamily: 'Inter Medium',
  },
  TextInputContainer: {
    gap: 10,
  },
  PasswordContainer: {
    width: wp(92),
    alignItems: 'flex-start',
    gap: 5,
  },
  ButtonContainer: {
    gap: 12,
  },
  BottomSignUpTextContainer: {
    width: wp(92),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  HaveAccountText: {
    fontFamily: 'Inter Regular',
    fontSize: wp(4),
    color: Colors.black,
  },
  SignUpText: {
    fontFamily: 'Inter Medium',
    fontSize: wp(4),
    color: Colors.orange,
  },
});
