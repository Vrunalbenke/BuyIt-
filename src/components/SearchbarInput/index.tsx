import {StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import {Colors} from '../../resources/colors';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import SearchIcon from '../../../assets/svg/search.svg';

type SearchbarInputProps = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  placeholderTextColor?: string;
};

const SearchbarInput = ({
  value,
  setValue,
  placeholder,
  placeholderTextColor = Colors.gray,
}: SearchbarInputProps) => {
  return (
    <View style={styles.root}>
      <View style={styles.InputContainer}>
        <SearchIcon height={wp(6)} width={wp(6)} fill={Colors.gray} />
        <TextInput
          value={value}
          onChangeText={setValue}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          style={styles.Input}
          multiline={false}
        />
      </View>
    </View>
  );
};

export default SearchbarInput;

const styles = StyleSheet.create({
  root: {
    width: wp(100),
    height: wp(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  InputContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: wp(2),
    backgroundColor: '#F2F2F2',
    width: wp(92),
    height: wp(12),
    paddingHorizontal: 10,
    gap: 10,
  },
  Input: {
    fontFamily: 'Inter Regular',
    fontSize: wp(4.5),
    color: Colors.black,
    width: wp(81),
  },
});
