import React, {useState, useEffect, useRef, memo} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {Colors} from '../../resources/colors';
import {
  widthPercentageToDP as wp,
  // heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

type OTPInputProps = {
  length: number;
  onChangeText: (OTPCode: string) => void;
};

const OTPInput = memo(({length = 5, onChangeText}: OTPInputProps) => {
  const [otp, setOtp] = useState(new Array(length).fill(''));
  const [countBackspace, setCountBackSpace] = useState(0);
  const refs = useRef(new Array(length).fill(null));

  useEffect(() => {
    setOtp(new Array(length).fill(''));
  }, [length]);

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

    if (newOtp.length === 5) {
      let response = newOtp.join('');
      onChangeText(response);
    }

    // if (onChangeText) {
    //   onChangeText(newOtp.join(''));
    // }
    if (value && index < length - 1) {
      refs.current[index + 1]?.focus();
      handleInputStyle(index + 1);
    }

    // if (!value && index > 0 && index !== 4 && countBackspace > 1) {
    //   refs.current[index - 1]?.focus();
    //   handleInputStyle(index - 1);
    // }
  };

  const handleKeyPress = (index: number, event: any, value: string) => {
    const newOtp = [...otp];

    if (event.nativeEvent.key === 'Backspace') {
      handleBackspace(index, value);
    } else {
      newOtp[index] = event.nativeEvent.key;
      setOtp(newOtp);
    }
  };

  const handleBackspace = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = '';
    setOtp(newOtp);
    console.log(countBackspace, 'QWERTY', index);

    if (!value && index > 0 && (index !== 4 || countBackspace > 1)) {
      refs.current[index - 1]?.focus();
      handleInputStyle(index - 1);
    }

    if (index === 4) {
      setCountBackSpace(prev => prev + 1);
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
          onKeyPress={event => handleKeyPress(index, event, digit)}
        />
      ))}
    </View>
  );
});

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
    fontSize: wp(5),
    fontFamily: 'Inter Medium',
    backgroundColor: Colors.extremeLightGreen,
    color: Colors.black,
  },
});

export default OTPInput;
