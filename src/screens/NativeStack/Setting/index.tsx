import {FlashList} from '@shopify/flash-list';
import React, {useContext, useEffect, useState} from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  DeviceEventEmitter,
  Text,
  Appearance,
} from 'react-native';
import ScreenList, {ItemObjectProp} from '../../../components/ScreenList';
import {Colors} from '../../../resources/colors';
import ScreenListDropdown, {
  ListDataProps,
} from '../../../components/ScreenListDropdown';
import {storage} from '../../../../App';
import {lang, radius} from '../../common';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../navigation/StackNavigator';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Toast from 'react-native-toast-message';
import {useUpdateSearchRadiusMutation} from '../../../services/Auth';
import {ThemeContext, themes} from '../../../resources/themes';
import ToggleSwitch from '../../../components/ToggleSwitch';
import {useTranslation} from 'react-i18next';

const Setting = ({
  navigation,
}: NativeStackScreenProps<RootStackParams, 'Setting'>) => {
  const scheme = useContext(ThemeContext);
  const {i18n} = useTranslation();
  const ScreenListData = [
    {
      id: '1',
      title: 'Language',
      icon: 'language-outline',
    },
    {
      id: '2',
      title: 'Notification',
      icon: 'notifications-outline',
      naviagteTo: 'Notification',
      navigationParams: {},
    },
    {
      id: '3',
      title: 'Privacy Policy',
      icon: 'newspaper-outline',
      naviagteTo: 'Setting',
      navigationParams: {},
    },
    {
      id: '4',
      title: 'Terms and Conditions',
      icon: 'document-text-outline',
      naviagteTo: 'Setting',
      navigationParams: {},
    },
    {
      id: '5',
      title: 'Select a Search Radius',
      icon: 'search-circle-outline',
    },
    {
      id: '6',
      title: 'Delete Account',
      icon: 'person-remove-outline',
      naviagteTo: 'Setting',
      navigationParams: {},
    },
  ];

  const langData = [
    {
      id: '1',
      title: 'English',
      abbreviation: 'en',
      type: 'lang',
    },
    {
      id: '2',
      title: 'Spanish',
      abbreviation: 'es',
      type: 'lang',
    },
  ];

  const radiusData = [
    {
      id: '1',
      title: '5',
      abbreviation: '5',
      type: 'radius',
    },
    {
      id: '2',
      title: '10',
      abbreviation: '10',
      type: 'radius',
    },
    {
      id: '3',
      title: '50',
      abbreviation: '50',
      type: 'radius',
    },
    {
      id: '4',
      title: '100',
      abbreviation: '100',
      type: 'radius',
    },
  ];

  const [selectedLang, setSelectedLang] = useState<string>(lang || 'en');
  const [selectedRadius, setSelectedRadius] = useState<string>(
    radius.toString() || '5',
  );
  const [theme, setTheme] = useState<string>();

  useEffect(() => {
    const res = storage.getString('theme');
    if (res) {
      setTheme(res);
      console.log('Changing Theme ', res);
    }
  }, []);
  const [
    updateSearchRadius,
    {
      data: USRData,
      isSuccess: USRIsSuccess,
      isError: USRIsError,
      error: USRError,
    },
  ] = useUpdateSearchRadiusMutation();
  useEffect(() => {
    if (USRIsSuccess) {
      console.log(USRData);
      Toast.show({
        type: 'success',
        text1: 'Search Radius Updated',
        position: 'bottom',
      });
    } else if (USRIsError) {
      console.log(USRError);

      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
        position: 'bottom',
      });
    }
  }, [USRData, USRError, USRIsError, USRIsSuccess]);

  const handleScreenListNavigation = (item: ItemObjectProp) => {
    navigation.navigate(item?.naviagteTo, {
      ...item?.navigationParams,
    });
  };

  const handleToggleDropDown = (
    setterFunction: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    setterFunction(prev => !prev);
  };

  const handleData = (item: ListDataProps) => {
    storage.set(item?.type, item?.abbreviation);
    DeviceEventEmitter.emit(item?.type, item?.abbreviation);
    if (item.type === 'lang') {
      i18n.changeLanguage(item.abbreviation).then(() => {
        setSelectedLang(item.abbreviation);
      });
    } else {
      setSelectedRadius(item.abbreviation);
      const body = {
        device_id: 'uddj0pGYQboMKoex',
        search_radius: Number(item.abbreviation),
      };
      updateSearchRadius(body);
    }
  };
  const renderSeparator = () => {
    return (
      <View
        style={[
          styles.ItemSeparator,
          {borderColor: scheme === 'dark' ? Colors.gray : Colors.black},
        ]}
      />
    );
  };

  const handleToggle = () => {
    if (scheme === 'dark') {
      setTheme('light');
      Appearance.setColorScheme('light');
      storage.set('theme', 'light');
    } else {
      setTheme('dark');
      Appearance.setColorScheme('dark');
      storage.set('theme', 'dark');
    }
  };

  return (
    <View
      style={[
        styles.root,
        {
          backgroundColor:
            scheme === 'dark'
              ? themes.dark.backgroundColor
              : themes.light.backgroundColor,
        },
      ]}>
      <View style={styles.BackBTNContainer}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}>
          <Ionicons
            name={'chevron-back-outline'}
            size={wp(8)}
            color={scheme === 'dark' ? Colors.white : Colors.black}
          />
        </Pressable>
      </View>
      <FlashList
        data={ScreenListData}
        bounces={false}
        estimatedItemSize={4}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return item.id === '1' ? (
            <ScreenListDropdown
              item={item}
              onPress={handleToggleDropDown}
              listData={langData}
              isRadius={false}
              handleData={handleData}
              selectedValue={selectedLang}
            />
          ) : item.id === '5' ? (
            <ScreenListDropdown
              item={item}
              onPress={handleToggleDropDown}
              listData={radiusData}
              isRadius={true}
              handleData={handleData}
              selectedValue={selectedRadius}
            />
          ) : (
            <ScreenList item={item} onPress={handleScreenListNavigation} />
          );
        }}
        ItemSeparatorComponent={renderSeparator}
      />
      <View style={styles.ThemeContainer}>
        <View style={styles.ThemeRightContainer}>
          <Ionicons
            name="contrast-outline"
            size={wp(6)}
            color={scheme === 'dark' ? Colors.white : Colors.black}
          />
          <Text
            style={[
              styles.ThemeText,
              {color: scheme === 'dark' ? Colors.white : Colors.black},
            ]}>
            Dark Mode
          </Text>
        </View>
        <ToggleSwitch
          // label="Email"
          changeValue={handleToggle}
          disabled={false}
          value={theme === 'dark' ? 'True' : 'False'}
        />
      </View>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  BackBTNContainer: {
    width: wp(100),
    paddingHorizontal: wp(2),
  },
  ItemSeparator: {
    borderWidth: 0.5,
  },
  ThemeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: wp(5),
  },
  ThemeRightContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  ThemeText: {
    fontSize: wp(5),
    fontFamily: 'Inter Regular',
  },
});
