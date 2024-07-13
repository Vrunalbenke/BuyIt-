import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {Colors} from '../../../resources/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchbarInput from '../../../components/SearchbarInput';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {FlashList} from '@shopify/flash-list';
import {useGetOwnedBusinessesQuery} from '../../../services/Business';
import {generateRandomHexCode} from '../../../utils/RandomHexCodeGenerator';
import AnimatedBusinessDetailCard from '../../../components/AnimatedBusinessDetailCard';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../navigation/StackNavigator';
import {AddBusinessFields} from '../AddBusiness';

const MyBusiness = ({
  navigation,
}: NativeStackScreenProps<RootStackParams, 'MyBusiness'>) => {
  const [searchString, setSearchString] = useState('');
  const [filteredBusinessList, setFilteredBusinessList] = useState<object[]>(
    [],
  );
  const [randomHexCodeArray, setRandomHexCodeArray] = useState<string[]>();

  const {
    data: GOBData,
    isError: GOBIsError,
    error: GOBError,
  } = useGetOwnedBusinessesQuery(null);

  useEffect(() => {
    if (GOBIsError) {
      console.log('Error i getOwned', GOBError);
    } else if (GOBData) {
      console.log('My BUsiness are ', GOBData);
      const Array = [
        {
          alias: 'EventPlanner::1006',
          business_type: 'EventPlanner',
          country_code: '+1',
          created_at: '2024-06-20 13:04:03.505116',
          description: 'All kinds of decorations ',
          email: null,
          facebook: 'None',
          id: '7',
          in_home: false,
          instagram: 'None',
          is_service: true,
          isopen: 'False',
          latitude: null,
          longitude: null,
          name: 'Marriage smasher',
          office_location: {
            latitude: 19.1418386734616,
            longitude: 73.01266673952341,
          },
          opened_at: 'None',
          owner_id: '1ca8176e-ab26-4ff7-b2b2-bc26abb4c346',
          phone_number: '4444444444',
          prevloc: 'None',
          radius_served: '20.0',
          share_email: 'False',
          share_phone: 'True',
          subscription_status: 'ACTIVE',
          subscription_type: 'Basic_trial',
          updated_at: 'None',
          website: 'None',
        },
        {
          alias: 'Caterer::1007',
          business_type: 'Caterer',
          country_code: '+1',
          created_at: '2024-06-21 10:15:30.123456',
          description: 'Delicious food for all occasions',
          email: 'tasty@example.com',
          facebook: 'tastycatering',
          id: '8',
          in_home: true,
          instagram: 'tasty_catering',
          is_service: true,
          isopen: 'True',
          latitude: 40.7128,
          longitude: -74.006,
          name: 'Tasty Catering',
          office_location: {latitude: 40.7128, longitude: -74.006},
          opened_at: '09:00',
          owner_id: '2db9287f-cd37-5gg8-c3c3-cd37abb5d457',
          phone_number: '5555555555',
          prevloc: 'None',
          radius_served: '30.0',
          share_email: 'True',
          share_phone: 'True',
          subscription_status: 'ACTIVE',
          subscription_type: 'Premium',
          updated_at: '2024-06-25 14:30:00.000000',
          website: 'www.tastycatering.com',
        },
        {
          alias: 'Photographer::1008',
          business_type: 'Photographer',
          country_code: '+44',
          created_at: '2024-06-22 09:30:45.789012',
          description: 'Capturing your special moments',
          email: 'snap@example.com',
          facebook: 'snapshots',
          id: '9',
          in_home: false,
          instagram: 'snap_shots',
          is_service: true,
          isopen: 'False',
          latitude: 51.5074,
          longitude: -0.1278,
          name: 'Snap Shots',
          office_location: {latitude: 51.5074, longitude: -0.1278},
          opened_at: 'None',
          owner_id: '3ec0398g-de48-6hh9-d4d4-de48bcc6e568',
          phone_number: '6666666666',
          prevloc: 'None',
          radius_served: '50.0',
          share_email: 'True',
          share_phone: 'False',
          subscription_status: 'INACTIVE',
          subscription_type: 'Basic',
          updated_at: '2024-06-24 16:45:00.000000',
          website: 'www.snapshots.com',
        },
        {
          alias: 'Florist::1009',
          business_type: 'Florist',
          country_code: '+61',
          created_at: '2024-06-23 14:20:15.456789',
          description: 'Beautiful floral arrangements',
          email: 'bloom@example.com',
          facebook: 'bloomingflowers',
          id: '10',
          in_home: false,
          instagram: 'blooming_flowers',
          is_service: false,
          isopen: 'True',
          latitude: -33.8688,
          longitude: 151.2093,
          name: 'Blooming Flowers',
          office_location: {latitude: -33.8688, longitude: 151.2093},
          opened_at: '08:00',
          owner_id: '4fd1409h-ef59-7ii0-e5e5-ef59cdd7f679',
          phone_number: '7777777777',
          prevloc: 'None',
          radius_served: '15.0',
          share_email: 'False',
          share_phone: 'True',
          subscription_status: 'ACTIVE',
          subscription_type: 'Premium',
          updated_at: '2024-06-26 11:00:00.000000',
          website: 'www.bloomingflowers.com',
        },
        {
          alias: 'DJ::1010',
          business_type: 'DJ',
          country_code: '+49',
          created_at: '2024-06-24 18:45:30.987654',
          description: 'Get the party started',
          email: 'beats@example.com',
          facebook: 'beatmaster',
          id: '11',
          in_home: true,
          instagram: 'beat_master',
          is_service: true,
          isopen: 'False',
          latitude: 52.52,
          longitude: 13.405,
          name: 'Beat Master',
          office_location: {latitude: 52.52, longitude: 13.405},
          opened_at: 'None',
          owner_id: '5ge2510i-fg60-8jj1-f6f6-fg60dee8g780',
          phone_number: '8888888888',
          prevloc: 'None',
          radius_served: '100.0',
          share_email: 'True',
          share_phone: 'True',
          subscription_status: 'ACTIVE',
          subscription_type: 'Basic_trial',
          updated_at: 'None',
          website: 'www.beatmaster.com',
        },
        {
          alias: 'Bakery::1011',
          business_type: 'Bakery',
          country_code: '+81',
          created_at: '2024-06-25 07:10:45.123456',
          description: 'Freshly baked goods daily',
          email: 'sweettreat@example.com',
          facebook: 'sweettreats',
          id: '12',
          in_home: false,
          instagram: 'sweet_treats',
          is_service: false,
          isopen: 'True',
          latitude: 35.6762,
          longitude: 139.6503,
          name: 'Sweet Treats',
          office_location: {latitude: 35.6762, longitude: 139.6503},
          opened_at: '06:00',
          owner_id: '6hf3621j-gh71-9kk2-g7g7-gh71eff9h891',
          phone_number: '9999999999',
          prevloc: 'None',
          radius_served: '10.0',
          share_email: 'False',
          share_phone: 'False',
          subscription_status: 'ACTIVE',
          subscription_type: 'Premium',
          updated_at: '2024-06-26 09:15:00.000000',
          website: 'www.sweettreats.com',
        },
        {
          alias: 'VenueRental::1012',
          business_type: 'VenueRental',
          country_code: '+33',
          created_at: '2024-06-26 11:30:00.789012',
          description: 'Elegant venues for all events',
          email: 'elegant@example.com',
          facebook: 'elegantvenues',
          id: '13',
          in_home: false,
          instagram: 'elegant_venues',
          is_service: true,
          isopen: 'True',
          latitude: 48.8566,
          longitude: 2.3522,
          name: 'Elegant Venues',
          office_location: {latitude: 48.8566, longitude: 2.3522},
          opened_at: '10:00',
          owner_id: '7ig4732k-hi82-0ll3-h8h8-hi82fgg0i902',
          phone_number: '1010101010',
          prevloc: 'None',
          radius_served: '75.0',
          share_email: 'True',
          share_phone: 'True',
          subscription_status: 'ACTIVE',
          subscription_type: 'Basic',
          updated_at: '2024-06-26 15:45:00.000000',
          website: 'www.elegantvenues.com',
        },
        {
          alias: 'MakeupArtist::1013',
          business_type: 'MakeupArtist',
          country_code: '+39',
          created_at: '2024-06-27 13:55:15.456789',
          description: 'Enhancing your natural beauty',
          email: 'glam@example.com',
          facebook: 'glamlook',
          id: '14',
          in_home: true,
          instagram: 'glam_look',
          is_service: true,
          isopen: 'False',
          latitude: 41.9028,
          longitude: 12.4964,
          name: 'Glam Look',
          office_location: {latitude: 41.9028, longitude: 12.4964},
          opened_at: 'None',
          owner_id: '8jh5843l-ij93-1mm4-i9i9-ij93ghh1j013',
          phone_number: '1111111111',
          prevloc: 'None',
          radius_served: '40.0',
          share_email: 'False',
          share_phone: 'True',
          subscription_status: 'INACTIVE',
          subscription_type: 'Basic_trial',
          updated_at: 'None',
          website: 'www.glamlook.com',
        },
        {
          alias: 'WeddingPlanner::1014',
          business_type: 'WeddingPlanner',
          country_code: '+34',
          created_at: '2024-06-28 16:20:30.123456',
          description: 'Making your dream wedding a reality',
          email: 'dream@example.com',
          facebook: 'dreamweddings',
          id: '15',
          in_home: false,
          instagram: 'dream_weddings',
          is_service: true,
          isopen: 'True',
          latitude: 40.4168,
          longitude: -3.7038,
          name: 'Dream Weddings',
          office_location: {latitude: 40.4168, longitude: -3.7038},
          opened_at: '09:30',
          owner_id: '9ki6954m-jk04-2nn5-j0j0-jk04hii2k124',
          phone_number: '1212121212',
          prevloc: 'None',
          radius_served: '150.0',
          share_email: 'True',
          share_phone: 'True',
          subscription_status: 'ACTIVE',
          subscription_type: 'Premium',
          updated_at: '2024-06-28 18:00:00.000000',
          website: 'www.dreamweddings.com',
        },
        {
          alias: 'TravelAgent::1015',
          business_type: 'TravelAgent',
          country_code: '+52',
          created_at: '2024-06-29 09:45:45.789012',
          description: 'Planning your perfect getaway',
          email: 'wanderlust@example.com',
          facebook: 'wanderlusttravels',
          id: '16',
          in_home: false,
          instagram: 'wanderlust_travels',
          is_service: true,
          isopen: 'True',
          latitude: 19.4326,
          longitude: -99.1332,
          name: 'Wanderlust Travels',
          office_location: {latitude: 19.4326, longitude: -99.1332},
          opened_at: '08:30',
          owner_id: '0lj7065n-kl15-3oo6-k1k1-kl15ijj3l235',
          phone_number: '1313131313',
          prevloc: 'None',
          radius_served: '200.0',
          share_email: 'True',
          share_phone: 'False',
          subscription_status: 'ACTIVE',
          subscription_type: 'Basic',
          updated_at: '2024-06-29 17:30:00.000000',
          website: 'www.wanderlusttravels.com',
        },
      ];
      setFilteredBusinessList(GOBData);
      setRandomHexCodeArray(generateRandomHexCode(GOBData.length));
    }
  }, [GOBData, GOBError, GOBIsError]);

  const handleBusinessEdit = (item: AddBusinessFields) => {
    navigation.navigate('AddBusiness', {
      isFromSignUp: false,
      EditBusiness: item,
      isUpdate: true,
    });
  };

  return (
    <View style={styles.root}>
      <View style={styles.TopContainer}>
        <View style={styles.IconContainer}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back-outline"
              size={wp(8)}
              color={Colors.black}
            />
          </Pressable>
          <Pressable
            style={styles.IconPressableContainer}
            onPress={() =>
              navigation.navigate('AddBusiness', {isFromSignUp: false})
            }>
            <Ionicons name={'add'} size={wp(8)} color={Colors.orange} />
          </Pressable>
        </View>
        <SearchbarInput
          value={searchString}
          setValue={setSearchString}
          placeholder={'Search'}
        />
      </View>
      <View style={styles.MiddleContainer}>
        <Text style={styles.MyBusinessText}>My Businesses</Text>
        <View style={styles.ScanIconContainer}>
          <Text style={styles.ScanText}>Scan</Text>
          <Pressable style={styles.ScanPressableContainer}>
            <Ionicons name={'scan'} size={wp(6)} color={Colors.green} />
          </Pressable>
        </View>
      </View>
      <View style={styles.BottomContainer}>
        <FlashList
          data={filteredBusinessList}
          estimatedItemSize={10}
          showsVerticalScrollIndicator={false}
          // keyExtractor={(item, index) => index + item.id}
          renderItem={({item, index}) => {
            return (
              <AnimatedBusinessDetailCard
                key={index}
                item={item}
                colorCode={
                  randomHexCodeArray ? randomHexCodeArray[index] : Colors.green
                }
                handleBusinessEdit={handleBusinessEdit}
              />
            );
          }}
          ListEmptyComponent={() => (
            <ActivityIndicator size={'large'} color={Colors.gray} />
          )}
          // ItemSeparatorComponent={() => <View style={styles.ItemSeparator} />}
        />
      </View>
    </View>
  );
};

export default MyBusiness;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  TopContainer: {
    paddingVertical: wp(2),
    gap: 10,
  },
  IconContainer: {
    width: wp(100),
    paddingHorizontal: wp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  IconPressableContainer: {
    paddingHorizontal: wp(2),
    paddingVertical: wp(0.5),
    backgroundColor: Colors.offWhite,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(1),
  },
  MiddleContainer: {
    width: wp(100),
    paddingHorizontal: wp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingVertical: wp(2),
  },
  MyBusinessText: {
    fontSize: wp(6),
    fontFamily: 'Inter Medium',
    color: Colors.green,
  },
  ScanIconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  ScanText: {
    fontSize: wp(5),
    fontFamily: 'Inter Regular',
    color: Colors.green,
  },
  ScanPressableContainer: {},
  BottomContainer: {
    flex: 1,
  },

  ItemSeparator: {
    borderWidth: 0.3,
  },
});
