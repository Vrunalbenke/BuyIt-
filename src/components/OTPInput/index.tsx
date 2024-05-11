import React, {useState, useEffect, useRef} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {Colors} from '../../resources/colors';
import {
  widthPercentageToDP as wp,
  // heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

type OTPInputProps = {
  length: number;
  //   onChangeText?: () => {};
};

const OTPInput = ({length = 5}: OTPInputProps) => {
  const [otp, setOtp] = useState(new Array(length).fill(''));
  const refs = useRef(new Array(length).fill(null));

  useEffect(() => {
    setOtp(new Array(length).fill(''));
  }, [length]);

  console.log(otp);

  useEffect(() => {
    refs.current[0].focus();
    refs.current[0]?.setNativeProps({
      style: {
        borderBottomWidth: wp(1),
        borderBottomColor: Colors.green,
      },
    });
  }, []);

  const handleInputStyle = (index: number) => {
    console.log(index, 'Index');
    for (let i = 0; i < length; i++) {
      if (index === i) {
        refs.current[index]?.setNativeProps({
          style: {
            borderBottomWidth: wp(1),
            borderBottomColor: Colors.green,
          },
        });
      } else {
        refs.current[i]?.setNativeProps({
          style: {
            borderBottomWidth: 0,
            borderBottomColor: Colors.transparent,
          },
        });
      }
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // if (onChangeText) {
    //   onChangeText(newOtp.join(''));
    // }

    if (value && index < length - 1) {
      refs.current[index + 1]?.focus();
      handleInputStyle(index + 1);
    }

    if (!value && index > 0) {
      refs.current[index - 1]?.focus();
      handleInputStyle(index - 1);
    }
  };

  return (
    <View style={styles.otpContainer}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          style={styles.otpInput}
          value={digit}
          maxLength={1}
          keyboardType="number-pad"
          onChangeText={value => handleOtpChange(index, value)}
          ref={ref => (refs.current[index] = ref)}
          caretHidden={true}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(100),
    gap: 20,
  },
  otpInput: {
    width: wp(14),
    height: wp(12),
    borderRadius: 5,
    // marginHorizontal: 5,
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: Colors.extremeLightGreen,
  },
});

export default OTPInput;
