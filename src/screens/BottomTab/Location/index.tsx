import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import env from '../../../env';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {RootBottomTabParams} from '../../../navigation/BottomTabNavigator';
import BusinessListBottomSheet from '../../../components/BusinessListBottomSheet';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import BusinessDetailBottomSheet from '../../../components/BusinessDetailBottomSheet';

const Location = ({
  route,
  navigation,
}: BottomTabScreenProps<RootBottomTabParams, 'Location'>) => {
  const {isFromRecent, isDraggable, openBusList, timeStamp} = route?.params;
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [businessDetail, setBusinessDetail] = useState();
  const mapRef = useRef(null);
  const businessListRef = useRef<BottomSheet | null>(null);
  const businessDetailRef = useRef<BottomSheet | null>(null);

  useEffect(() => {
    if (isFromRecent) {
      console.log('Is From Recent', isFromRecent);
    } else if (openBusList) {
      console.log('Open Business List', openBusList);
      businessListRef.current?.snapToPosition('50%');
    }
  }, [isFromRecent, openBusList, timeStamp]);
  return (
    <>
      <MapView
        key={env.GOOGLE_MAP_KEY}
        style={styles.map}
        region={region}
        provider={PROVIDER_GOOGLE}
        mapType={'standard'}
        ref={mapRef}
        showsUserLocation
        followsUserLocation={true}
        showsMyLocationButton={true}>
        {/* <Text>hii</Text> */}
      </MapView>
      <BusinessListBottomSheet
        bottomSheetRef={businessListRef}
        busniessDetailRef={businessDetailRef}
        setBusinessDetail={setBusinessDetail}
      />
      <BusinessDetailBottomSheet
        bottomSheetRef={businessDetailRef}
        business={businessDetail}
      />
    </>
  );
};
export default Location;

const styles = StyleSheet.create({
  map: {
    height: '100%',
    zIndex: -1,
    position: 'relative',
    borderWidth: 1,
  },
});
