import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import {zodResolver} from '@hookform/resolvers/zod';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Toast from 'react-native-toast-message';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {z} from 'zod';
import FlashListBottomSheet from '../../../components/FlashListBottomSheet';
import LargeButton from '../../../components/LargeButton';
import PressableInput from '../../../components/PressableInput';
import ScrollableWrapper from '../../../components/ScrollableWrapper';
import UserTextInput from '../../../components/UserTextInput';
import {RootStackParams} from '../../../navigation/StackNavigator';
import {Colors} from '../../../resources/colors';
import {
  useAddItemsMutation,
  useDeleteItemMutation,
  useGetDefaultItemsMutation,
  useGetUnitsMutation,
  useUpdateItemMutation,
} from '../../../services/Business';
import {AddItemSchema} from '../nativeTypes';

type ItemType = {
  id: number;
  name: string;
  business_icon?: string;
};

type AddItemDataType = {
  business_id: number;
  business_type: string;
  description: string;
  id: number;
  name: string;
  price: number;
  quantity: number;
  unit?: string;
};

type AddInventoryFields = z.infer<typeof AddItemSchema>;

const AddInventory = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParams, 'AddInventory'>) => {
  const {control, handleSubmit, setValue, watch, reset} =
    useForm<AddInventoryFields>({
      resolver: zodResolver(AddItemSchema),
      defaultValues: {
        business_id: '7',
      },
    });
  const itemBottomSheetRef = useRef<BottomSheet>(null);
  const unitBottomSheetRef = useRef<BottomSheet>(null);
  const [itemData, setItemData] = useState<ItemType[]>();
  const [unitData, setUnitData] = useState<ItemType[]>();
  const [recentlyAdded, setRecentlyAdded] = useState<AddItemDataType[]>([]);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [updateData, setUpdateData] = useState<AddItemDataType>();
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

  const [
    getUnits,
    {
      data: getUnitsData,
      isSuccess: getUnitsIsSuccess,
      isLoading: getUnitsIsLoading,
      isError: getUnitsIsError,
      error: getUnitsError,
    },
  ] = useGetUnitsMutation();

  const [
    addItem,
    {
      data: AddItemData,
      isSuccess: AddItemIsSuccess,
      isError: AddItemIsError,
      error: AddItemError,
      isLoading: AddItemIsLoading,
    },
  ] = useAddItemsMutation();

  const [
    updateItem,
    {
      data: UpdateItemData,
      isSuccess: UpdateItemIsSuccess,
      isError: UpdateItemIsError,
      error: UpdateItemError,
    },
  ] = useUpdateItemMutation();
  const [
    deleteItem,
    {
      data: DeleteItemData,
      isSuccess: DeleteItemIsSuccess,
      isError: DeleteItemIsError,
      error: DeleteItemError,
    },
  ] = useDeleteItemMutation();

  useEffect(() => {
    if (route.params?.from_business || true) {
      const body = {
        business_type: 'MexicanFoodTruck',
        business_id: '7',
        // business_type: route.params?.business_type,
        // business_id: route.params?.id,
      };
      getDefaultItems(body);
      getUnits(body);
    }
  }, []);
  useEffect(() => {
    console.log('DeleteItemData --> ', DeleteItemData);
    if (DeleteItemIsSuccess) {
      setRecentlyAdded(
        recentlyAdded.filter(item => {
          item.id !== 7;
        }),
      );
    }
  }, [DeleteItemData, DeleteItemIsSuccess]);

  const url = watch('url');

  useEffect(() => {
    if (getDefaultItemsIsSuccess) {
      const itemArray: ItemType[] = Object.entries(getDefaultItemsData).map(
        ([name, business_icon], index) => ({
          id: index + 1,
          name: name,
          business_icon: business_icon,
        }),
      );
      setItemData(itemArray);
    }
  }, [getDefaultItemsIsSuccess, getDefaultItemsData]);

  useEffect(() => {
    if (getUnitsIsSuccess) {
      const unitArray: ItemType[] = getUnitsData.map((element, index) => ({
        id: index + 1,
        name: element,
      }));
      setUnitData(unitArray);
      if (getUnitsData.length > 0) {
        setValue('isUnit', true);
      }
    }
  }, [getUnitsIsSuccess, getUnitsData]);

  useEffect(() => {
    if (AddItemIsSuccess) {
      reset();
      setValue('business_id', '7');
      Toast.show({
        type: 'success',
        text1: route.params?.is_service
          ? 'Service Added Successfully.'
          : 'Product Added Successfully.',
        position: 'bottom',
      });
      const ItemAddedArray = [...recentlyAdded];
      ItemAddedArray.push(AddItemData?.data);
      console.log(AddItemData.data);
      console.log(ItemAddedArray);
      setRecentlyAdded([...ItemAddedArray]);
    }
    console.log(recentlyAdded);
    if (AddItemIsError) {
      console.log('AddItemError --> ', AddItemError);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
        position: 'bottom',
      });
    }
  }, [AddItemIsError, AddItemIsSuccess, AddItemData, AddItemError]);

  useEffect(() => {
    console.log(UpdateItemError, 'UpdateItemIsError', UpdateItemIsError);
    if (UpdateItemIsSuccess) {
      Toast.show({
        type: 'success',
        text1: 'Item Updated',
        position: 'bottom',
      });
      let updatedArray = recentlyAdded.map(item => {
        if (item.id === updateData.id) {
          return updateItem;
        }
        return item;
      });
      console.log('updatedArray --> ', updatedArray);
      // setRecentlyAdded([...updatedArray]);
    }
  }, [UpdateItemData, UpdateItemIsSuccess, UpdateItemIsError]);

  const handleBackPress = () => {
    navigation.goBack();
  };
  const handleAddItem = (data: AddInventoryFields) => {
    const {url, isUnit, ...rest} = data;
    rest.unit = isUnit ? rest?.unit : '';
    if (isUpdating) {
      rest.business_type = 'MexicanFoodTruck';
      rest.business_name = 'nicholas truck';
      rest.id = 8;
      rest.business_id = Number(rest.business_id);
      console.log('Updating rest', rest);
      setUpdateData(rest);
      updateItem(rest);
    } else {
      addItem(rest);
    }
  };

  const handleNext = () => {
    if (!route.params.from_business) {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'BottomTabNavigator',
            // params: {
            //   isBusinessUser: false,
            // },
          },
        ],
      });
    }
  };
  const handleSetItem = (item: ItemType) => {
    setValue('name', item.name);
    setValue('url', item.business_icon);
    itemBottomSheetRef.current?.close();
  };

  const handleSetUnit = (item: ItemType) => {
    setValue('unit', item.name);
    unitBottomSheetRef.current?.close();
  };

  const handleItemBottomSheet = () => {
    if (itemData) {
      if (itemData?.length < 5 && itemData?.length > 0) {
        itemBottomSheetRef.current?.snapToIndex(0);
      } else if (itemData?.length < 8 && itemData?.length > 0) {
        itemBottomSheetRef.current?.snapToIndex(1);
      } else {
        itemBottomSheetRef.current?.snapToIndex(2);
      }
    } else {
      itemBottomSheetRef.current?.snapToIndex(0);
    }
  };
  const handleUnitBottomSheet = () => {
    if (unitData) {
      if (unitData?.length < 5 && unitData?.length > 0) {
        unitBottomSheetRef.current?.snapToIndex(0);
      } else if (unitData?.length < 8 && unitData?.length > 0) {
        unitBottomSheetRef.current?.snapToIndex(1);
      } else {
        unitBottomSheetRef.current?.snapToIndex(2);
      }
    } else {
      unitBottomSheetRef.current?.snapToIndex(0);
    }
  };

  const handleEditItem = item => {
    setIsUpdating(true);
    console.log(item);
    if (getDefaultItemsData && getUnitsData) {
      for (const key in item) {
        setValue(key, item[key].toString());
        setValue('url', getDefaultItemsData[item.name]);
        if (getUnitsData?.length > 0) {
          setValue('isUnit', true);
        }
      }
    }
  };
  const handleDeleteItem = item => {
    const body = {
      business_id: 7,
      item_id: item.id,
    };
    console.log(body);
    deleteItem(body);
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
            onPress={handleItemBottomSheet}
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
            onPress={handleUnitBottomSheet}
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
            style={[
              styles.TOPContainer,
              {
                backgroundColor: AddItemIsLoading ? Colors.gray : Colors.orange,
              },
            ]}>
            {AddItemIsLoading ? (
              <ActivityIndicator size={'small'} color={Colors.darkGray} />
            ) : (
              <Text style={styles.BTNText}>
                {isUpdating ? 'Update' : '+ Add'}
              </Text>
            )}
          </TouchableOpacity>
          <LargeButton
            BTNText="Next"
            onPress={handleNext}
            isDisable={false}
            loader={true}
          />
        </View>
        {recentlyAdded && getDefaultItemsData && (
          <>
            <Text style={styles.RecentlyAddedText}>Recently Added</Text>
            <View style={styles.RecentlyAddedContainer}>
              {recentlyAdded.map((item, index) => {
                return (
                  <View key={index} style={styles.RecentlyAddedItemContainer}>
                    <FastImage
                      style={styles.ItemImage}
                      source={{
                        uri: `http://${getDefaultItemsData[item?.name]}`,
                        headers: {Authorization: 'someAuthToken'},
                        priority: FastImage.priority.normal,
                        cache: FastImage.cacheControl.immutable,
                      }}
                      resizeMode={FastImage.resizeMode.cover}
                    />
                    <View style={styles.RecentlyAddedItemRightContainer}>
                      <View style={styles.ItemInfoContainer}>
                        <View style={styles.ItemNameAndIconContainer}>
                          <Text style={styles.ItemNameText}>{item?.name}</Text>
                          <View style={styles.IconContainer}>
                            <TouchableOpacity
                              onPress={() => handleEditItem(item)}>
                              <Ionicons
                                name="create-outline"
                                size={wp(5.5)}
                                color={Colors.orange}
                              />
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={() => handleDeleteItem(item)}>
                              <Ionicons
                                name="trash-outline"
                                size={wp(5.5)}
                                color={Colors.errorRed}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                        <Text style={styles.ItemDescText}>
                          {item?.description}
                        </Text>
                      </View>
                      <View style={styles.ItemUnitContainer}>
                        <Text style={styles.ItemPriceText}>${item?.price}</Text>
                        <Text style={styles.ItemUnitText}>/{item?.unit}</Text>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          </>
        )}
      </View>
      <FlashListBottomSheet
        bottomSheetRef={itemBottomSheetRef}
        data={itemData}
        keyExtractor={item => item?.id?.toString()}
        handleSetBusinessType={handleSetItem}
      />
      <FlashListBottomSheet
        bottomSheetRef={unitBottomSheetRef}
        data={unitData}
        keyExtractor={item => item?.id?.toString()}
        handleSetBusinessType={handleSetUnit}
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
    borderRadius: 5,
  },
  BTNText: {
    fontSize: wp(4),
    fontFamily: 'Inter Regular',
  },
  RecentlyAddedText: {
    paddingHorizontal: wp(4),
    fontFamily: 'Inter Medium',
    fontSize: wp(5),
  },
  RecentlyAddedContainer: {
    width: wp(100),
    paddingHorizontal: wp(4),
    gap: 20,
  },
  RecentlyAddedItemContainer: {
    borderWidth: 0.5,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: wp(92),
  },
  ItemImage: {
    width: wp(25),
    height: '100%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  RecentlyAddedItemRightContainer: {
    width: wp(67),
    padding: wp(2),
    gap: 5,
  },

  IconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  ItemInfoContainer: {
    gap: 5,
  },
  ItemNameAndIconContainer: {
    flexDirection: 'row',
  },
  ItemNameText: {
    fontFamily: 'Inter Medium',
    fontSize: wp(5),
    color: Colors.black,
    width: wp(50),
  },
  ItemDescText: {
    fontFamily: 'Inter Regular',
    fontSize: wp(3.5),
    color: Colors.black,
  },
  ItemUnitContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 1,
  },
  ItemPriceText: {
    fontFamily: 'Inter Medium',
    fontSize: wp(4),
    color: Colors.black,
  },
  ItemUnitText: {
    fontFamily: 'Inter Medium',
    fontSize: wp(4),
    color: Colors.black,
  },
});
