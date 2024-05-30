import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';

import {FlashList} from '@shopify/flash-list';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors} from '../../resources/colors';
import SearchbarInput from '../SearchbarInput';
import FastImage from 'react-native-fast-image';
import {businessTypesObject} from '../../screens/NativeStack/nativeTypes';

type FlashListBottomSheetProps = {
  bottomSheetRef: React.Ref<BottomSheet>;
  data: object[] | undefined;
  keyExtractor: ((item: any, index: number) => string) | undefined;
  handleSetBusinessType: (item: businessTypesObject) => void;
};
const FlashListBottomSheet = memo(
  ({
    bottomSheetRef,
    data,
    keyExtractor,
    // setValue,
    handleSetBusinessType,
  }: FlashListBottomSheetProps) => {
    const snapPoints = ['50%', '75%', '100%'];
    const [searchString, setSearchString] = useState<string>('');
    const [filterBusinessTypes, setFilterBusinessTypes] = useState(data);
    console.log('Rendering');
    useEffect(() => {
      setFilterBusinessTypes(data);
    }, [data]);

    useEffect(() => {
      if (searchString === '') {
        setFilterBusinessTypes(data);
      } else if (data) {
        const filteredData = data?.filter(item => {
          return item?.name
            ?.toLowerCase()
            ?.includes(searchString.toLowerCase());
        });
        setFilterBusinessTypes(filteredData);
      }
    }, [searchString]);

    const handleRendering = ({item}: businessTypesObject) => {
      return (
        <Pressable onPress={() => handleSetBusinessType(item)}>
          <View key={item.id} style={styles.BusinessTypeContainer}>
            {item?.business_icon && (
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
            )}
            <Text style={styles.NameText}>{item?.name}</Text>
          </View>
        </Pressable>
      );
    };
    return (
      <BottomSheet
        index={-1}
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose
        style={styles.BottomSheet}>
        <View style={styles.root}>
          <SearchbarInput
            value={searchString}
            setValue={setSearchString}
            placeholder={'Search'}
          />
          {data ? (
            <FlashList
              data={filterBusinessTypes}
              keyExtractor={keyExtractor}
              renderItem={handleRendering}
              contentContainerStyle={styles.FlastListContentStyle}
              estimatedItemSize={50}
              ItemSeparatorComponent={() => <View style={styles.Separator} />}
              bounces={false}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <ActivityIndicator
              size={'small'}
              style={styles.ActivityIndicator}
            />
          )}
        </View>
      </BottomSheet>
    );
  },
);

export default FlashListBottomSheet;

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
    paddingHorizontal: 20,
  },
  BusinessTypeContainer: {
    flexDirection: 'row',
    gap: wp(5),
    alignItems: 'center',
    paddingVertical: 5,
  },
  BusinessIcon: {
    width: wp(10),
    height: wp(10),
  },
  NameText: {
    fontSize: wp(4),
    fontFamily: 'Inter Medium',
    color: Colors.black,
  },
  Separator: {
    height: wp(0.1),
    borderWidth: wp(0.1),
  },
  ActivityIndicator: {
    marginVertical: 10,
  },
});
