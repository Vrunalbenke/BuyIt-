import React, {useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Pressable} from 'react-native';
import FastImage from 'react-native-fast-image';
import {BusinessType} from '../../screens/BottomTab/Home';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Colors} from '../../resources/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {MotiView} from 'moti';
import Toast from 'react-native-toast-message';
import {
  useBusinessByTypeQuery,
  useBusinessTypesQuery,
  useMarkFavoriteBusinessTypeMutation,
  useSearchBusinessMutation,
} from '../../services/Business';
import LottieView from 'lottie-react-native';
import {setSearchBusinessList} from '../../Slice/businessSlice';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

type BusinessTypeCardProp = {
  item: BusinessType;
  index: number;
};

const BusinessTypeCard = ({item, index}: BusinessTypeCardProp) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [
    markFavoriteBusinessType,
    {
      data: MFBTData,
      isSuccess: MFBTIsSuccess,
      isError: MFBTIsError,
      error: MFBTError,
    },
  ] = useMarkFavoriteBusinessTypeMutation();

  const body = {
    business_type: item.name.replace(/\s/g, ''),
    // latitude: 37.57381618303843,
    // longitude: -122.01406369190072,
  };
  const {data: BTListData} = useBusinessByTypeQuery(body);

  useEffect(() => {
    if (MFBTIsError) {
      console.log(MFBTError);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
        position: 'bottom',
      });
    } else if (MFBTIsSuccess) {
      console.log(MFBTData);
      Toast.show({
        type: 'success',
        text1: !item?.isFavorite
          ? 'Added to Favorite'
          : 'Removed from Favorite',
        position: 'bottom',
      });
    }
  }, [MFBTIsSuccess, MFBTIsError]);
  const handleFavorite = () => {
    const body = {
      business_type:
        item.name === 'Pop-up Store'
          ? 'PopUpStore'
          : item.name === 'DJ'
          ? 'Dj'
          : item.name.replaceAll(' ', ''),
      is_favourite: item.isFavorite ? 'False' : 'True',
    };
    console.log(body);
    markFavoriteBusinessType(body);
  };

  const handleBusinessCard = () => {
    dispatch(setSearchBusinessList(BTListData));
    navigation.navigate('Location', {
      isFromRecent: false,
      openBusList: true,
      timeStamp: Date.now(),
      isDraggable: false,
    });
  };
  return (
    <Pressable key={index} onPress={handleBusinessCard}>
      <MotiView
        style={styles.BusinessTypeContainer}
        from={{opacity: 0, translateY: 100}}
        animate={{opacity: 1, translateY: 0}}
        transition={{delay: index * 100, type: 'timing'}}>
        <View style={styles.ImageContainer}>
          <FastImage
            style={styles.BusinessIcon}
            source={{
              uri: `http://${item?.business_icon}`,
              headers: {Authorization: 'someAuthToken'},
              priority: FastImage.priority.normal,
              cache: FastImage.cacheControl.immutable,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <Text style={styles.NameText}>{item.name}</Text>
        </View>
        <View
          style={[
            styles.BottomContainer,
            {
              justifyContent: item.is_home ? 'space-between' : 'flex-end',
            },
          ]}>
          {item.is_home && <Text style={styles.InHomeText}>In-Home</Text>}
          <Pressable onPress={handleFavorite}>
            {item.isFavorite ? (
              // <LottieView
              //   source={require('../../../assets/lottie/favoriteAnimation.json')}
              //   loop={false}
              //   autoPlay={true}
              //   style={{
              //     width: wp(15),
              //     height: wp(15),
              //     backgroundColor: 'pink',
              //   }}
              // />
              <Ionicons name="heart" size={wp(7)} color={Colors.orange} />
            ) : (
              <Ionicons name="heart-outline" size={wp(7)} color={Colors.gray} />
            )}
          </Pressable>
        </View>
      </MotiView>
    </Pressable>
  );
};

export default BusinessTypeCard;

const styles = StyleSheet.create({
  BusinessTypeContainer: {
    width: wp(45),
    borderColor: Colors.green,
    borderWidth: 3,
    borderRadius: wp(3.5),
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp(3),
    gap: wp(5),
    marginHorizontal: wp(2),
  },
  ImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  BusinessIcon: {
    width: wp(25),
    height: wp(25),
  },
  NameText: {
    fontFamily: 'Inter Medium',
    fontSize: wp(5),
    textAlign: 'center',
  },
  BottomContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  InHomeText: {
    fontFamily: 'Inter Medium',
    fontSize: wp(5),
    color: Colors.orange,
  },
});
