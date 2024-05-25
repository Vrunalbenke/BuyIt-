import {StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import {Colors} from '../../resources/colors';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

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
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        style={styles.Input}
      />
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
  Input: {
    borderRadius: 10,
    backgroundColor: '#F2F2F2',
    width: wp(92),
    height: wp(12),
    paddingLeft: 20,
  },
});
