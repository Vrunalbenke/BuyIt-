import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import React, {useContext, useEffect, useState} from 'react';
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
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {ThemeContext, themes} from '../../resources/themes';
import RatingStar from '../../components/RatingStars';
import WriteAReview from '../../components/WriteAReview';
import ReviewCard from '../../components/ReviewCard';
const FirstRoute = ({business}) => {
  const scheme = useContext(ThemeContext);
  const handleFavorite = () => {};
  console.log(business, '<><><>');
  return (
    <View style={styles.TabBarRoot}>
      <BottomSheetScrollView>
        <View style={styles.BusinessFirstContainer}>
          <View style={styles.BusinessTitleContainer}>
            <Text
              style={[
                styles.NameText,
                {color: scheme === 'dark' ? Colors.white : Colors.black},
              ]}>
              {business?.name}
            </Text>
            <Text
              style={[
                styles.AliasText,
                {color: scheme === 'dark' ? Colors.white : Colors.black},
              ]}>
              {business?.alias}
            </Text>
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
            <Text
              style={[
                styles.DescText,
                {color: scheme === 'dark' ? Colors.white : Colors.black},
              ]}>
              Description
            </Text>
            <View style={styles.BusinessDescription}>
              <Text
                style={[
                  styles.BusinessDescriptionText,
                  {color: scheme === 'dark' ? Colors.white : Colors.black},
                ]}>
                {business?.description}
              </Text>
            </View>
          </View>
        )}
        {(business?.share_email === 'True' ||
          business?.share_phone === 'True') && (
          <View style={styles.BusinessContactContainer}>
            <Text
              style={[
                styles.DescText,
                {color: scheme === 'dark' ? Colors.white : Colors.black},
              ]}>
              Contacts
            </Text>
            <View>
              {business?.share_phone === 'True' && (
                <Text
                  style={[
                    styles.BusinessDescriptionText,
                    {color: scheme === 'dark' ? Colors.white : Colors.black},
                  ]}>
                  {business?.country_code}-{business?.phone_number}
                </Text>
              )}
              {business?.share_email === 'True' && (
                <Text
                  style={[
                    styles.BusinessDescriptionText,
                    {color: scheme === 'dark' ? Colors.white : Colors.black},
                  ]}>
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
            <Text
              style={[
                styles.DescText,
                ,
                {color: scheme === 'dark' ? Colors.white : Colors.black},
              ]}>
              Socials
            </Text>
            {business?.instagram !== 'None' && (
              <View
                style={[
                  styles.SocialContainer,
                  {color: scheme === 'dark' ? Colors.white : Colors.black},
                ]}>
                <Ionicons
                  name="logo-instagram"
                  size={wp(7)}
                  color={Colors.black}
                />
                <Text
                  style={[
                    styles.BusinessDescriptionText,
                    {color: scheme === 'dark' ? Colors.white : Colors.black},
                  ]}>
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
                <Text
                  style={[
                    styles.BusinessDescriptionText,
                    {color: scheme === 'dark' ? Colors.white : Colors.black},
                  ]}>
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
                <Text
                  style={[
                    styles.BusinessDescriptionText,
                    {color: scheme === 'dark' ? Colors.white : Colors.black},
                  ]}>
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
    <View style={styles.SecondRouteContainer}>
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
const ThirdRoute = ({business}) => {
  const scheme = useContext(ThemeContext);
  const [star, setStar] = useState(0);
  console.log(business, '🤖🤖🤖🤖🤖🤖🤖');
  const data = [
    {
      id: 1,
      name: 'John Doe',
      stars: 4,
      comment:
        'Great service and friendly staff! The product quality exceeded my expectations.',
      date: '2024-07-21',
    },
    {
      id: 2,
      name: 'Jane Smith',
      stars: 5,
      comment:
        'Excellent experience, highly recommend! The support team was very helpful.',
      date: '2024-07-20',
    },
    {
      id: 3,
      name: 'Michael Johnson',
      stars: 3,
      comment: 'Good service but the delivery was a bit slow.',
      date: '2024-07-19',
    },
    {
      id: 4,
      name: 'Emily Davis',
      stars: 5,
      comment: 'Absolutely loved it! Will definitely come back.',
      date: '2024-07-18',
    },
    {
      id: 5,
      name: 'David Wilson',
      stars: 2,
      comment: 'Not satisfied with the product quality.',
      date: '2024-07-17',
    },
    {
      id: 6,
      name: 'Sarah Miller',
      stars: 4,
      comment: 'Very good overall, but there is room for improvement.',
      date: '2024-07-16',
    },
    {
      id: 7,
      name: 'Robert Brown',
      stars: 5,
      comment: 'Fantastic! Everything was perfect.',
      date: '2024-07-15',
    },
    {
      id: 8,
      name: 'Jessica Williams',
      stars: 3,
      comment: 'Average experience, could be better.',
      date: '2024-07-14',
    },
    {
      id: 9,
      name: 'Daniel Jones',
      stars: 4,
      comment: 'Good value for the price. Satisfied with the purchase.',
      date: '2024-07-13',
    },
    {
      id: 10,
      name: 'Laura Garcia',
      stars: 5,
      comment: 'Loved it! Highly recommend this service.',
      date: '2024-07-12',
    },
  ];

  return (
    <View style={styles.ThirdRouteContainer}>
      <View style={styles.TopContainer}>
        <View style={styles.RatingContainer}>
          <Text
            style={[
              styles.AverageRatingText,
              {color: scheme === 'dark' ? Colors.white : Colors.black},
            ]}>
            4.9
          </Text>
          <Text
            style={[
              styles.TotalRatingText,
              {color: scheme === 'dark' ? Colors.white : Colors.black},
            ]}>
            OUT OF 5
          </Text>
        </View>
        <View style={styles.StarContainer}>
          <RatingStar
            averageRating={4.9}
            setStar={setStar}
            isRating={false}
            sizeMutliple={1}
          />
          <Text
            style={[
              styles.TotalRatingText,
              {color: scheme === 'dark' ? Colors.white : Colors.black},
            ]}>
            165 ratings
          </Text>
        </View>
      </View>
      <View style={styles.ReviewContainer}>
        <Text
          style={[
            styles.WriteAReviewText,
            {color: scheme === 'dark' ? Colors.white : Colors.black},
          ]}>
          Write a Review
        </Text>
        <WriteAReview businessID={business?.id} />
      </View>
      <View style={styles.ReviewFlashList}>
        <Text
          style={[
            styles.ReviewTitleText,
            {color: scheme === 'dark' ? Colors.white : Colors.black},
          ]}>
          10 Reviews
        </Text>
        <BottomSheetScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}>
          <View>
            {data.map((review, index) => (
              <ReviewCard key={index} item={review} />
            ))}
          </View>
        </BottomSheetScrollView>
      </View>
    </View>
  );
};

const renderScene = (business, ProductData, PIData) =>
  SceneMap({
    first: () => {
      return <FirstRoute business={business} />;
    },
    second: () => (
      <SecondRoute
        business={business}
        ProductData={ProductData}
        PIData={PIData}
      />
    ),
    third: () => <ThirdRoute business={business} />,
  });

type BusinessDetailBottomSheetProps = {
  bottomSheetRef: React.Ref<BottomSheet>;
  business: SearchBusinessResponse;
};
const BusinessDetailBottomSheet = ({
  bottomSheetRef,
  business,
}: BusinessDetailBottomSheetProps) => {
  const scheme = useContext(ThemeContext);
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
      <View
        style={[
          styles.tabBar,
          {
            borderBottomColor:
              scheme === 'dark' ? Colors.darkLightGray : Colors.darkGray,
          },
        ]}>
        <View style={styles.BackIconContainer}>
          <Pressable onPress={() => bottomSheetRef?.current.close()}>
            <Ionicons
              name="arrow-back-outline"
              size={wp(7)}
              color={scheme === 'dark' ? Colors.white : Colors.black}
            />
          </Pressable>
        </View>
        <View style={styles.tabBarRoutesContainer}>
          <Animated.View
            style={[styles.AnimatedView, {width: TAB_WIDTH}, AnimatedStyle]}>
            <View style={styles.slidingTab} />
          </Animated.View>
          {props.navigationState.routes.map((route, i) => {
            return (
              <Pressable
                key={i}
                style={[styles.tabItem]}
                onPress={() => setIndex(i)}>
                <Animated.Text
                  style={[
                    styles.TopTabBarText,
                    {
                      color:
                        index !== i
                          ? Colors.green
                          : scheme === 'dark'
                          ? Colors.black
                          : Colors.white,
                    },
                  ]}>
                  {route.title}
                </Animated.Text>
              </Pressable>
            );
          })}
        </View>
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
      overDragResistanceFactor={1}
      backgroundStyle={{
        backgroundColor:
          scheme === 'dark'
            ? themes.dark.backgroundColor
            : themes.light.backgroundColor,
      }}
      handleIndicatorStyle={{
        width: wp(20),
        height: wp(1.3),
        backgroundColor: themes[scheme].primaryTextColor,
      }}>
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
    gap: 10,
  },
  BusinessTitleContainer: {
    gap: 5,
  },
  NameText: {
    fontSize: wp(6),
    fontFamily: 'Inter Medium',
    textAlign: 'center',
  },
  AliasText: {
    fontSize: wp(4),
    fontFamily: 'Inter Regular',
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
  },
  ContactDetails: {
    paddingVertical: wp(1),
  },
  ContactText: {
    fontSize: wp(4.5),
    fontFamily: 'Inter Regular',
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
  SecondRouteContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
    flex: 1,
  },
  TopContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: wp(100),
    paddingHorizontal: wp(4),
    paddingVertical: wp(1),
  },
  RatingContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 5,
  },
  AverageRatingText: {
    fontSize: wp(9.5),
    fontFamily: 'Inter Bold',
  },
  TotalRatingText: {
    fontSize: wp(3.5),
    fontFamily: 'Inter Medium',
  },
  StarContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: 5,
  },
  ReviewContainer: {
    width: wp(100),
    paddingHorizontal: wp(4),
    paddingVertical: wp(2),
    gap: 10,
  },
  WriteAReviewText: {
    fontSize: wp(4.5),
    fontFamily: 'Inter Medium',
  },
  ReviewFlashList: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'column',
  },
  BackIconContainer: {
    paddingLeft: 10,
  },
  tabBarRoutesContainer: {
    flexDirection: 'row',
    paddingVertical: 5,
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
  ReviewTitleText: {
    fontSize: wp(5),
    fontFamily: 'Inter Medium',
    paddingHorizontal: wp(4),
  },
});
