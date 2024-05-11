import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

type TextIconButtonProps = {
  NormalText: string;
  NormalTextColor?: string;
  IconName?: string;
  IconSize?: number;
  IconColor?: string;
  onPress: () => void;
};

const TextIconButton = ({
  NormalText,
  NormalTextColor,
  IconName,
  IconSize,
  IconColor,
  onPress,
}: TextIconButtonProps) => {
  return (
    <TouchableOpacity style={styles.TOPContainer} onPress={onPress}>
      <Text style={[styles.NormalText, {color: NormalTextColor}]}>
        {NormalText}
      </Text>
      {IconName && (
        <Ionicons name={IconName} size={IconSize} color={IconColor} />
      )}
    </TouchableOpacity>
  );
};

export default TextIconButton;

const styles = StyleSheet.create({
  TOPContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  NormalText: {
    fontFamily: 'Inter Regular',
  },
});
