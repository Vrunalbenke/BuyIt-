import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BottomSheet from '@gorhom/bottom-sheet';

import {FlashList} from '@shopify/flash-list';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Colors} from '../../resources/colors';

type FlashListBottomSheetProps<T> = {
  bottomSheetRef: React.Ref<BottomSheet>;
  data: T[] | undefined;
  keyExtractor: ((item: T, index: number) => string) | undefined;
};
const FlashListBottomSheet = <T,>({
  bottomSheetRef,
  data,
  keyExtractor,
}: FlashListBottomSheetProps<T>) => {
  const snapPoints = ['25%', '50%', '75%', '100%'];
  const handleRendering = ({item}) => {
    console.log(item);
    return (
      <View key={item.id} style={styles.BusinessTypeContainer}>
        <Image
          source={{uri: `http://${item?.business_icon}`}}
          style={styles.BusinessIcon}
          resizeMode="contain"
        />
        <Text style={styles.NameText}>{item?.name}</Text>
      </View>
    );
  };
  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose
      style={styles.BottomSheet}>
      <View style={styles.root}>
        {data ? (
          <FlashList
            data={data}
            keyExtractor={keyExtractor}
            renderItem={handleRendering}
            contentContainerStyle={styles.FlastListContentStyle}
            estimatedItemSize={50}
            ItemSeparatorComponent={() => <View style={styles.Separator} />}
            bounces={false}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <ActivityIndicator size={'small'} />
        )}
      </View>
    </BottomSheet>
  );
};

export default FlashListBottomSheet;

const styles = StyleSheet.create({
  BottomSheet: {
    borderTopLeftRadius: 20,
  },
  root: {
    flex: 1,
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
});
