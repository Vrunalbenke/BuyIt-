import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {Colors} from '../../../resources/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SearchbarInput from '../../../components/SearchbarInput';
import {
  useBusinessTypesQuery,
  useGetFavoriteBusinessQuery,
  useGetFavoriteBusinessTypesQuery,
  useMarkFavoriteBusinessMutation,
} from '../../../services/Business';
import {FlashList} from '@shopify/flash-list';
import {generateRandomHexCode} from '../../../utils/RandomHexCodeGenerator';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ScrollableWrapper from '../../../components/ScrollableWrapper';
import {BusinessType} from '../Home';
import BusinessTypeCard from '../../../components/BusinessTypeCard';
import Toast from 'react-native-toast-message';
import {ThemeContext, themes} from '../../../resources/themes';

const Favorite = () => {
  const scheme = useContext(ThemeContext);
  const [searchString, setSearchString] = useState('');
  const [randomHexCodeArray, setRandomHexCodeArray] = useState<string[]>();

  const [businessTypes, setBusinessTypes] = useState<BusinessType[]>([]);
  const {data: FBData, isSuccess: FBIsSuccess} =
    useGetFavoriteBusinessQuery(null);

  const {data: BusinessTypesData, isSuccess: BusinessTypesIsSuccess} =
    useBusinessTypesQuery(null);
  const {data: FavoriteBusinessTypesData} =
    useGetFavoriteBusinessTypesQuery(null);

  const [markFavoriteBusiness, {isSuccess: MFBIsSuccess, isError: MFBIsError}] =
    useMarkFavoriteBusinessMutation();

  useEffect(() => {
    if (BusinessTypesIsSuccess) {
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
      setBusinessTypes(BusinessTypesArray.filter(item => item.isFavorite));
    }
  }, [FavoriteBusinessTypesData, BusinessTypesData, BusinessTypesIsSuccess]);

  useEffect(() => {
    if (FBIsSuccess) {
      setRandomHexCodeArray(generateRandomHexCode(FBData.length));
    }
  }, [FBIsSuccess, FBData]);

  useEffect(() => {
    if (MFBIsSuccess) {
      Toast.show({
        type: 'success',
        text1: 'Remove from favorite',
        position: 'bottom',
      });
    } else if (MFBIsError) {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
        position: 'bottom',
      });
    }
  }, [MFBIsSuccess, MFBIsError]);

  const handleFavoriteBusiness = (item: BusinessType) => {
    const body = {
      business_id: item.id,
      is_favourite: 'False',
    };
    markFavoriteBusiness(body);
  };

  console.log('businessTypes -->', businessTypes);
  const renderFavoriteBusiness = ({item, index}) => {
    return (
      <View style={styles.FBItemContainer}>
        <View
          style={[
            styles.ImageContainer,
            {
              backgroundColor: randomHexCodeArray
                ? randomHexCodeArray[index]
                : Colors.green,
            },
          ]}>
          <Text style={styles.ImageText}>{item.name.slice(0, 1)}</Text>
        </View>
        <View style={styles.ItemInfoContainer}>
          <View style={styles.ItemNameDescContainer}>
            <Text
              style={[
                styles.NameText,
                {color: scheme === 'dark' ? Colors.white : Colors.black},
              ]}>
              {item.name}
            </Text>
            <Text
              style={[
                styles.DescText,
                {color: scheme === 'dark' ? Colors.white : Colors.black},
              ]}>
              {item.description}
            </Text>
          </View>
          <Pressable
            onPress={() => {
              handleFavoriteBusiness(item);
            }}>
            <Ionicons name="heart" size={wp(7)} color={Colors.orange} />
          </Pressable>
        </View>
      </View>
    );
  };

  const handleItemSeparator = () => <View style={styles.SeparatorContainer} />;

  // const handleActivityIndicator = () => (
  //   <ActivityIndicator size={'small'} color={Colors.gray} />
  // );

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
      <View
        style={[
          styles.HeaderContainer,
          {
            borderBottomColor: scheme === 'dark' ? Colors.gray : '#d2d2d2',
          },
        ]}>
        <Text style={styles.HeaderText}> Favorite</Text>
        <View style={[styles.SearchContainer]}>
          <SearchbarInput
            value={searchString}
            setValue={setSearchString}
            placeholder={'Search name, alias, business types'}
          />
        </View>
      </View>
      <ScrollableWrapper contentContainerStyle={styles.FavoriteContainer}>
        {FBData !== undefined && FBData?.length > 0 && (
          <FlashList
            data={FBData}
            bounces={false}
            scrollEnabled={false}
            estimatedItemSize={37}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={renderFavoriteBusiness}
            style={styles.FBFlashList}
            contentContainerStyle={styles.FBFlashListContentStyle}
            ItemSeparatorComponent={handleItemSeparator}
            ListHeaderComponent={handleItemSeparator}
            // ListEmptyComponent={handleActivityIndicator}
          />
        )}
        {businessTypes?.length > 0 && (
          <FlashList
            data={businessTypes}
            bounces={false}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            estimatedItemSize={37}
            keyExtractor={item => item.id.toString()}
            renderItem={({item, index}) => {
              return <BusinessTypeCard index={index} item={item} />;
            }}
            style={styles.FBFlashList}
            contentContainerStyle={styles.FBTFlashListContentStyle}
            ItemSeparatorComponent={handleItemSeparator}
            // ListEmptyComponent={handleActivityIndicator}
            ListHeaderComponent={handleItemSeparator}
          />
        )}
        {businessTypes?.length === 0 &&
          (FBData === undefined || FBData?.length === 0) && (
            <Text
              style={[
                styles.EmptyFavoriteBusinessText,
                {color: scheme === 'dark' ? Colors.white : Colors.black},
              ]}>
              Explore and add your favorite businesses
            </Text>
          )}
      </ScrollableWrapper>
    </View>
  );
};
export default Favorite;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  HeaderContainer: {
    width: wp(100),
    // height: hp(12),
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomWidth: 1.5,
    paddingVertical: wp(2),
  },
  HeaderText: {
    paddingHorizontal: wp(2),
    fontFamily: 'Inter Medium',
    fontSize: wp(7),
    color: Colors.green,
  },
  SearchContainer: {},
  FavoriteContainer: {
    // flex: 1,
    width: wp(100),
  },

  FBFlashList: {
    // width: wp(100),
  },
  FBFlashListContentStyle: {
    paddingHorizontal: wp(4),
  },
  FBTFlashListContentStyle: {
    paddingBottom: 20,
  },
  SeparatorContainer: {
    height: wp(4),
  },
  FBItemContainer: {
    flexDirection: 'row',
    borderColor: Colors.gray,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    gap: 10,
  },
  ImageContainer: {
    width: wp(13),
    height: wp(13),
    borderRadius: wp(6.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImageText: {
    fontFamily: 'Inter Medium',
    fontSize: wp(6),
    color: Colors.white,
  },
  ItemInfoContainer: {
    width: wp(70),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ItemNameDescContainer: {
    gap: 5,
  },
  NameText: {
    width: wp(55),
    fontFamily: 'Inter Medium',
    fontSize: wp(5),
  },
  DescText: {
    width: wp(55),
    fontFamily: 'Inter Regular',
    fontSize: wp(3.5),
    flexWrap: 'wrap',
  },
  EmptyFavoriteBusinessText: {
    fontFamily: 'Inter Regular',
    fontSize: wp(4),
    textAlign: 'center',
    paddingTop: wp(4),
  },
});
