import React, {useContext, useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {Colors} from '../../../resources/colors';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import ProfileIcon from '../../../../assets/svg/profile.svg';
import {storage} from '../../../../App';
import {RootBottomTabParams} from '../../../navigation/BottomTabNavigator';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {FlashList} from '@shopify/flash-list';
import ScreenList, {ItemObjectProp} from '../../../components/ScreenList';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import EditProfileBottomSheet from '../../../bottomsheets/EditProfileBottomSheet';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';
import {ThemeContext, themes} from '../../../resources/themes';

const Profile = ({
  navigation,
}: BottomTabScreenProps<RootBottomTabParams, 'Profile'>) => {
  const scheme = useContext(ThemeContext);
  const EditBottomSheetRef = useRef<BottomSheet>(null);
  const [profileImage, setProfileImage] = useState();
  const {userData, userProfileImage} = useSelector(state => state?.user);
  const ScreenListData = [
    {
      id: '1',
      title: 'Businesses',
      icon: 'briefcase-outline',
      naviagteTo: 'MyBusiness',
      navigationParams: '',
    },
    {
      id: '2',
      title: 'Subscription',
      icon: 'card-outline',
      naviagteTo: 'Setting',
      navigationParams: '',
    },
    {
      id: '3',
      title: 'Setting',
      icon: 'settings-outline',
      naviagteTo: 'Setting',
      navigationParams: '',
    },
  ];

  const LogoutData = {
    id: '1',
    title: 'Logout',
    icon: 'person-outline',
    rightIcon: 'log-out-outline',
    naviagteTo: 'Setting',
    navigationParams: '',
  };

  const handleLogout = () => {
    storage.clearAll();
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'SignIn',
        },
      ],
    });
  };

  useEffect(() => {
    console.log('userProfileImage', userProfileImage);
    setProfileImage(userProfileImage);
  }, [userProfileImage]);

  const renderSeparator = () => {
    return (
      <View
        style={[
          styles.ItemSeparator,
          {borderColor: scheme === 'dark' ? Colors.gray : Colors.black},
        ]}
      />
    );
  };

  const handleScreenListNavigation = (item: ItemObjectProp) => {
    navigation.navigate(item?.naviagteTo, {
      ...item?.navigationParams,
    });
  };

  const handleEditProfile = () => {
    EditBottomSheetRef.current?.snapToIndex(0);
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
      <View style={styles.HeaderContainer}>
        <Text
          style={[
            styles.HeaderText,
            {color: scheme === 'dark' ? Colors.white : Colors.black},
          ]}>
          Account Details
        </Text>
      </View>
      <View style={styles.ProfileContainer}>
        <View style={styles.ProfileLeftContainer}>
          {profileImage ? (
            <FastImage
              style={styles.ProfileImage}
              source={{
                uri: profileImage,
                headers: {Authorization: 'someAuthToken'},
                priority: FastImage.priority.normal,
                cache: FastImage.cacheControl.immutable,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          ) : (
            <View style={styles.ProfileIconContainer}>
              <ProfileIcon
                height={wp(18)}
                width={wp(18)}
                fill={Colors.orange}
              />
            </View>
          )}
          <View style={styles.UserInfoContainer}>
            <Text
              style={[
                styles.NameText,
                {color: scheme === 'dark' ? Colors.white : Colors.black},
              ]}>
              {userData?.name}
            </Text>
            <View style={styles.ContantInfoContainer}>
              <Ionicons name="call" size={18} color={Colors.orange} />
              <Text
                style={[
                  [
                    styles.phoneText,
                    {color: scheme === 'dark' ? Colors.white : Colors.black},
                  ],
                ]}>
                {userData?.phone_number}
              </Text>
            </View>
            {userData?.email && (
              <View style={styles.ContantInfoContainer}>
                <Ionicons name="mail" size={18} color={Colors.orange} />
                <Text
                  style={[
                    styles.EmailText,
                    {color: scheme === 'dark' ? Colors.white : Colors.black},
                  ]}>
                  {userData?.email}
                </Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.EditIconPressable}>
          <Pressable onPress={handleEditProfile}>
            <Ionicons name="create-outline" size={20} color={Colors.orange} />
          </Pressable>
        </View>
      </View>
      <View style={styles.ScreenListContainer}>
        <FlashList
          data={ScreenListData}
          bounces={false}
          estimatedItemSize={4}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <ScreenList item={item} onPress={handleScreenListNavigation} />
          )}
          ItemSeparatorComponent={renderSeparator}
        />
      </View>
      <View>
        <ScreenList item={LogoutData} onPress={handleLogout} />
      </View>
      <EditProfileBottomSheet Ref={EditBottomSheetRef} UserData={userData} />
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
    // color: Colors.green,
  },
  ProfileContainer: {
    width: wp(100),
    paddingHorizontal: wp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: wp(20),
  },
  ProfileImage: {
    height: wp(20),
    width: wp(20),
    borderRadius: wp(10),
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
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: wp(5),
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
    height: '100%',
  },
  ScreenListContainer: {
    flex: 1,
  },
  ItemSeparator: {
    borderWidth: 0.5,
  },
});
