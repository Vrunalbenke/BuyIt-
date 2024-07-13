import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import React, {useEffect, useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {SceneMap, TabView} from 'react-native-tab-view';
import {Colors} from '../../resources/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  useGetBusinessProductQuery,
  useGetProductsImagesMutation,
} from '../../services/Business';
import ProductCard from '../../components/ProductCard';
import {SearchBusinessResponse} from '../../services/Business/businessTypes';
import {generateRandomHexCode} from '../../utils/RandomHexCodeGenerator';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const FirstRoute = ({business}) => {
  const handleFavorite = () => {};
  console.log(business, '<><><>');
  return (
    <View style={styles.TabBarRoot}>
      <BottomSheetScrollView>
        <View style={styles.BusinessFirstContainer}>
          <View style={styles.BusinessTitleContainer}>
            <Text style={styles.NameText}>{business?.name}</Text>
            <Text style={styles.AliasText}>{business?.alias}</Text>
          </View>
          <View style={styles.ShareFavoriteIconContainer}>
            <Pressable onPress={handleFavorite}>
              {business?.is_service ? (
                <Ionicons name="heart" size={wp(7)} color={Colors.orange} />
              ) : (
                <Ionicons
                  name="heart-outline"
                  size={wp(7)}
                  color={Colors.gray}
                />
              )}
            </Pressable>
            <Pressable>
              <Ionicons name="share-social" size={wp(6)} color={Colors.green} />
            </Pressable>
          </View>
        </View>
        {business?.description && (
          <View style={styles.BusinessInfoContainer}>
            <Text style={styles.DescText}>Description</Text>
            <View style={styles.BusinessDescription}>
              <Text style={styles.BusinessDescriptionText}>
                {business?.description}
              </Text>
            </View>
          </View>
        )}
        {(business?.share_email === 'True' ||
          business?.share_phone === 'True') && (
          <View style={styles.BusinessContactContainer}>
            <Text style={styles.DescText}>Contacts</Text>
            <View>
              {business?.share_phone === 'True' && (
                <Text style={styles.BusinessDescriptionText}>
                  {business?.country_code}-{business?.phone_number}
                </Text>
              )}
              {business?.share_email === 'True' && (
                <Text style={styles.BusinessDescriptionText}>
                  {business?.email}
                </Text>
              )}
            </View>
          </View>
        )}
        {(business?.instagram !== 'None' ||
          business?.website !== 'None' ||
          business?.facebook !== 'None') && (
          <View style={styles.BusinessInfoContainer}>
            <Text style={styles.DescText}>Socials</Text>
            {business?.instagram !== 'None' && (
              <View style={styles.SocialContainer}>
                <Ionicons
                  name="logo-instagram"
                  size={wp(7)}
                  color={Colors.black}
                />
                <Text style={styles.BusinessDescriptionText}>
                  {business?.instagram}
                </Text>
              </View>
            )}
            {business?.facebook !== 'None' && (
              <View style={styles.SocialContainer}>
                <Ionicons
                  name="logo-facebook"
                  size={wp(7)}
                  color={Colors.black}
                />
                <Text style={styles.BusinessDescriptionText}>
                  {business?.facebook}
                </Text>
              </View>
            )}
            {business?.website !== 'None' && (
              <View style={styles.SocialContainer}>
                <Ionicons
                  name="globe-outline"
                  size={wp(7)}
                  color={Colors.black}
                />
                <Text style={styles.BusinessDescriptionText}>
                  {business?.website}
                </Text>
              </View>
            )}
          </View>
        )}
      </BottomSheetScrollView>
    </View>
  );
};
const SecondRoute = ({business, ProductData, PIData}) => {
  console.log(PIData, 'Product of the business are -->', ProductData);
  const [randomHexCodeArray, setRandomHexCodeArray] = useState<string[]>();
  useEffect(() => {
    setRandomHexCodeArray(generateRandomHexCode(ProductData?.length));
  }, []);
  // console.log(PIData[ProductData[0]?.name]);
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={styles.HeaderContainer}>
        <Text style={styles.HeaderText}>Products</Text>
        <Pressable style={styles.EditContainer}>
          <Ionicons name="create-outline" size={wp(5)} color={Colors.orange} />
          <Text style={styles.EditText}>Edit</Text>
        </Pressable>
      </View>
      {ProductData?.map((product, index) => {
        return (
          <ProductCard
            key={index}
            ProductData={product}
            ProductImage={PIData ? PIData[product?.name] : null}
            IsService={business.is_service}
            colorCode={
              randomHexCodeArray ? randomHexCodeArray[index] : Colors.green
            }
          />
        );
      })}
    </View>
  );
};
const ThirdRoute = ({business}) => (
  <View style={styles.ThirdRouteContainer}>
    <Text style={{color: Colors.green, fontSize: wp(10)}}>
      {business?.alias}
    </Text>
  </View>
);

const renderScene = (props, ProductData, PIData) =>
  SceneMap({
    first: () => {
      return <FirstRoute business={props} />;
    },
    second: () => (
      <SecondRoute business={props} ProductData={ProductData} PIData={PIData} />
    ),
    third: () => <ThirdRoute business={props} />,
  });

type BusinessDetailBottomSheetProps = {
  bottomSheetRef: React.Ref<BottomSheet>;
  business: SearchBusinessResponse;
};
const BusinessDetailBottomSheet = ({
  bottomSheetRef,
  business,
}: BusinessDetailBottomSheetProps) => {
  const [index, setIndex] = useState(0);

  const {width} = useWindowDimensions();
  const TAB_WIDTH = width / 3;
  console.log(TAB_WIDTH, 'width');
  const [routes] = useState([
    {key: 'first', title: 'Details'},
    {key: 'second', title: 'Products'},
    {key: 'third', title: 'Reviews'},
  ]);
  const snapPoints = ['50%', '75%', '100%'];
  const {data: ProductData, isSuccess: ProductIsSuccess} =
    useGetBusinessProductQuery(business?.alias);
  const [
    getProductsImages,
    {data: PIData, isError: PIIsError, error: PIError},
  ] = useGetProductsImagesMutation();

  useEffect(() => {
    if (ProductIsSuccess) {
      const body = {
        business_type: business.business_type,
        business_id: business.id,
      };
      getProductsImages(body);
    }
  }, [ProductIsSuccess]);

  useEffect(() => {
    console.log('Error while getting product image ', PIError);
  }, [PIIsError]);

  const renderTabBar = props => {
    const AnimatedStyle = useAnimatedStyle(() => {
      return {transform: [{translateX: withTiming(TAB_WIDTH * index)}]};
    });

    return (
      <View style={styles.tabBar}>
        <Animated.View
          style={[styles.AnimatedView, {width: TAB_WIDTH}, AnimatedStyle]}>
          <View style={styles.slidingTab} />
        </Animated.View>
        {props.navigationState.routes.map((route, i) => {
          return (
            <Pressable style={[styles.tabItem]} onPress={() => setIndex(i)}>
              <Animated.Text
                style={[
                  styles.TopTabBarText,
                  {color: index === i ? Colors.white : Colors.green},
                ]}>
                {route.title}
              </Animated.Text>
            </Pressable>
          );
        })}
      </View>
    );
  };

  return (
    <BottomSheet
      index={-1}
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      // enablePanDownToClose
      enableHandlePanningGesture
      enableContentPanningGesture
      enableOverDrag={true}
      overDragResistanceFactor={1}>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene(business, ProductData, PIData)}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{width: wp(100)}}
      />
    </BottomSheet>
  );
};

export default BusinessDetailBottomSheet;

const styles = StyleSheet.create({
  BottomSheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  TabBarRoot: {
    flex: 1,
    marginBottom: 10,
  },
  BusinessFirstContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(100),
    paddingHorizontal: wp(4),
    paddingVertical: wp(2),
  },
  BusinessTitleContainer: {
    gap: 5,
  },
  NameText: {
    fontSize: wp(6),
    fontFamily: 'Inter Medium',
    color: Colors.black,
    textAlign: 'center',
  },
  AliasText: {
    fontSize: wp(4),
    fontFamily: 'Inter Regular',
    color: Colors.black,
    textAlign: 'center',
  },
  ShareFavoriteIconContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  BusinessInfoContainer: {
    width: wp(100),
    paddingHorizontal: wp(4),
    paddingVertical: wp(2),
    gap: 5,
  },
  DescText: {
    fontSize: wp(5),
    fontFamily: 'Inter Medium',
    color: Colors.black,
  },
  BusinessDescription: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  BusinessDescriptionText: {
    paddingLeft: 5,
    textAlign: 'left',
    fontSize: wp(4.3),
    fontFamily: 'Inter Regular',
    color: Colors.black,
  },
  BusinessContactContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: wp(100),
    paddingHorizontal: wp(4),
    paddingVertical: wp(2),
  },
  ContactTitleText: {
    fontSize: wp(5),
    fontFamily: 'Inter Medium',
    color: Colors.black,
  },
  ContactDetails: {
    paddingVertical: wp(1),
  },
  ContactText: {
    fontSize: wp(4.5),
    fontFamily: 'Inter Regular',
    color: Colors.black,
  },
  CenteredView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  LargeText: {
    color: Colors.green,
    fontSize: wp(10),
  },
  SocialContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 3,
  },
  HeaderContainer: {
    paddingVertical: 10,
    width: wp(100),
    paddingHorizontal: wp(4),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  HeaderText: {
    fontSize: wp(5),
    color: Colors.green,
    fontFamily: 'Inter Medium',
  },
  EditContainer: {
    flexDirection: 'row',
    gap: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  EditText: {
    fontFamily: 'Inter Regular',
    fontSize: wp(3.5),
    color: Colors.orange,
  },
  ThirdRouteContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.darkGray,
    paddingVertical: 10,
    // backgroundColor: Colors.green,
    gap: 7,
  },
  AnimatedView: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 5,
    borderRadius: wp(4),
  },
  TAB_WIDTH: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  slidingTab: {
    width: wp(24),
    height: wp(10),
    borderRadius: wp(2),
    backgroundColor: Colors.green,
  },
  TopTabBarText: {
    fontSize: wp(4.7),
    fontFamily: 'Inter Medium',
  },
});
