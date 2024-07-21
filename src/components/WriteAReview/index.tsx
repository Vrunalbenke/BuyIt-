import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useContext, useEffect} from 'react';
import RatingStars from '../RatingStars';
import {Colors} from '../../resources/colors';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import LargeButton from '../LargeButton';
import {useTranslation} from 'react-i18next';
import {ThemeContext} from '../../resources/themes';
import {usePostReviewMutation} from '../../services/Other';
import Toast from 'react-native-toast-message';
const WriteAReview = ({businessID}: number | String) => {
  const [star, setStar] = React.useState(0);
  const {t} = useTranslation();
  const scheme = useContext(ThemeContext);
  const [comment, setComment] = React.useState('');
  const [error, setError] = React.useState(false);
  console.log(businessID);
  const [postReview, {data, isSuccess, isLoading, isError, error: PRError}] =
    usePostReviewMutation();

  useEffect(() => {
    if (isSuccess) {
      console.log('Dta of post review ', data);
      Toast.show({
        type: 'success',
        text1: 'Review submitted successfully!',
        position: 'bottom',
      });

      setError(false);
      setComment('');
      setStar(0);
    } else if (isError) {
      console.log('Error while Posting Review ', PRError);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
        position: 'bottom',
      });
    }
  }, [data, isSuccess, isError, PRError]);

  const handleReview = () => {
    if (comment.trim() === '') {
      setError(true);
      return;
    } else if (star === 0) {
      return;
    } else {
      const body = {
        business_id: businessID,
        rating: star,
        feedback: comment,
      };
      postReview(body);
    }
  };

  return (
    <View style={styles.root}>
      <RatingStars
        averageRating={0}
        setStar={setStar}
        isRating={true}
        sizeMutliple={1.5}
      />
      <View>
        <TextInput
          value={comment}
          onChangeText={setComment}
          style={[
            styles.InputBox,
            {color: scheme === 'dark' ? Colors.white : Colors.black},
          ]}
          multiline
          placeholder="Write a review..."
          placeholderTextColor={Colors.gray}
        />
        {error && <Text style={styles.ErrorText}>Review is required</Text>}
      </View>
      <LargeButton
        BTNText={'Post'}
        onPress={handleReview}
        isDisable={isLoading}
        loader={true}
      />
    </View>
  );
};

export default WriteAReview;

const styles = StyleSheet.create({
  root: {
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  InputBox: {
    borderColor: Colors.darkLightGray,
    borderWidth: 1,
    borderRadius: 5,
    width: wp(92),
    height: wp(20),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: 5,
    fontSize: wp(4.5),
    fontFamily: 'Inter Regular',
  },
  ErrorText: {
    color: Colors.errorRed,
    fontSize: wp(4),
    fontFamily: 'Inter Regular',
  },
});
