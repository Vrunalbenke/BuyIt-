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
import {useLoginMutation} from '../../../services/Auth';
import {zodResolver} from '@hookform/resolvers/zod';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../navigation/StackNavigator';

type LoginFields = z.infer<typeof loginSchema>;

type SignInProps = NativeStackScreenProps<RootStackParams, 'SignIn'>;
const SignIn = ({navigation}: SignInProps) => {
  const {control, setValue, handleSubmit} = useForm<LoginFields>({
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

  const [login, {data: LoginResponse, isError, error, isLoading}] =
    useLoginMutation();

  useEffect(() => {
    console.log(LoginResponse);
    console.log(error);
  }, [LoginResponse, isError, error]);

  const handleData = (data: LoginFields) => {
    login(data);
  };
  return (
    <View style={styles.root}>
      <Text style={styles.text}>VendIt!</Text>
      <View style={styles.TextInputContainer}>
        <PhoneNumberTextInput
          control={control}
          name={'country_cca2'}
          // label="Email"
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
            onPress={() => console.log('Forgot Password')}
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
  text: {
    fontSize: 35,
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
