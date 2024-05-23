import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
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
import {useBusinessTypesQuery} from '../../../services/Business';
import PressableInput from '../../../components/PressableInput';

type AddBusinessFields = z.infer<typeof AddBusinessSchema>;

const AddBusiness = ({
  navigation,
}: NativeStackScreenProps<RootStackParams, 'AddBusiness'>) => {
  const {control, setValue, getValues, handleSubmit} =
    useForm<AddBusinessFields>({
      defaultValues: {
        country_cca2: 'US',
        country_code: '+1',
        is_service: false,
        share_email: 'False',
        share_phone: 'False',
        business_type: 'Select a business',
      },
    });
  const scheme = useContext(ThemeContext);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [businessTypes, setBusinessTypes] = useState<businessTypesObject[]>();

  const {data: businessTypesData, isSuccess: businessTypesIsSuccess} =
    useBusinessTypesQuery(null);

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
      console.log(businessTypesArray);
    }
  }, [businessTypesIsSuccess, businessTypesData]);

  const handleToggle = (value: boolean, label: string) => {
    console.log('IN ChangeValeu');
    if (label === 'Email') {
      setValue('share_email', value ? 'True' : 'False');
    } else {
      setValue('share_phone', value ? 'True' : 'False');
    }
  };

  const handleAddBusiness = data => {
    console.log(data);
  };

  const handleBottomSheet = () => {
    console.log('Pressed');
    bottomSheetRef.current?.snapToIndex(1);
  };
  return (
    <ScrollableWrapper contentContainerStyle={styles.ScrollableWrapper}>
      <View style={styles.root}>
        <View style={styles.HeaderContainer}>
          <View style={styles.HeaderTopContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Ionicons
                name={'chevron-back-outline'}
                size={wp(7)}
                color={Colors.lightGreen}
              />
            </TouchableOpacity>
            <Text style={styles.TitleText}>VendIt!</Text>
            <View>
              <></>
            </View>
          </View>
          <Text style={styles.SubTitleText}>
            Fill in some details about your business
          </Text>
        </View>
        <View style={styles.InputContainer}>
          {/* <UserTextInput
            control={control}
            name={'business_type'}
            label="Type of business"
            placeholder={'John Doe'}
            disabled={false}
            size={wp(7)}
            inputMode={'text'} */}
          {/* /> */}
          <PressableInput
            control={control}
            name={'business_type'}
            label="Type of business"
            disabled={false}
            onPress={handleBottomSheet}
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
          {getValues('is_service') && (
            <UserTextInput
              control={control}
              name={'radius_served'}
              label="Radius Served"
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
          <ToggleSwitch label="Email" changeValue={handleToggle} />
          <ToggleSwitch label="Phone" changeValue={handleToggle} />
        </View>
        <LargeButton
          BTNText="Next"
          onPress={handleSubmit(handleAddBusiness)}
          isDisable={false}
          loader={true}
        />
      </View>
      <FlashListBottomSheet
        bottomSheetRef={bottomSheetRef}
        data={businessTypes}
        keyExtractor={item => item?.id?.toString()}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  TitleText: {
    fontSize: wp(9),
    color: Colors.lightGreen,
    fontFamily: 'Inter Medium',
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
});
