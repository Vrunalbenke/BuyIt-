/* eslint-disable react-hooks/exhaustive-deps */
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../navigation/StackNavigator';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../../resources/colors';
import {
  widthPercentageToDP as wp,
  // heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';
import OTPInput from '../../../components/OTPInput';
import TouchableTextDuo from '../../../components/TouchableTextDuo';
import LargeButton from '../../../components/LargeButton';
import {
  useCreateUserMutation,
  useValidateMobileNumberMutation,
  useValidateOTPMutation,
} from '../../../services/Auth';
import PhoneNumberTextInput from '../../../components/PhoneNumberTextInput';
import {ThemeContext} from '../../../resources/themes';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {forgotPasswordSchema} from '../authType';
import {zodResolver} from '@hookform/resolvers/zod';
import Toast from 'react-native-toast-message';
import {storage} from '../../../../App';
import {DeviceEventEmitter} from 'react-native';

type ForgotPasswordFields = z.infer<typeof forgotPasswordSchema>;

type OTPProps = NativeStackScreenProps<RootStackParams, 'OTP'>;
const OTP = ({route, navigation}: OTPProps) => {
  const {
    device_id,
    email,
    fcm_token,
    name,
    password,
    isFromSignUp,
    isSellerOrUser,
    phone_number,
    country_cca2,
    country_code,
  } = route.params;
  //Other Hooks
  const scheme = useContext(ThemeContext);
  const {control, setValue, getValues, handleSubmit} =
    useForm<ForgotPasswordFields>({
      resolver: zodResolver(forgotPasswordSchema),
      defaultValues: {
        country_code: country_code,
        country_cca2: country_cca2,
        phone_number: phone_number,
      },
    });
  //useState
  const [resendTimer, setResendTimer] = useState(120);
  const [resendDisable, setResendDisable] = useState(false);
  const [otp, setOTP] = useState<string>();

  //RTKQuery's
  const [
    validateMobileNumber,
    {
      data,
      isSuccess: validateMobileNumberSuccess,
      isLoading: validateMobileNumberLoading,
      error: validateMobileNumberError,
      isError: validateMobileNumberIsError,
    },
  ] = useValidateMobileNumberMutation();
  const [
    validateOTP,
    {
      isLoading: validateOTPLoading,
      isSuccess: validateOTPSuccess,
      data: validateOTPData,
    },
  ] = useValidateOTPMutation();
  const [createUser, {data: createUserData, isSuccess: createUserIsSuccess}] =
    useCreateUserMutation();

  //useEffect's
  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;

    if (resendDisable) {
      interval = setInterval(() => {
        setResendTimer(prevTimer => {
          if (prevTimer === 1) {
            clearInterval(interval);
            setResendDisable(false);
            return 120;
          } else {
            return prevTimer - 1;
          }
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [resendDisable]);

  useEffect(() => {
    console.log(validateOTPData, 'Effect running', validateOTPSuccess);
    if (
      validateOTPSuccess &&
      isSellerOrUser &&
      country_code &&
      phone_number &&
      name &&
      fcm_token &&
      device_id &&
      password
    ) {
      const userData = {
        country_code: country_code,
        device_id: device_id,
        email: email,
        fcm_token: fcm_token,
        name: name,
        password: password,
        phone_number: phone_number,
      };
      console.log('creating user');
      createUser(userData);
    } else if (
      !isSellerOrUser &&
      validateOTPSuccess &&
      country_code &&
      phone_number
    ) {
      navigation.navigate('CreateNewPassword', {
        country_code: country_code,
        phone_number: phone_number,
      });
    }
  }, [createUser, validateOTPSuccess]);

  useEffect(() => {
    if (createUserIsSuccess) {
      const tokenData = JSON.stringify(createUserData);
      storage.setString('token', tokenData);
      DeviceEventEmitter.emit('token', createUserData);
      navigation.navigate('IsSellerOrCustomer');
      console.log('Stored User Login Data -->', storage.getString('token'));
    }
  }, [createUserData, createUserIsSuccess]);

  useEffect(() => {
    if (validateMobileNumberSuccess && !isFromSignUp) {
      navigation.push('OTP', {
        country_code: getValues('country_code'),
        phone_number: getValues('phone_number'),
        isFromSignUp: true,
        isSellerOrUser: false,
      });
    }

    if (validateMobileNumberIsError) {
      Toast.show({
        type: 'error',
        text1: validateMobileNumberError?.data?.message,
        position: 'bottom',
      });
    }
  }, [validateMobileNumberSuccess, validateMobileNumberIsError]);

  //Function's
  const handleOTPInput = (OTPCode: string) => {
    setOTP(OTPCode);
  };

  const handleResendOTP = () => {
    if (country_code && name && phone_number) {
      const ValidateMobile = {
        country_code: country_code,
        is_existing_user: isFromSignUp ? 'False' : 'True',
        name: name,
        phone_number: phone_number,
      };
      setResendDisable(true);
      validateMobileNumber(ValidateMobile);
    }
  };

  const handleOTPSubmit = () => {
    if (country_code && phone_number) {
      const OTPRequestData = {
        country_code: country_code,
        phone_number: phone_number,
        OTP: Number(otp),
      };
      validateOTP(OTPRequestData);
    }
  };

  const handleMobile = (ValidateMobileData: ForgotPasswordFields) => {
    const MobileData = {
      name: '',
      country_code: ValidateMobileData.country_code,
      phone_number: ValidateMobileData.phone_number,
      is_existing_user: 'True',
    };
    console.log(MobileData);
    validateMobileNumber(MobileData);
  };
  //console's
  console.log(validateMobileNumberError, 'OTP from backend is ', data);
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.MainContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Ionicons
            name={'chevron-back-outline'}
            size={wp(8)}
            color={Colors.black}
          />
        </TouchableOpacity>
        <Text style={styles.TitleText}>
          {isFromSignUp ? 'OTP Verification' : 'Forgot Password'}
        </Text>
        <View style={styles.ImageContainer}>
          <Image
            source={require('../../../../assets/images/otp.png')}
            style={styles.OTPImage}
          />
        </View>

        {isFromSignUp ? (
          <View style={styles.OTPInputContainer}>
            <OTPInput length={5} onChangeText={handleOTPInput} />
            <TouchableTextDuo
              NormalText={"Didn't receive the code?"}
              TOPText={'Resend Code'}
              OTPCounter={resendTimer}
              isDisable={resendDisable}
              onPress={handleResendOTP}
            />
          </View>
        ) : (
          <View style={styles.OTPInputContainer}>
            <PhoneNumberTextInput
              control={control}
              name={'country_cca2'}
              name2={'country_code'}
              placeholder={'6969696969'}
              disabled={false}
              setValue={setValue}
              label={''}
              maxLength={10}
              placeholderTextColor={''}
              disableOnlyCC={false}
              TextInputStyle={undefined}
              scheme={scheme}
            />
          </View>
        )}
      </View>
      <View style={styles.BottomHalfContainer}>
        <LargeButton
          BTNText={isFromSignUp ? 'Confirm' : 'Continue'}
          onPress={isFromSignUp ? handleOTPSubmit : handleSubmit(handleMobile)}
          isDisable={validateOTPLoading || validateMobileNumberLoading}
          loader={true}
        />
      </View>
    </SafeAreaView>
  );
};

export default OTP;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 35,
    paddingVertical: 10,
  },
  TitleText: {
    fontFamily: 'Inter Medium',
    fontSize: wp(6),
    width: wp(92),
    alignSelf: 'center',
  },
  ImageContainer: {
    width: wp(100),
    alignItems: 'center',
  },
  OTPImage: {
    width: wp(25),
    height: wp(25),
  },
  OTPInputContainer: {
    width: wp(100),
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
  },
  BottomHalfContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
