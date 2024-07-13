/* eslint-disable @typescript-eslint/no-unused-vars */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../../resources/colors';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../navigation/StackNavigator';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import UserTextInput from '../../../components/UserTextInput';
import {useForm} from 'react-hook-form';
import PhoneNumberTextInput from '../../../components/PhoneNumberTextInput';
import {ThemeContext} from '../../../resources/themes';
import ScrollableWrapper from '../../../components/ScrollableWrapper';
import ToggleSwitch from '../../../components/ToggleSwitch';
import LargeButton from '../../../components/LargeButton';
import {z} from 'zod';
import {AddBusinessSchema, businessTypesObject} from '../nativeTypes';
import FlashListBottomSheet from '../../../components/FlashListBottomSheet';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import {
  useBusinessTypesQuery,
  useCreateBusinessMutation,
  useUpdateBusinessMutation,
} from '../../../services/Business';
import PressableInput from '../../../components/PressableInput';
import {zodResolver} from '@hookform/resolvers/zod';
import Toast from 'react-native-toast-message';

export type AddBusinessFields = z.infer<typeof AddBusinessSchema>;

const AddBusiness = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParams, 'AddBusiness'>) => {
  const {isFromSignUp, isUpdate = false, EditBusiness = null} = route.params;
  const {
    control,
    setValue,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<AddBusinessFields>({
    defaultValues: {
      country_cca2: 'US',
      country_code: '+1',
      useLocation: 'True',
      latitude: '18.447790',
      longitude: '73.882881',
    },
    resolver: zodResolver(AddBusinessSchema),
  });
  const scheme = useContext(ThemeContext);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [businessTypes, setBusinessTypes] = useState<businessTypesObject[]>();

  const {data: businessTypesData, isSuccess: businessTypesIsSuccess} =
    useBusinessTypesQuery(null);

  const [
    createBusiness,
    {
      data: CreateBusinessData,
      isSuccess: CreateBusinessIsSuccess,
      isLoading: CreateBusinessIsLoading,
      isError: CreateBusinessIsError,
      error: CreateBusinessError,
    },
  ] = useCreateBusinessMutation();

  const [
    updateBusiness,
    {
      data: UpdateBusinessData,
      isSuccess: UpdateBusinessIsSuccess,
      isLoading: UpdateBusinessIsLoading,
      isError: UpdateBusinessIsError,
      error: UpdateBusinessError,
    },
  ] = useUpdateBusinessMutation();

  useEffect(() => {
    if (businessTypesIsSuccess) {
      const businessTypesArray = Object.keys(businessTypesData).map(
        (key, index) => ({
          id: index + 1,
          name: key,
          ...businessTypesData[key],
        }),
      );
      setBusinessTypes(businessTypesArray);
    }
  }, [businessTypesIsSuccess, businessTypesData]);
  useEffect(() => {
    if (EditBusiness) {
      const editData = EditBusiness;

      const fieldsToSet: (keyof AddBusinessFields)[] = [
        'country_cca2',
        'country_code',
        'phone_number',
        'name',
        'business_type',
        'is_service',
        'email',
        'description',
        'radius_served',
        'website',
        'facebook',
        'instagram',
        'share_email',
        'share_phone',
        'latitude',
        'longitude',
        'useLocation',
      ];

      fieldsToSet.forEach(field => {
        if (
          field in editData &&
          editData[field] !== null &&
          editData[field] !== 'None'
        ) {
          setValue(field, editData[field]);
        }
      });

      if (editData.office_location) {
        setValue('office_location', {
          latitude: editData.office_location.latitude,
          longitude: editData.office_location.longitude,
        });
      }

      setValue('is_service', Boolean(editData.is_service));
      setValue('share_email', editData.share_email);
      setValue('share_phone', editData.share_phone);

      if (editData.business_type) {
        const businessType = businessTypes?.find(
          type => type.name === editData.business_type,
        );
        if (businessType) {
          setValue('url', businessType.business_icon);
        }
      }
    }
  }, [EditBusiness, setValue, businessTypes]);

  useEffect(() => {
    if (CreateBusinessIsSuccess) {
      console.log('Business Created -->', CreateBusinessData);
      if (!isUpdate) {
        Toast.show({
          type: 'success',
          text1: 'Business Created SuccessFully',
          position: 'bottom',
        });
        navigation.navigate('AddInventory', {
          is_service: CreateBusinessData[0].is_service,
          from_business: !route.params.isFromSignUp,
          business_id: CreateBusinessData[0].id,
          business_type: CreateBusinessData[0].business_type,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Something went wrong',
          position: 'bottom',
        });
        // navigation.goBack();
      }
    }
    if (CreateBusinessIsError) {
      console.log('Business Error -->', CreateBusinessError);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
        position: 'bottom',
      });
    }
  }, [
    CreateBusinessData,
    CreateBusinessIsSuccess,
    CreateBusinessError,
    CreateBusinessIsError,
  ]);

  useEffect(() => {
    if (UpdateBusinessIsSuccess) {
      console.log('Business Updated -->', UpdateBusinessData);
      if (!isUpdate) {
        Toast.show({
          type: 'success',
          text1: 'Business Updated SuccessFully',
          position: 'bottom',
        });

        navigation.goBack();
      } else {
        Toast.show({
          type: 'error',
          text1: 'Something went wrong',
          position: 'bottom',
        });
      }
    }
    if (UpdateBusinessIsError) {
      console.log('Updating Business Error -->', UpdateBusinessError);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
        position: 'bottom',
      });
    }
  }, [
    UpdateBusinessData,
    UpdateBusinessIsSuccess,
    UpdateBusinessError,
    UpdateBusinessIsError,
  ]);

  const handleToggle = (value: boolean, label: string) => {
    if (label === 'Email') {
      setValue('share_email', value ? 'True' : 'False');
    } else {
      setValue('share_phone', value ? 'True' : 'False');
    }
  };

  const handleAddBusiness = (data: AddBusinessFields) => {
    console.log('Updated Business info', data);
    data.business_type =
      data.business_type === 'Pop-up Store' ? 'PopUpStore' : data.business_type;
    data.business_type = data.business_type.replace(/\s/g, '');
    if (data.is_service) {
      const {country_cca2, is_service, url, ...rest} = data;
      createBusiness(rest);
    } else {
      const {
        country_cca2,
        is_service,
        url,
        radius_served,
        office_location,
        website,
        facebook,
        instagram,
        ...rest
      } = data;
      if (!rest.email) {
        rest.email = '';
      }
      if (!rest.description) {
        rest.description = '';
      }
      if (!rest.phone_number) {
        rest.phone_number = '';
      }
      createBusiness(rest);
    }
  };

  const handleUpdateBusiness = (data: AddBusinessFields) => {
    console.log('Update Business Data ', data);
    if (data.is_service) {
      const {country_cca2, is_service, url, useLocation, ...rest} = data;
      if (!rest.email) {
        rest.email = '';
      }
      if (!rest.description) {
        rest.description = '';
      }
      if (!rest.phone_number) {
        rest.phone_number = '';
      }
      rest['business_id'] = EditBusiness?.id;
      console.log('Before calling Update business API', rest);
      updateBusiness(rest);
    } else {
      const {
        country_cca2,
        is_service,
        url,
        radius_served,
        office_location,
        website,
        facebook,
        instagram,
        useLocation,
        ...rest
      } = data;
      if (!rest.email) {
        rest.email = '';
      }
      if (!rest.description) {
        rest.description = '';
      }
      if (!rest.phone_number) {
        rest.phone_number = '';
      }
      rest['id'] = EditBusiness?.id;
      updateBusiness(rest);
    }
  };
  const url = watch('url');
  const email = watch('email');
  const phone = watch('phone_number');
  const isService = watch('is_service');
  const shareEmail = watch('share_email');
  const sharePhone = watch('share_phone');

  const handleSetBusinessType = useCallback(
    (item: businessTypesObject) => {
      console.log('Rendering Func');
      setValue('business_type', item.name);
      setValue('url', item?.business_icon);
      setValue('is_service', item?.is_service);
      bottomSheetRef.current?.close();
    },
    [setValue],
  );

  const handleBottomSheet = () => {
    if (businessTypesData) {
      bottomSheetRef.current?.snapToIndex(2);
    }
  };
  return (
    <ScrollableWrapper contentContainerStyle={styles.ScrollableWrapper}>
      <View style={styles.root}>
        <View style={styles.HeaderContainer}>
          <View style={styles.HeaderTopContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={styles.BackTOP}>
              <Ionicons
                name={'chevron-back-outline'}
                size={wp(8)}
                color={Colors.lightGreen}
              />
            </TouchableOpacity>
            <Text style={styles.TitleText}>VendIt!</Text>
            <View style={styles.TitleLastContainer}>
              <></>
            </View>
          </View>
          <Text style={styles.SubTitleText}>
            Fill in some details about your business
          </Text>
        </View>
        <View style={styles.InputContainer}>
          <PressableInput
            control={control}
            name={'business_type'}
            label="Type of business"
            disabled={false}
            onPress={handleBottomSheet}
            url={url}
            placeholder={'Select a business'}
          />
          <UserTextInput
            control={control}
            name={'name'}
            label="Name"
            placeholder={'John Doe'}
            disabled={false}
            size={wp(7)}
            inputMode={'text'}
            Optional={false}
          />
          <UserTextInput
            control={control}
            name={'email'}
            label="Email"
            placeholder={'johndoe29@gmail.com'}
            disabled={false}
            size={wp(7)}
            inputMode={'text'}
            Optional={true}
          />
          <PhoneNumberTextInput
            control={control}
            name={'country_cca2'}
            name2={'country_code'}
            placeholder={'6969696969'}
            disabled={false}
            setValue={setValue}
            label={''}
            maxLength={10}
            placeholderTextColor={''}
            disableOnlyCC={false}
            TextInputStyle={undefined}
            scheme={scheme}
            Optional={!isService}
          />
          <UserTextInput
            control={control}
            name={'description'}
            label="Description"
            placeholder={''}
            disabled={false}
            size={wp(7)}
            inputMode={'text'}
            Optional={true}
            multiline={true}
          />
          {isService && (
            <UserTextInput
              control={control}
              name={'radius_served'}
              label="Radius Served"
              placeholder={''}
              disabled={false}
              size={wp(7)}
              inputMode={'numeric'}
              Optional={false}
              multiline={true}
            />
          )}
          {isService && (
            <UserTextInput
              control={control}
              name={'office_location'}
              label="Business Location"
              placeholder={''}
              disabled={false}
              size={wp(7)}
              inputMode={'text'}
              Optional={false}
              multiline={true}
            />
          )}
          {isService && (
            <UserTextInput
              control={control}
              name={'website'}
              label="Website"
              placeholder={''}
              disabled={false}
              size={wp(7)}
              inputMode={'text'}
              Optional={true}
              multiline={true}
            />
          )}
          {isService && (
            <UserTextInput
              control={control}
              name={'facebook'}
              label="Facebook"
              placeholder={''}
              disabled={false}
              size={wp(7)}
              inputMode={'text'}
              Optional={true}
              multiline={true}
            />
          )}
          {isService && (
            <UserTextInput
              control={control}
              name={'instagram'}
              label="Instagram"
              placeholder={''}
              disabled={false}
              size={wp(7)}
              inputMode={'text'}
              Optional={true}
              multiline={true}
            />
          )}
        </View>
        <Text style={styles.ShareText}>Share with customers</Text>
        <View style={styles.SwitchContainer}>
          <ToggleSwitch
            label="Email"
            changeValue={handleToggle}
            disabled={email === undefined || email === ''}
            value={shareEmail}
          />
          <ToggleSwitch
            label="Phone"
            changeValue={handleToggle}
            disabled={isService ? false : phone === undefined}
            value={sharePhone}
          />
          {errors.share_phone?.message && errors.share_email?.message && (
            <Text style={styles.ErrorText}>{errors.share_phone?.message}</Text>
          )}
        </View>
        <LargeButton
          BTNText={isUpdate ? 'Update' : 'Next'}
          onPress={
            isUpdate
              ? handleSubmit(handleUpdateBusiness)
              : handleSubmit(handleAddBusiness)
          }
          isDisable={
            isUpdate ? UpdateBusinessIsLoading : CreateBusinessIsLoading
          }
          loader={true}
        />
      </View>
      <FlashListBottomSheet
        bottomSheetRef={bottomSheetRef}
        data={businessTypes}
        keyExtractor={item => item?.id?.toString()}
        // setValue={setValue}
        handleSetBusinessType={handleSetBusinessType}
      />
    </ScrollableWrapper>
  );
};

export default AddBusiness;

const styles = StyleSheet.create({
  ScrollableWrapper: {
    backgroundColor: '#FFF',
  },
  root: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 20,
  },
  HeaderContainer: {
    width: wp(100),
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
  HeaderTopContainer: {
    width: wp(100),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  BackTOP: {
    flex: 1,
  },
  TitleText: {
    flex: 1,
    fontSize: wp(9),
    color: Colors.lightGreen,
    fontFamily: 'Inter Medium',
  },
  TitleLastContainer: {
    flex: 1,
  },
  SubTitleText: {
    fontSize: wp(4),
    color: Colors.black,
    fontFamily: 'Inter Regular',
  },
  InputContainer: {
    gap: 20,
  },
  ShareText: {
    fontSize: wp(5),
    fontFamily: 'Inter Regular',
  },
  SwitchContainer: {
    width: wp(92),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 20,
    // backgroundColor: 'red',
  },
  ErrorText: {
    width: wp(90),
    textAlign: 'left',
    paddingLeft: 10,
    fontWeight: '500',
    color: Colors.errorRed,
    fontFamily: 'Inter Medium',
  },
});
