import React, {useContext} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import {View, Text, Pressable} from 'react-native';
import {FlashList, ListRenderItem} from '@shopify/flash-list';
import {ActivityIndicator} from 'react-native';
import {SearchBusinessResponse} from '../../services/Business/businessTypes';
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import {Colors} from '../../resources/colors';
import {ThemeContext, themes} from '../../resources/themes';

type BusinesssListBottomSheetProps = {
  bottomSheetRef: React.RefObject<BottomSheet | null>;
  busniessDetailRef: React.RefObject<BottomSheet | null>;
  setBusinessDetail: React.Dispatch<React.SetStateAction<any>>;
};

const BusinessListBottomSheet = ({
  bottomSheetRef,
  busniessDetailRef,
  setBusinessDetail,
}: BusinesssListBottomSheetProps) => {
  const scheme = useContext(ThemeContext);
  const snapPoints = ['50%', '75%', '100%'];
  const {searchBusinessList} = useSelector(state => state?.business);
  console.log('searchBusinessList', searchBusinessList);

  const handleBusiness = item => {
    console.log(item);
    setBusinessDetail(item);
    // bottomSheetRef.current?.close();
    busniessDetailRef.current?.snapToIndex(1);
  };

  const handleRendering: ListRenderItem<SearchBusinessResponse> = ({
    item,
    index,
  }) => {
    // console.log(item);
    return (
      <Pressable key={index} onPress={() => handleBusiness(item)}>
        <View style={styles.ItemContainer}>
          <View style={styles.LeftContainer}>
            <Text style={styles.BusinessNameText}>{item.name}</Text>
            <Text
              style={[
                styles.BusinessMilesText,
                {color: scheme === 'dark' ? Colors.darkLightGray : Colors.gray},
              ]}>
              {item.distance} miles away
            </Text>
          </View>
          <View
            style={[
              styles.RightContainer,
              {justifyContent: item.in_home ? 'space-between' : 'flex-end'},
            ]}>
            {item.in_home && (
              <Text style={styles.BusinessInHomeText}>In-Home</Text>
            )}
            <Text
              style={[
                styles.BusinessOpenCloseText,
                {
                  color: item.isopen ? Colors.green : Colors.errorRed,
                },
              ]}>
              {item.isopen ? 'Open' : 'Closed'}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <BottomSheet
      index={0}
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      // enablePanDownToClose
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
      }}
      style={[styles.BottomSheet]}>
      <View style={styles.root}>
        {searchBusinessList ? (
          <FlashList
            data={searchBusinessList}
            keyExtractor={item => item.id.toString()}
            renderItem={handleRendering}
            contentContainerStyle={styles.FlastListContentStyle}
            estimatedItemSize={50}
            ItemSeparatorComponent={() => (
              <View
                style={[
                  styles.Separator,
                  {
                    borderColor:
                      scheme === 'dark' ? Colors.darkLightGray : Colors.gray,
                  },
                ]}
              />
            )}
            bounces={false}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <ActivityIndicator size={'small'} style={styles.ActivityIndicator} />
        )}
      </View>
    </BottomSheet>
  );
};

export default BusinessListBottomSheet;

const styles = StyleSheet.create({
  BottomSheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  root: {
    height: hp(86),
    // flex: 1,
    gap: 10,
  },
  FlastListContentStyle: {
    paddingVertical: 20,
  },
  Separator: {
    // height: wp(0.1),
    borderBottomWidth: wp(0.2),
  },
  ActivityIndicator: {
    marginVertical: 10,
  },
  ItemContainer: {
    width: wp(100),
    paddingHorizontal: wp(4),
    paddingVertical: wp(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // height: wp(12),
  },
  LeftContainer: {
    flex: 3,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    // gap: 10,
    height: wp(12),
  },
  BusinessNameText: {
    fontFamily: 'Inter Medium',
    fontSize: wp(6),
    color: Colors.green,
  },
  BusinessMilesText: {
    fontFamily: 'Inter Regular',
    fontSize: wp(4),
  },
  RightContainer: {
    flex: 1,
    alignItems: 'flex-end',
    height: wp(12),
  },
  BusinessInHomeText: {
    fontFamily: 'Inter Medium',
    fontSize: wp(4),
    color: Colors.orange,
  },
  BusinessOpenCloseText: {
    fontFamily: 'Inter Regular',
    fontSize: wp(4),
  },
});
