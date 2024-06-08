import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {Colors} from '../../../resources/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import AccountProfileIcon from '../../../../assets/svg/accountProfile.svg';
import ProfileIcon from '../../../../assets/svg/profile.svg';
import {useGetUserQuery} from '../../../services/Auth';
import LargeButton from '../../../components/LargeButton';
import {storage} from '../../../../App';
import {RootBottomTabParams} from '../../../navigation/BottomTabNavigator';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Profile = ({
  navigation,
}: BottomTabScreenProps<RootBottomTabParams, 'Profile'>) => {
  const ScreenListData = [
    {
      title: 'Businesses',
      icon: 'briefcase-outline',
      naviagteTo: 'MyBusiness',
      navigationParams: '',
    },
    {
      title: 'Setting',
      icon: 'settings-outline',
      naviagteTo: 'Setting',
      navigationParams: '',
    },
    {
      title: 'Setting',
      icon: 'settings-outline',
      naviagteTo: 'Setting',
      navigationParams: '',
    },
  ];
  const {data: GUData} = useGetUserQuery(null);
  console.log(GUData, 'User');
  return (
    <View style={styles.root}>
      <View style={styles.HeaderContainer}>
        <Text style={styles.HeaderText}>Account Details</Text>
      </View>
      <View style={styles.ProfileContainer}>
        <View style={styles.ProfileLeftContainer}>
          <View style={styles.ProfileIconContainer}>
            <ProfileIcon
              height={wp(20)}
              width={wp(20)}
              fill={Colors.darkGray}
            />
          </View>
          <View style={styles.UserInfoContainer}>
            <Text style={styles.NameText}>{GUData?.name}</Text>
            <View style={styles.ContantInfoContainer}>
              <Ionicons name="call" size={18} color={Colors.gray} />
              <Text style={styles.phoneText}>{GUData?.phone_number}</Text>
            </View>
            {!GUData?.email && (
              <View style={styles.ContantInfoContainer}>
                <Ionicons name="mail" size={18} color={Colors.gray} />
                <Text style={styles.EmailText}>{GUData?.email}</Text>
              </View>
            )}
          </View>
        </View>
        <View style={styles.EditIconPressable}>
          <Pressable>
            <Ionicons name="create-outline" size={20} color={Colors.orange} />
          </Pressable>
        </View>
      </View>

      {/* <LargeButton
        BTNText={'logout'}
        onPress={() => {
          storage.delete('token');
          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'SignIn',
              },
            ],
          });
        }}
        isDisable={false}
        isSkipBtn={false}
        loader={false}
        isPasswordUpdate={false}
      /> */}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  HeaderContainer: {
    width: wp(100),
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: wp(2),
  },
  HeaderText: {
    paddingHorizontal: wp(2),
    fontFamily: 'Inter Medium',
    fontSize: wp(7),
    color: Colors.green,
  },
  ProfileContainer: {
    width: wp(100),
    paddingHorizontal: wp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: wp(20),
  },
  ProfileLeftContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  ProfileIconContainer: {
    width: wp(20),
    height: wp(20),
    borderRadius: wp(10),
    backgroundColor: 'white',
  },
  UserInfoContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 3,
  },
  ContantInfoContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  NameText: {
    fontFamily: 'Inter Medium',
    fontSize: wp(4.5),
  },
  phoneText: {
    fontFamily: 'Inter Regular',
    fontSize: wp(3.5),
  },
  EmailText: {
    fontFamily: 'Inter Regular',
    fontSize: wp(3.5),
  },
  EditIconPressable: {
    // justifyContent: 'flex-start',
    // alignItems: 'flex-start',
    // backgroundColor: 'pink',
    height: '100%',
  },
});
