import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, Platform, Image} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import ProfileIcon from '../../../assets/svg/profile.svg';
import {Colors} from '../../resources/colors';
import UserTextInput from '../UserTextInput';
import {useForm} from 'react-hook-form';
import LargeButton from '../LargeButton';
import {z} from 'zod';
import {EditProfileFormFields} from '../types';
import {zodResolver} from '@hookform/resolvers/zod';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {storage} from '../../../App';
import {userProfileImage, UserData as UData} from '../../screens/common';
import Toast from 'react-native-toast-message';
import {DeviceEventEmitter} from 'react-native';
import {useLazyGetUserQuery, useUpdateUserMutation} from '../../services/Auth';
import {useDispatch} from 'react-redux';
import {setProfileImage, setUser} from '../../Slice/userSlice';

type EditProfileBottomSheetProps = {
  Ref: React.Ref<BottomSheet>;
  UserData: {
    country_code: string;
    email: string | undefined;
    name: string;
    phone_number: string;
  };
};

type EditProfileSchema = z.infer<typeof EditProfileFormFields>;

const EditProfileBottomSheet = ({
  Ref,
  UserData,
}: EditProfileBottomSheetProps) => {
  const dispatch = useDispatch();
  const snapPoints = ['50%'];
  const {control, handleSubmit} = useForm({
    defaultValues: {
      name: UserData?.name,
      email: UserData?.email,
    },
    resolver: zodResolver(EditProfileFormFields),
  });
  const [profileURI, setProfileURI] = useState<string | undefined>(
    userProfileImage,
  );

  const [
    updateUser,
    {
      data: UUData,
      isError: UUIsError,
      isSuccess: UUIsSuccess,
      error: UUError,
      isLoading,
      originalArgs,
      endpointName,
    },
  ] = useUpdateUserMutation();

  const [
    trigger,
    {data: GUData, isSuccess: GUIsSuccess, error: GUError, isError: GUIsError},
  ] = useLazyGetUserQuery();
  useEffect(() => {
    if (GUIsSuccess) {
      const userData = {
        ...UData,
        email: GUData.email,
        name: GUData.name,
      };
      dispatch(setUser(userData));
      console.log(userData, 'User data', GUData);
      storage.set('user', JSON.stringify(userData));
      DeviceEventEmitter.emit('user', userData);
    } else if (GUIsError) {
      console.log(GUError, 'Error While getting user');
    }
  }, [GUData, GUIsSuccess, GUIsError, GUError]);

  useEffect(() => {
    console.log(originalArgs, '<><>:::', endpointName);
    if (UUIsError) {
      console.log('UUError', UUError);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
        position: 'bottom',
      });

      Ref?.current?.close();
    } else if (UUIsSuccess) {
      console.log('UUData', UUData);
      trigger();
      Toast.show({
        type: 'success',
        text1: 'Profile Upated Successfully',
        position: 'bottom',
      });
      Ref?.current?.close();
      if (profileURI && profileURI !== userProfileImage) {
        dispatch(setProfileImage(profileURI));
        storage.set('profileImage', profileURI);
        DeviceEventEmitter.emit('profileImage', profileURI);
      }
    }
  }, [UUData, UUError, UUIsError, UUIsSuccess]);

  const handleCamera = () => {
    launchCamera(
      {
        mediaType: 'photo',
        quality: 1,
        includeBase64: true,
      },
      response => {
        // if (response.didCancel) {
        //   console.log('User cancelled camera picker');
        // } else if (response.errorCode) {
        //   console.log('Camera error: ', response.errorMessage);
        // } else {
        //   const imageUri =
        //     Platform.OS === 'ios' ? response?.uri : response?.path;

        console.log('Image uri: ', response.assets[0]?.uri);
        setProfileURI(response.assets[0]?.uri);

        //     }
      },
    );
  };
  const handleGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0,
      },
      response => {
        console.log('Image uri: ', response.assets[0]?.uri);
        setProfileURI(response.assets[0]?.uri);
        //     }
      },
    );
  };
  const handleData = (data: EditProfileSchema) => {
    console.log('Data', data);
    data.email = data?.email ? data?.email.trim() : '';
    console.log('Update Data', data);
    updateUser(data);
  };

  return (
    <BottomSheet index={-1} snapPoints={snapPoints} ref={Ref}>
      <View style={styles.root}>
        <View style={styles.SelectImageContainer}>
          {profileURI ? (
            <Image
              source={{uri: profileURI}}
              resizeMode="cover"
              style={styles.ProfileImage}
            />
          ) : (
            <View style={styles.ProfileIconContainer}>
              <ProfileIcon height={wp(20)} width={wp(20)} fill={Colors.black} />
            </View>
          )}
          <View style={styles.BTNContainer}>
            <Pressable onPress={handleGallery}>
              <View style={styles.SingleBTNContainer}>
                <Ionicons name="images" size={wp(4)} color={Colors.black} />
                <Text style={styles.BTNText}>
                  Open {Platform.OS === 'android' ? 'Gallery' : 'Photos'}
                </Text>
              </View>
            </Pressable>
            <Pressable onPress={handleCamera}>
              <View style={styles.SingleBTNContainer}>
                <Ionicons name="camera" size={wp(4)} color={Colors.black} />
                <Text style={styles.BTNText}>Open Camera</Text>
              </View>
            </Pressable>
          </View>
        </View>
        <View style={styles.InputContainer}>
          <UserTextInput
            control={control}
            name={'name'}
            label="Name"
            placeholder={'John Doe'}
            disabled={false}
            size={wp(7)}
            inputMode={'text'}
          />
          <UserTextInput
            control={control}
            name={'email'}
            label="Email"
            placeholder={'johndoe121@gmail.com'}
            disabled={false}
            size={wp(7)}
            inputMode={'text'}
            Optional={true}
          />
        </View>
        <View style={styles.SubmitBTNContainer}>
          <LargeButton
            BTNText="Next"
            onPress={handleSubmit(handleData)}
            isDisable={isLoading}
            loader={true}
          />
        </View>
      </View>
    </BottomSheet>
  );
};

export default EditProfileBottomSheet;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  SelectImageContainer: {
    width: wp(100),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: wp(4),
  },
  ProfileImage: {
    height: wp(20),
    width: wp(20),
    borderRadius: wp(10),
  },
  ProfileIconContainer: {
    width: wp(24),
    height: wp(24),
    borderRadius: wp(12),
    backgroundColor: '#E2E2E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  BTNContainer: {
    gap: 10,
  },
  SingleBTNContainer: {
    padding: wp(2),
    backgroundColor: Colors.orange,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  BTNText: {
    fontSize: wp(3),
    fontFamily: 'Inter Regular',
    color: Colors.black,
  },
  InputContainer: {
    width: wp(100),
    paddingHorizontal: wp(4),
    gap: 10,
  },
  SubmitBTNContainer: {
    padding: wp(4),
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(100),
  },
});
