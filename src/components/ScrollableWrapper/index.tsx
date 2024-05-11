import React from 'react';
import {ScrollView, StyleProp, StyleSheet, ViewStyle} from 'react-native';

type ScrollableWrapperProps = {
  children: React.ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

const ScrollableWrapper = ({
  children,
  contentContainerStyle,
}: ScrollableWrapperProps) => (
  <ScrollView
    contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
    bounces={false}
    showsVerticalScrollIndicator={false}>
    {children}
  </ScrollView>
);

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    // paddingVertical: 16,
  },
});

export default ScrollableWrapper;
