import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  // heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const Fonts = StyleSheet.create({
  InterMedium: {
    fontFamily: 'Inter Medium',
    fontSize: wp(4),
  },
  InterRegular: {
    fontFamily: 'Inter Regular',
    fontSize: wp(4),
  },
  InterBold: {
    fontFamily: 'Inter Bold',
    fontSize: wp(4),
  },
  InterThin: {
    fontFamily: 'Inter Thin',
    fontSize: wp(4),
  },
});
