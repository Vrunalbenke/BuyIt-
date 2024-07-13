import {StyleSheet, Text, Pressable, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {MotiView, useAnimationState} from 'moti';
import {Colors} from '../../resources/colors';
import {
  widthPercentageToDP as wp,
  // heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
type ToggleSwitchProps = {
  label: string;
  disabled: boolean;
  changeValue?: (toggle: boolean, label: string) => void;
  value: string;
};

const ToggleSwitch = ({
  label,
  disabled,
  changeValue,
  value,
}: ToggleSwitchProps) => {
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    setToggle(value === 'True' ? true : false);
  }, [value]);
  // console.log(label, ' toggle ', value, toggle);

  const animationState = useAnimationState({
    off: {
      translateX: 5,
      backgroundColor: '#E2E2E2',
    },
    on: {
      translateX: wp(6.7),
      backgroundColor: Colors.white,
    },
  });
  const containerAnimationState = useAnimationState({
    off: {
      backgroundColor: Colors.darkLightGray,
    },
    on: {
      backgroundColor: Colors.green,
    },
  });

  useEffect(() => {
    animationState.transitionTo(toggle ? 'on' : 'off');
    containerAnimationState.transitionTo(toggle ? 'on' : 'off');
  }, [toggle]);

  const handleToggle = () => {
    setToggle(prev => !prev);
    console.log(toggle);
    if (changeValue) {
      changeValue(toggle, label);
    }
    animationState.transitionTo(toggle ? 'on' : 'off');
    containerAnimationState.transitionTo(toggle ? 'on' : 'off');
  };

  return (
    <View style={styles.root}>
      <Pressable onPress={handleToggle} disabled={disabled}>
        <MotiView
          style={[styles.ToggleSwitchContainer]}
          state={containerAnimationState}
          transition={{
            type: 'timing',
            duration: 400,
          }}>
          <MotiView
            state={animationState}
            style={styles.circle}
            transition={{
              type: 'timing',
              duration: 300,
            }}
          />
        </MotiView>
      </Pressable>
      {label && (
        <Text
          style={[
            styles.LabelText,
            {color: disabled ? Colors.gray : Colors.black},
          ]}>
          {label}
        </Text>
      )}
    </View>
  );
};

export default ToggleSwitch;

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  ToggleSwitchContainer: {
    width: wp(12),
    height: wp(6),
    borderRadius: wp(8),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  circle: {
    width: wp(4),
    height: wp(4),
    borderRadius: wp(2),
    backgroundColor: '#E2E2E2',
  },
  LabelText: {
    fontSize: wp(4.5),
    fontFamily: 'Inter Regular',
  },
});
