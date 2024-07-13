import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import BusinessDetailCard from '../../components/BusinessDetailCard';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../resources/colors';
import {Dimensions} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../../navigation/StackNavigator';
import {SearchBusinessResponse} from '../../services/Business/businessTypes';

const AnimatedBusinessDetailCard = ({item, colorCode, handleBusinessEdit}) => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const pressed = useSharedValue<boolean>(false);
  const offset = useSharedValue<number>(0);
  const screenWidth = Dimensions.get('window').width;

  console.log('Screen width in pixels:', screenWidth);
  const pan = Gesture.Pan()
    .onStart(() => {
      pressed.value = true;
    })
    .onChange(event => {
      if (event.translationX < 0 && event.translationX > -screenWidth * 0.42) {
        offset.value = event.translationX;
      } else if (event.translationX > 200) {
        offset.value = withTiming(0);
      }
      console.log(event.translationX);
    })
    .onFinalize(event => {
      // offset.value = withTiming(0);
      pressed.value = false;
      if (event.translationX > -screenWidth * 0.25) {
        offset.value = withTiming(0);
      } else if (event.translationX < -screenWidth * 0.25) {
        offset.value = withTiming(-screenWidth * 0.42);
      }
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {translateX: offset.value},
      // {scale: withTiming(offset.value < 0 && pressed.value ? 1.125 : 1)},
    ],
    // backgroundColor: pressed.value ? 'pink' : 'transparent',
  }));

  const handleManageServices = (businessItem: SearchBusinessResponse) => {
    console.log(businessItem);
    navigation.navigate('MyProducts', {
      business: businessItem,
    });
  };
  return (
    <View style={styles.root}>
      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.root, animatedStyles]}>
          <BusinessDetailCard item={item} colorCode={colorCode} />
          <View style={styles.HiddenContainer}>
            <Pressable
              style={styles.IconPressable}
              onPress={() => handleManageServices(item)}>
              <Ionicons name="card-outline" size={wp(5)} color={Colors.black} />
              <Text style={styles.HiddenText}>
                {item.is_service ? 'Manage Services' : 'Manage Products'}
              </Text>
            </Pressable>
            <Pressable
              style={styles.IconPressable}
              onPress={() => handleBusinessEdit(item)}>
              <Ionicons
                name="create-outline"
                size={wp(5)}
                color={Colors.black}
              />
              <Text style={styles.HiddenText}>Edit</Text>
            </Pressable>
            <Pressable style={styles.IconPressable}>
              <Ionicons
                name="trash-outline"
                size={wp(5)}
                color={Colors.black}
              />
              <Text style={styles.HiddenText}>Delete</Text>
            </Pressable>
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

export default AnimatedBusinessDetailCard;
const styles = StyleSheet.create({
  root: {
    width: wp(140),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  HiddenContainer: {
    width: wp(40),
    // backgroundColor: 'lightblue',
    gap: 5,
    height: wp(20),
    paddingVertical: wp(1),
  },
  IconPressable: {
    width: wp(40),
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  HiddenText: {
    fontSize: wp(3.2),
    fontFamily: 'Inter Regular',
    color: Colors.black,
    textTransform: 'capitalize',
  },
});
