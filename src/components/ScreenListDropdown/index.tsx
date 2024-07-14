import React, {useContext, useState} from 'react';
import {StyleSheet, View, Pressable, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../resources/colors';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {FlashList} from '@shopify/flash-list';
import {ThemeContext} from '../../resources/themes';

export type ItemObjectProp = {
  id: string;
  title: string;
  icon: string;
};

export type ListDataProps = {
  id: string;
  title: string;
  abbreviation: string;
  type: string;
};

type ScreenListProps = {
  item: ItemObjectProp;
  onPress: (setToggleDD: React.Dispatch<React.SetStateAction<boolean>>) => void;
  listData: ListDataProps[];
  isRadius?: boolean;
  handleData: (item: ListDataProps) => void;
  selectedValue: string;
};
const ScreenListDropdown = ({
  item,
  onPress,
  listData,
  isRadius = false,
  handleData,
  selectedValue,
}: ScreenListProps) => {
  const scheme = useContext(ThemeContext);
  const [toggleDD, setToggleDD] = useState<boolean>(false);

  return (
    <View
      style={[
        styles.root,
        isRadius && toggleDD
          ? {
              borderTopWidth: 0.5,
              paddingTop: wp(4),
            }
          : toggleDD
          ? {borderBottomWidth: 0.5, paddingTop: wp(4)}
          : isRadius
          ? {
              borderTopWidth: 0.5,
              paddingVertical: wp(4),
            }
          : {
              borderBottomWidth: 0.5,
              paddingVertical: wp(4),
            },
      ]}>
      <View style={[styles.ScreenListContainer]}>
        <View style={styles.LeftContainer}>
          <Ionicons
            name={item.icon}
            size={wp(6)}
            color={scheme === 'dark' ? Colors.white : Colors.black}
          />
          <Text
            style={[
              styles.TitleText,
              {color: scheme === 'dark' ? Colors.white : Colors.black},
            ]}>
            {item.title}
          </Text>
        </View>

        <Pressable onPress={() => onPress(setToggleDD)}>
          <Ionicons
            name={toggleDD ? 'chevron-down-outline' : 'chevron-forward-outline'}
            size={wp(6)}
            color={scheme === 'dark' ? Colors.white : Colors.black}
          />
        </Pressable>
      </View>
      {toggleDD && (
        <View style={styles.ListContainer}>
          <FlashList
            bounces={false}
            data={listData}
            keyExtractor={item => item?.id}
            renderItem={({item}: {index: number; item: ListDataProps}) => (
              <Pressable
                style={styles.listItem}
                onPress={() => {
                  handleData(item);
                }}>
                <Text
                  style={[
                    styles.ListTitleText,
                    {
                      color:
                        selectedValue === item?.abbreviation
                          ? Colors.green
                          : scheme === 'dark'
                          ? Colors.white
                          : Colors.black,
                    },
                  ]}>
                  {item?.title} {isRadius ? 'miles' : ''}
                </Text>
              </Pressable>
            )}
            estimatedItemSize={5}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => (
              <View
                style={[
                  styles.ItemSeparator,
                  {borderColor: scheme === 'dark' ? Colors.gray : Colors.black},
                ]}
              />
            )}
          />
        </View>
      )}
    </View>
  );
};

export default ScreenListDropdown;

const styles = StyleSheet.create({
  root: {
    width: wp(100),
    paddingHorizontal: wp(4),
  },
  ScreenListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  TitleText: {
    fontSize: wp(5),
    fontFamily: 'Inter Medium',
  },
  LeftContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  ItemSeparator: {
    borderWidth: 0.5,
  },
  ListContainer: {
    paddingHorizontal: wp(4),
    paddingVertical: wp(2),
  },
  listItem: {
    paddingHorizontal: wp(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: wp(1),
  },
  ListTitleText: {
    fontSize: wp(4),
    fontFamily: 'Inter Regular',
  },
});
