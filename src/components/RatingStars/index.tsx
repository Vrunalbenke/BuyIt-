import React, {memo, useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Colors} from '../../resources/colors';

type RatingStar = {
  averageRating: number;
  setStar?: React.Dispatch<React.SetStateAction<number>>;
  isRating: boolean;
  sizeMutliple: number;
};

const RatingStar = ({
  averageRating,
  setStar,
  isRating,
  sizeMutliple = 1,
}: RatingStar) => {
  const starSize = wp(5.5);
  const totalStars = 5;
  const [rating, setRating] = useState(averageRating);

  const renderStar = (index: number) => {
    const starValue = index + 1;
    let iconName = 'star-outline';
    let color = Colors.darkLightGray;

    if (rating >= starValue) {
      iconName = 'star';
      color = Colors.gold;
    } else if (rating > index) {
      iconName = 'star-half-outline';
      color = Colors.gold;
    }

    return (
      <Pressable
        key={index}
        disabled={!isRating}
        onPress={() => {
          if (setStar) {
            setStar(index + 1);
          }
          setRating(index + 1);
        }}>
        <Ionicons
          name={iconName}
          size={starSize * sizeMutliple}
          color={color}
        />
      </Pressable>
    );
  };

  return (
    <View style={styles.root}>
      {[...Array(totalStars)].map((_, index) => renderStar(index))}
    </View>
  );
};

export default memo(RatingStar);

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
});
