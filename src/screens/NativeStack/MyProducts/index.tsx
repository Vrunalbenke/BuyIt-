import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {Colors} from '../../../resources/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchbarInput from '../../../components/SearchbarInput';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {FlashList} from '@shopify/flash-list';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../navigation/StackNavigator';
import {
  useGetBusinessProductQuery,
  useGetProductsImagesMutation,
} from '../../../services/Business';
import {SearchBusinessResponse} from '../../../services/Business/businessTypes';
import ProductCard from '../../../components/ProductCard';
import {generateRandomHexCode} from '../../../utils/RandomHexCodeGenerator';

const MyProducts = ({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParams, 'MyProducts'>) => {
  const [searchString, setSearchString] = useState('');
  const {business}: SearchBusinessResponse = route.params;
  const [filteredProductList, setFilteredProductList] = useState<object[]>([]);
  const [randomHexCodeArray, setRandomHexCodeArray] = useState<string[]>();
  const {
    data: ProductData,
    isError: ProductIsError,
    error: ProductError,
    isSuccess: ProductIsSuccess,
    isFetching: ProductIsFetching,
  } = useGetBusinessProductQuery(business?.alias);
  const [
    getProductsImages,
    {
      data: PIData,
      isSuccess: PIIsSuccess,
      isError: PIIsError,
      error: PIError,
      isFetching,
    },
  ] = useGetProductsImagesMutation();

  useEffect(() => {
    if (PIData && PIIsSuccess && ProductData) {
      const Data = ProductData.map((item: any) => {
        return {
          ...item,
          url: PIData[item.name],
        };
      });
      console.log('🛼🛼🛼🛼🛼🛼', Data);
      setFilteredProductList(Data);
      setRandomHexCodeArray(generateRandomHexCode(Data.length));
    } else if (PIIsError && ProductData) {
      console.log('Error in fetching Products Image', PIError);
      setFilteredProductList(ProductData);
    }
  }, [PIData, PIIsSuccess, PIIsError, PIError]);

  useEffect(() => {
    if (ProductIsSuccess && ProductData) {
      const body = {
        business_type: business.business_type,
        business_id: business.id,
      };
      getProductsImages(body);
    }
  }, [ProductIsSuccess, ProductData]);
  return (
    <View style={styles.root}>
      <View style={styles.TopContainer}>
        <View style={styles.IconContainer}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back-outline"
              size={wp(8)}
              color={Colors.black}
            />
          </Pressable>
          <Pressable
            style={styles.IconPressableContainer}
            onPress={() =>
              navigation.navigate('AddInventory', {
                is_service: business.is_service,
                business_type: business.business_type,
                from_business: true,
                business_id: business.id,
              })
            }>
            <Ionicons name={'add'} size={wp(8)} color={Colors.orange} />
          </Pressable>
        </View>
        <SearchbarInput
          value={searchString}
          setValue={setSearchString}
          placeholder={'Search'}
        />
      </View>
      <View style={styles.MiddleContainer}>
        <Text style={styles.MyBusinessText}>
          {business.is_service ? 'My Services' : 'My Products'}
        </Text>
      </View>
      <View style={styles.BottomContainer}>
        {!ProductIsFetching &&
        !isFetching &&
        filteredProductList &&
        filteredProductList.length > 0 ? (
          <FlashList
            data={filteredProductList}
            estimatedItemSize={10}
            showsVerticalScrollIndicator={false}
            // keyExtractor={(item, index) => index + item.id}
            renderItem={({item, index}) => {
              return (
                <ProductCard
                  key={index}
                  ProductData={item}
                  ProductImage={item.url}
                  IsService={business.is_service}
                  colorCode={
                    randomHexCodeArray
                      ? randomHexCodeArray[index]
                      : Colors.green
                  }
                />
              );
            }}
            ListEmptyComponent={() => (
              <ActivityIndicator size={'large'} color={Colors.gray} />
            )}
            // ItemSeparatorComponent={() => <View style={styles.ItemSeparator} />}
          />
        ) : (
          <Text style={styles.NoProductText}>
            {business.is_service ? 'No Service Added' : 'No Product Added '}
          </Text>
        )}
      </View>
    </View>
  );
};

export default MyProducts;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  TopContainer: {
    paddingVertical: wp(2),
    gap: 10,
  },
  IconContainer: {
    width: wp(100),
    paddingHorizontal: wp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  IconPressableContainer: {
    paddingHorizontal: wp(2),
    paddingVertical: wp(0.5),
    backgroundColor: Colors.offWhite,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(1),
  },
  MiddleContainer: {
    width: wp(100),
    paddingHorizontal: wp(4),
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingVertical: wp(2),
  },
  MyBusinessText: {
    fontSize: wp(6),
    fontFamily: 'Inter Medium',
    color: Colors.green,
  },
  ScanIconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  ScanText: {
    fontSize: wp(5),
    fontFamily: 'Inter Regular',
    color: Colors.green,
  },
  ScanPressableContainer: {},
  BottomContainer: {
    flex: 1,
    paddingHorizontal: wp(4),
  },

  ItemSeparator: {
    borderWidth: 0.3,
  },
  NoProductText: {
    width: wp(100),
    paddingHorizontal: wp(4),
    fontSize: wp(3.5),
    fontFamily: 'Inter Regular',
  },
});
