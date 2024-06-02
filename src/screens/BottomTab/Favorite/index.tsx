import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors} from '../../../resources/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SearchbarInput from '../../../components/SearchbarInput';

const Favorite = () => {
  const [searchString, setSearchString] = useState('');
  return (
    <View style={styles.root}>
      <View style={styles.HeaderContainer}>
        <Text style={styles.HeaderText}> Favorite</Text>
        <View style={styles.SearchContainer}>
          <SearchbarInput
            value={searchString}
            setValue={setSearchString}
            placeholder={'Search name, alias, business types'}
          />
        </View>
      </View>
      <View></View>
    </View>
  );
};
export default Favorite;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  HeaderContainer: {
    width: wp(100),
    height: hp(14),
    // backgroundColor: 'pink',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomWidth: 1.5,
    borderBottomColor: '#d2d2d2',
    paddingVertical: wp(4),
  },
  HeaderText: {
    paddingHorizontal: wp(2),
    fontFamily: 'Inter Medium',
    fontSize: wp(7),
    color: Colors.green,
  },
  SearchContainer: {
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
