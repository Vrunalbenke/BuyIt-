import React from 'react';
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
  const snapPoints = ['50%', '75%', '100%'];
  const {searchBusinessList} = useSelector(state => state?.business);
  console.log('searchBusinessList', searchBusinessList);

  const handleBusiness = item => {
    console.log(item);
    setBusinessDetail(item);
    bottomSheetRef.current?.close();
    busniessDetailRef.current?.snapToIndex(1);
  };

  const handleRendering: ListRenderItem<SearchBusinessResponse> = ({item}) => {
    // console.log(item);
    return (
      <Pressable onPress={() => handleBusiness(item)}>
        <View style={styles.ItemContainer}>
          <View style={styles.LeftContainer}>
            <Text style={styles.BusinessNameText}>{item.name}</Text>
            <Text style={styles.BusinessMilesText}>
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
      style={styles.BottomSheet}>
      <View style={styles.root}>
        {searchBusinessList ? (
          <FlashList
            data={searchBusinessList}
            keyExtractor={item => item.id.toString()}
            renderItem={handleRendering}
            contentContainerStyle={styles.FlastListContentStyle}
            estimatedItemSize={50}
            // ItemSeparatorComponent={() => <View style={styles.Separator} />}
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
    // backgroundColor: '#000',
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
    height: wp(0.1),
    borderWidth: wp(0.1),
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
    color: Colors.gray,
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
