import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {Colors} from '../../../resources/colors';
import LargeButton from '../../../components/LargeButton';
import {
  widthPercentageToDP as wp,
  // heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../navigation/StackNavigator';
import {ThemeContext, themes} from '../../../resources/themes';

const IsSellerOrCustomer = ({
  navigation,
}: NativeStackScreenProps<RootStackParams, 'IsSellerOrCustomer'>) => {
  const scheme = useContext(ThemeContext);

  const handleBusinessUser = () => {
    navigation.navigate('AddBusiness', {
      isFromSignUp: true,
    });
  };
  const handleNormalUser = () => {
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
        <View style={styles.TextContainer}>
          <Text style={styles.TitleText}>VendIt!</Text>
          <Text
            style={[
              styles.SubTitleText,
              {color: scheme === 'dark' ? Colors.white : Colors.black},
            ]}>
            Do you want to sell goods or services?
          </Text>
        </View>
        <View style={styles.ButtonContainer}>
          <LargeButton
            BTNText="Yes, I have a business"
            onPress={handleBusinessUser}
            isDisable={false}
            loader={true}
          />
          <LargeButton
            BTNText="No, I'm just a user"
            onPress={handleNormalUser}
            isDisable={false}
            isSkipBtn={true}
          />
        </View>
      </View>
      <View style={styles.BottomContainer}>
        <></>
      </View>
    </View>
  );
};

export default IsSellerOrCustomer;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // gap: 45,
  },
  TopContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: wp(10),
  },
  TextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  TitleText: {
    fontSize: wp(9),
    color: Colors.lightGreen,
    fontFamily: 'Inter Medium',
  },
  SubTitleText: {
    fontSize: wp(4),
    fontFamily: 'Inter Regular',
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
  BottomContainer: {
    flex: 1,
    // backgroundColor: 'orange',
  },
});
