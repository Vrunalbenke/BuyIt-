import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const CustomerSupport = () => {
  return (
    <View style={styles.container}>
      <Text>Customer Support</Text>
    </View>
  );
};

export default CustomerSupport;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
