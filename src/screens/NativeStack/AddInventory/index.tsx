import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../navigation/StackNavigator';
import ScrollableWrapper from '../../../components/ScrollableWrapper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../../resources/colors';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useForm} from 'react-hook-form';
import PressableInput from '../../../components/PressableInput';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import UserTextInput from '../../../components/UserTextInput';
import {useGetDefaultItemsMutation} from '../../../services/Business';
import LargeButton from '../../../components/LargeButton';
import FlashListBottomSheet from '../../../components/FlashListBottomSheet';
import {z} from 'zod';
import {AddItemSchema} from '../nativeTypes';
import {zodResolver} from '@hookform/resolvers/zod';

type ItemType = {
  id: number;
  name: string;
  business_icon: string;
};

type AddInventoryFields = z.infer<typeof AddItemSchema>;

const AddInventory = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParams, 'AddInventory'>) => {
  const {control, handleSubmit, setValue, watch} = useForm<AddInventoryFields>({
    resolver: zodResolver(AddItemSchema),
  });
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [itemData, setItemData] = useState<ItemType[]>();
  const [
    getDefaultItems,
    {
      data: getDefaultItemsData,
      isSuccess: getDefaultItemsIsSuccess,
      isLoading: getDefaultItemsIsLoading,
      isError: getDefaultItemsIsError,
      error: getDefaultItemsError,
    },
  ] = useGetDefaultItemsMutation();

  console.log('itemData --> ', itemData);

  useEffect(() => {
    if (route.params?.from_business || true) {
      const body = {
        business_type: 'Tutor',
        business_id: '2',
        // business_type: route.params?.business_type,
        // business_id: route.params?.id,
      };
      getDefaultItems(body);
    }
  }, []);

  useEffect(() => {
    console.log('getDefaultItemsError --> ', getDefaultItemsError);
  }, [getDefaultItemsError, getDefaultItemsIsError]);
  const url = watch('url');

  useEffect(() => {
    if (getDefaultItemsIsSuccess) {
      const fruitImageArray: ItemType[] = Object.entries(
        getDefaultItemsData,
      ).map(([name, business_icon], index) => ({
        id: index + 1,
        name: name,
        business_icon: business_icon,
      }));
      setItemData(fruitImageArray);
    }
  }, [getDefaultItemsIsSuccess, getDefaultItemsData]);

  const handleBackPress = () => {};
  const handleAddItem = () => {};
  const handleSetItem = (item: ItemType) => {
    setValue('name', item.name);
    setValue('url', item.business_icon);
    bottomSheetRef.current?.close();
  };
  const handleBottomSheet = () => {
    bottomSheetRef.current?.snapToIndex(0);
    if (itemData) {
      bottomSheetRef.current?.snapToIndex(0);
    }
  };

  return (
    <ScrollableWrapper contentContainerStyle={styles.ScrollableWrapper}>
      <View style={styles.root}>
        <View style={styles.BackIconContainer}>
          <TouchableOpacity onPress={handleBackPress}>
            <Ionicons
              name={'chevron-back-outline'}
              size={wp(8)}
              color={Colors.lightGreen}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.TitleContainer}>
          <Text style={styles.TitleText}>Add Products</Text>
          <Text style={styles.SubTitleText}>
            Add products to let customers know what you have in stock
          </Text>
        </View>
        <View style={styles.InputContainer}>
          <PressableInput
            control={control}
            name={'name'}
            label="Item name"
            disabled={false}
            onPress={handleBottomSheet}
            url={url}
            placeholder="Select a item"
          />
          <UserTextInput
            control={control}
            name={'description'}
            label="Description"
            placeholder={'description'}
            disabled={false}
            size={wp(7)}
            inputMode={'text'}
            Optional={false}
            multiline={true}
          />
          <PressableInput
            control={control}
            name={'unit'}
            label="Unit"
            disabled={false}
            onPress={handleBottomSheet}
            // url={url}
            placeholder={'unit'}
          />
          <UserTextInput
            control={control}
            name={'price'}
            label="Price"
            placeholder={'price'}
            disabled={false}
            size={wp(7)}
            inputMode={'text'}
            Optional={false}
          />
          <UserTextInput
            control={control}
            name={'quantity'}
            label="Quantity"
            placeholder={'quantity'}
            disabled={false}
            size={wp(7)}
            inputMode={'text'}
            Optional={true}
          />
        </View>
        <View style={styles.ButtonContainer}>
          <TouchableOpacity
            onPress={handleSubmit(handleAddItem)}
            style={styles.TOPContainer}>
            <Text style={styles.BTNText}>+ Add </Text>
          </TouchableOpacity>
          <LargeButton
            BTNText="Next"
            onPress={() => {
              console.log('');
            }}
            isDisable={false}
            loader={true}
          />
        </View>
      </View>
      <FlashListBottomSheet
        bottomSheetRef={bottomSheetRef}
        data={itemData}
        keyExtractor={item => item?.id?.toString()}
        handleSetBusinessType={handleSetItem}
      />
    </ScrollableWrapper>
  );
};

export default AddInventory;

const styles = StyleSheet.create({
  ScrollableWrapper: {
    backgroundColor: '#FFF',
  },
  root: {
    flex: 1,
    gap: 10,
  },
  BackIconContainer: {
    width: wp(100),
    paddingHorizontal: wp(4),
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  TitleContainer: {
    alignItems: 'center',
    paddingHorizontal: wp(4),
    gap: 15,
  },
  TitleText: {
    fontSize: wp(6),
    fontFamily: 'Inter Medium',
    color: Colors.green,
  },
  SubTitleText: {
    fontSize: wp(4),
    fontFamily: 'Inter Regular',
    textAlign: 'center',
  },
  InputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  ButtonContainer: {
    paddingHorizontal: wp(4),
    alignItems: 'flex-start',
    gap: 10,
  },
  TOPContainer: {
    padding: wp(2.5),
    backgroundColor: Colors.orange,
    borderRadius: 5,
  },
  BTNText: {
    fontSize: wp(4),
    fontFamily: 'Inter Regular',
  },
});
