import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useState} from 'react';
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
import CheckboxWithText from '../../../components/CheckboxWithText';

type LoginFields = z.infer<typeof loginSchema>;

const SignIn = () => {
  const {control, setValue, handleSubmit} = useForm<LoginFields>({
    defaultValues: {
      country_cca2: 'US',
      country_code: '1',
    },
  });
  const [status, setStatus] = useState(false);
  const scheme = useContext(ThemeContext);

  const handleData = (data: LoginFields) => {
    console.log(data);
  };
  return (
    <View style={styles.root}>
      <Text style={styles.text}>Hello VendIt!</Text>
      <UserTextInput
        control={control}
        name={'email'}
        label="Email"
        placeholder={'ilovevendit@app.com'}
        disabled={false}
        icon={'eye-outline'}
        toggleicon={'eye-off-outline'}
        secureTextEntry={true}
        size={wp(7)}
        iconColor={'#899499'}
        inputMode={'email'}
      />
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
      <CheckboxWithText
        NormalText={'I agree to'}
        TOPText={'Terms and Conditions.'}
        status={status}
        disabled={false}
        onPress={() => setStatus(prev => !prev)}
        onPressTOP={() => console.log('Terms and Conditions')}
      />

      <Button title="Submit" onPress={handleSubmit(handleData)} />
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
    gap: 20,
  },
  text: {
    fontSize: 30,
    color: 'orange',
  },
});
