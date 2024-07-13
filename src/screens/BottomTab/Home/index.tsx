import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Colors} from '../../../resources/colors';
import {Pressable} from 'react-native';
import ScannerIcon from '../../../../assets/svg/scanner.svg';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SearchbarInput from '../../../components/SearchbarInput';
import {FlashList} from '@shopify/flash-list';
import {
  useBusinessTypesQuery,
  useGetFavoriteBusinessTypesQuery,
} from '../../../services/Business';
import BusinessTypeCard from '../../../components/BusinessTypeCard';
import {ActivityIndicator} from 'react-native';
import {setProfileImage, setUser} from '../../../Slice/userSlice';
import {UserData, userProfileImage} from '../../common';
import {useDispatch} from 'react-redux';

export type BusinessType = {
  business_icon: string;
  is_home: boolean;
  is_service: boolean;
  id: number;
  name: string;
  isFavorite: boolean | undefined;
};
const Home = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [businessTypes, setBusinessTypes] = useState<BusinessType[]>();
  const dispatch = useDispatch();

  const {data: BusinessTypesData, isSuccess: BusinessTypesIsSuccess} =
    useBusinessTypesQuery(null);
  const {data: FavoriteBusinessTypesData} =
    useGetFavoriteBusinessTypesQuery(null);

  useEffect(() => {
    dispatch(setUser(UserData));
    dispatch(setProfileImage(userProfileImage));
  }, []);

  useEffect(() => {
    if (BusinessTypesIsSuccess) {
      console.log(FavoriteBusinessTypesData);
      const BusinessTypesArray = Object.keys(BusinessTypesData).map(
        (key, index) => ({
          id: index + 1,
          name: key,
          isFavorite:
            key === 'Pop-up Store'
              ? FavoriteBusinessTypesData?.includes('Pop Up Store')
              : key === 'DJ'
              ? FavoriteBusinessTypesData?.includes('Dj')
              : FavoriteBusinessTypesData?.includes(key),
          ...BusinessTypesData[key],
        }),
      );
      setBusinessTypes(BusinessTypesArray);
    }
  }, [FavoriteBusinessTypesData, BusinessTypesData, BusinessTypesIsSuccess]);

  const handleActivityIndicator = () => (
    <ActivityIndicator size={'small'} color={Colors.gray} />
  );

  return (
    <View style={styles.root}>
      <View style={styles.HeaderContainer}>
        <View style={styles.TitleContainer}>
          <Text style={styles.TitleText}>What are you looking for?</Text>
          <Pressable style={styles.ScanPressable}>
            <Text style={styles.ScannerText}>Scan</Text>
            <ScannerIcon height={wp(7)} width={wp(7)} fill={Colors.green} />
          </Pressable>
        </View>
        <SearchbarInput
          value={searchValue}
          setValue={setSearchValue}
          placeholder={'Search name, alias, business types'}
        />
      </View>
      <View style={styles.FlashListWrapper}>
        <FlashList
          data={businessTypes}
          keyExtractor={item => item.id.toString()}
          bounces={false}
          showsVerticalScrollIndicator={false}
          estimatedItemSize={30}
          renderItem={({item, index}) => {
            return <BusinessTypeCard index={index} item={item} />;
          }}
          numColumns={2}
          style={styles.FlashList}
          contentContainerStyle={styles.FlashListContentStyle}
          ItemSeparatorComponent={() => <View style={styles.SeparatorStyle} />}
          ListEmptyComponent={handleActivityIndicator}
        />
      </View>
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  HeaderContainer: {
    gap: 10,
    paddingVertical: wp(2),
    borderBottomWidth: 1.5,
    borderBottomColor: '#d2d2d2',
  },
  TitleContainer: {
    flexDirection: 'row',
    width: wp(100),
    paddingHorizontal: wp(2),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  TitleText: {
    fontFamily: 'Inter Medium',
    fontSize: wp(5),
    color: Colors.black,
  },
  ScanPressable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 5,
  },
  ScannerText: {
    fontFamily: 'Inter Regular',
    fontSize: wp(5),
    color: Colors.green,
  },
  FlashListWrapper: {
    flex: 1,
    width: wp(100),
    // height: hp(70.5),
  },
  FlashList: {},
  FlashListContentStyle: {
    paddingVertical: 10,
  },
  SeparatorStyle: {
    height: wp(4.1),
    // height: 16,
  },
});
