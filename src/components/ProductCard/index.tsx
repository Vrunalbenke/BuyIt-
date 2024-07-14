import React from 'react';
import {Pressable, Text} from 'react-native';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../resources/colors';
const ProductCard = ({ProductData, ProductImage, IsService, colorCode}) => {
  return (
    <View style={styles.MainContainer}>
      <View style={styles.ImageContainer}>
        {ProductImage ? (
          <FastImage
            style={styles.ProductImageStyle}
            source={{
              uri: `https://${ProductImage}`,
              headers: {Authorization: 'someAuthToken'},
              priority: FastImage.priority.normal,
              cache: FastImage.cacheControl.immutable,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        ) : (
          <View
            style={[
              styles.ImageContainer,
              {
                backgroundColor: colorCode,
              },
            ]}>
            <Text style={styles.ImageText}>{ProductData.name[0]}</Text>
          </View>
        )}
      </View>
      <View style={styles.LeftContainer}>
        <View style={styles.LeftTopContainer}>
          <View style={styles.ProductInfoContainer}>
            <Text style={styles.NameText}>{ProductData.name}</Text>
            <Text style={styles.DescText}>{ProductData.description} </Text>
          </View>

          <View style={styles.ProductEditContainer}>
            <Pressable style={styles.EditContainer}>
              <Ionicons
                name="create-outline"
                size={wp(5)}
                color={Colors.orange}
              />
            </Pressable>
            <Pressable style={styles.EditContainer}>
              <Ionicons
                name="trash-outline"
                size={wp(5)}
                color={Colors.orange}
              />
            </Pressable>
          </View>
        </View>
        <View style={styles.PriceQuantityContainer}>
          <Text style={styles.PriceText}>
            Price: {ProductData.price}/{ProductData.unit}
          </Text>
          {!IsService && (
            <Text style={styles.QuantityText}>
              Quantity: {ProductData.quantity}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  MainContainer: {
    flexDirection: 'row',
    width: wp(92),
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ddd',
    paddingHorizontal: wp(1),
    paddingVertical: wp(2),
    gap: wp(2),
  },

  ImageContainer: {
    width: wp(16),
    height: wp(16),
    borderRadius: wp(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImageText: {
    fontSize: wp(6),
    fontFamily: 'Inter Medium',
    color: Colors.white,
  },
  ProductImageStyle: {
    width: wp(16),
    height: wp(16),
    borderRadius: wp(8),
  },
  LeftContainer: {
    width: wp(69),
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 5,
  },
  LeftTopContainer: {
    width: wp(69),
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  ProductInfoContainer: {
    width: wp(54),
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 3,
  },
  ProductEditContainer: {
    width: wp(15),

    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  PriceQuantityContainer: {
    flexDirection: 'row',
    width: wp(70),
    gap: 10,
  },

  NameText: {
    fontSize: wp(4),
    fontFamily: 'Inter Medium',
  },
  DescText: {
    fontSize: wp(3.3),
    fontFamily: 'Inter Regular',
  },

  PriceText: {
    fontSize: wp(3),
    fontFamily: 'Inter Regular',
  },
  QuantityText: {
    fontSize: wp(3),
    fontFamily: 'Inter Regular',
  },
  EditContainer: {
    flexDirection: 'row',
    gap: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
