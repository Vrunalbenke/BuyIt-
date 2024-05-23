import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {Colors} from '../../../resources/colors';
import {
  widthPercentageToDP as wp,
  // heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LargeButton from '../../../components/LargeButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../navigation/StackNavigator';

const PasswordUpdated = ({
  navigation,
}: NativeStackScreenProps<RootStackParams, 'PasswordUpdated'>) => {
  const handleLogin = () => {
    navigation.navigate('SignIn');
  };
  return (
    <View style={styles.root}>
      <View style={styles.root}>
        <View style={styles.TopContainer}>
          <View style={styles.TitleContainer}>
            <Text style={styles.TitleText}>Password updated</Text>
          </View>
          <View style={styles.LottieContainer}>
            <LottieView
              source={require('./data.json')}
              style={styles.LottieImage}
              autoPlay
              loop={false}
            />
            <Text style={styles.SubText}>Your password has been updated!</Text>
          </View>
        </View>
        <View style={styles.BottomContainer}>
          <LargeButton
            BTNText={'Log In'}
            onPress={handleLogin}
            isDisable={false}
            isPasswordUpdate={true}
          />
        </View>
      </View>
    </View>
  );
};

export default PasswordUpdated;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.green,
  },
  TopContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TitleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TitleText: {
    fontSize: wp(7),
    fontFamily: 'Inter Regular',
  },
  LottieContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  LottieImage: {
    // flex: 1,
    width: wp(40),
    height: wp(40),
    borderRadius: wp(20),
    backgroundColor: 'white',
  },
  SubText: {
    fontFamily: 'Inter Regular',
    fontSize: wp(4),
  },
  BottomContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
