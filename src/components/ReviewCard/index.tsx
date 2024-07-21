import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import RatingStars from '../RatingStars';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {ThemeContext} from '../../resources/themes';
import {Colors} from '../../resources/colors';

const ReviewCard = ({item}) => {
  const scheme = useContext(ThemeContext);
  return (
    <View style={styles.root}>
      <View style={styles.ProfileInfoContainer}>
        <View style={styles.ProfileContainer}>
          <Text>{item.name?.slice(0, 1)}</Text>
        </View>
        <View style={styles.NameRatingContainer}>
          <View style={styles.NameDateContainer}>
            <Text
              style={[
                styles.NameText,
                {color: scheme === 'dark' ? Colors.white : Colors.black},
              ]}>
              {item.name}
            </Text>
            <Text
              style={[
                styles.DateText,
                {color: scheme === 'dark' ? Colors.white : Colors.black},
              ]}>
              {item.date}
            </Text>
          </View>
          {/* <View style={styles.RatingInfoContainer}> */}
          <RatingStars
            averageRating={item.stars}
            isRating={false}
            sizeMutliple={0.7}
          />
          {/* <Text>{item.stars} out of 5</Text> */}
          {/* </View> */}
        </View>
      </View>
      <Text
        style={[
          styles.CommentText,
          {color: scheme === 'dark' ? Colors.white : Colors.black},
        ]}>
        {item.comment}
      </Text>
    </View>
  );
};

export default ReviewCard;

const styles = StyleSheet.create({
  root: {
    width: wp(100),
    paddingVertical: wp(2),
    paddingHorizontal: wp(4),
    // flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
  },
  ProfileInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
  },
  ProfileContainer: {
    width: wp(10),
    backgroundColor: 'pink',
    height: wp(10),
    borderRadius: wp(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  NameRatingContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 3,
  },
  NameDateContainer: {
    width: wp(80),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  NameText: {
    fontFamily: 'Inter Medium',
    fontSize: wp(4),
  },
  DateText: {
    fontFamily: 'Inter Regular',
    fontSize: wp(3.5),
  },
  RatingInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
  },
  CommentText: {
    paddingLeft: wp(11),
    fontFamily: 'Inter Regular',
    fontSize: wp(3.5),
  },
});
