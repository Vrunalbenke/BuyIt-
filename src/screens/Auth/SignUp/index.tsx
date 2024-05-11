import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import LargeButton from '../../../components/LargeButton';
import CheckboxWithText from '../../../components/CheckboxWithText';
import PhoneNumberTextInput from '../../../components/PhoneNumberTextInput';
import UserTextInput from '../../../components/UserTextInput';
import {ThemeContext} from '../../../resources/themes';
import {
  widthPercentageToDP as wp,
  // heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors} from '../../../resources/colors';
import {z} from 'zod';
import {SignUpSchema} from '../authType';
import ScrollableWrapper from '../../../components/ScrollableWrapper';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {useValidateMobileNumberMutation} from '../../../services/Auth';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../navigation/StackNavigator';
import {SignData} from '../../../navigation/type';

export type SignUpFields = z.infer<typeof SignUpSchema>;

type SignUpProps = NativeStackScreenProps<RootStackParams, 'SignUp'>;
const SignUp = ({navigation}: SignUpProps) => {
  const {control, handleSubmit, setValue, getValues} = useForm<SignUpFields>({
    defaultValues: {
      country_cca2: 'US',
      country_code: '+1',
      device_id: 'kbceQRqf0cbNVLJL',
      fcm_token:
        'fZBu0K2YnEKulbvJhxE-Gf:APA91bGgIzpE1vNgiDhhQpyIAiMqGebX7_Xz6uki4lkF-5nBbWIC65OBg_s59W7_VZJaIThnyxcpHdalY9Go_-Z0lVK9dBDvbHhVrji8IFOnRnX00OPnkwMRoU9qd43zimboqbTZWVwl',
      latitude: 18.58561,
      longitude: 73.6807,
    },
    resolver: zodResolver(SignUpSchema),
  });
  const scheme = useContext(ThemeContext);
  const [userData, setUserData] = useState<SignData>();
  const [
    validateMobileNumber,
    {data: valideMobileData, isLoading, error, isSuccess},
  ] = useValidateMobileNumberMutation();

  const handleCheckBox = (name: any) => {
    const value = getValues(name);
    if (value) {
      setValue(name, undefined);
    } else {
      setValue(name, true);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigation.navigate('OTP', {
        userData: userData,
      });
    }
  }, [valideMobileData, isLoading, error, isSuccess]);

  const handleData = (data: SignUpFields) => {
    setUserData({
      country_code: data.country_code,
      device_id: data.device_id,
      email: data.email,
      fcm_token: data.fcm_token,
      name: data.name,
      password: data.password,
      phone_number: data.phone_number,
    });
    const validateNumber = {
      name: data.name,
      country_code: data.country_code,
      phone_number: data.phone_number,
      is_existing_user: 'False',
    };
    validateMobileNumber(validateNumber);
  };
  return (
    <ScrollableWrapper contentContainerStyle={styles.ScrollableWrapper}>
      <View style={styles.root}>
        <Text style={styles.text}>VendIt!</Text>
        <View style={styles.TextInputContainer}>
          <UserTextInput
            control={control}
            name={'name'}
            label="Name"
            placeholder={'John Doe'}
            disabled={false}
            size={wp(7)}
            iconColor={'#899499'}
            inputMode={'text'}
          />
          <UserTextInput
            control={control}
            name={'email'}
            label="Email"
            placeholder={'johndoe29@gmail.com'}
            disabled={false}
            size={wp(7)}
            iconColor={'#899499'}
            inputMode={'text'}
            Optional={true}
          />
          <View style={styles.PhoneNumberContainer}>
            <PhoneNumberTextInput
              control={control}
              name={'country_cca2'}
              name2={'country_code'}
              placeholder={'ilovevendit@app.com'}
              disabled={false}
              setValue={setValue}
              label={''}
              maxLength={10}
              placeholderTextColor={''}
              disableOnlyCC={false}
              TextInputStyle={undefined}
              scheme={scheme}
            />
            <CheckboxWithText
              control={control}
              name={'AllowSms'}
              NormalText={'Allow SMS on the Phone Number Above'}
              disabled={false}
              onPress={handleCheckBox}
            />
          </View>
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
          <UserTextInput
            control={control}
            name={'confirmPassword'}
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

          <View style={styles.PasswordContainer}>
            <CheckboxWithText
              control={control}
              name={'PrivacyPolicy'}
              NormalText={'I agree to the'}
              TOPText={'Terms and Condition'}
              TOPTextColor={Colors.green}
              disabled={false}
              onPress={handleCheckBox}
              onPressTOP={() => {
                console.log('CheckBox Text click');
              }}
            />
            <CheckboxWithText
              control={control}
              name={'TermsAndCondition'}
              NormalText={'I agree to the'}
              TOPText={'Privacy Policy'}
              TOPTextColor={Colors.green}
              disabled={false}
              onPress={handleCheckBox}
              onPressTOP={() => {
                console.log('CheckBox Text click');
              }}
            />
          </View>
        </View>

        <View style={styles.ButtonContainer}>
          <LargeButton
            BTNText="Next"
            onPress={handleSubmit(handleData)}
            isDisable={isLoading}
            loader={true}
          />
          <View style={styles.BottomSignUpTextContainer}>
            <Text style={styles.HaveAccountText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text style={styles.SignUpText}> Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollableWrapper>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  ScrollableWrapper: {
    backgroundColor: '#FFF',
  },
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    gap: 35,
    paddingTop: 40,
    paddingBottom: 20,
  },
  text: {
    fontSize: 35,
    color: Colors.lightGreen,
    fontFamily: 'Inter Medium',
  },
  TextInputContainer: {
    gap: 15,
  },
  PhoneNumberContainer: {
    width: wp(92),
    alignItems: 'flex-start',
    gap: 5,
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
