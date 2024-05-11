import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
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

type OTPProps = NativeStackScreenProps<RootStackParams, 'OTP'>;
const OTP = ({route, navigation}: OTPProps) => {
  console.log(route.params.userData);

  const handleSubmit = () => {};
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
        <Text style={styles.TitleText}>OTP Verification</Text>
        <View style={styles.ImageContainer}>
          <Image
            source={require('../../../../assets/images/otp.png')}
            style={styles.OTPImage}
          />
        </View>
        <View style={styles.OTPInputContainer}>
          <OTPInput length={5} />
          <TouchableTextDuo
            NormalText={"Didn't receive the code?"}
            TOPText={' Resend Code'}
            onPress={() => {
              console.log('Resend Code');
            }}
          />
        </View>
      </View>
      <View style={styles.BottomHalfContainer}>
        <LargeButton
          BTNText="Confirm"
          onPress={handleSubmit}
          isDisable={false}
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
