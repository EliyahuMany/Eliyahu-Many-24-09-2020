import React from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import colors from '../ui/colors';
import {useSelector} from 'react-redux';
import {Preview} from '../ui/favorite';
import {useNavigation} from '@react-navigation/native';

const Favorites = (props) => {
  const darkMode = useSelector((state) => state.settings.darkMode);
  const weather = useSelector((state) => state.weather);
  const navigation = useNavigation();
  const favorites = weather.favorites;

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: colors.background[darkMode]},
      ]}>
      <ScrollView>
        {favorites && favorites.length
          ? favorites.map((favorite) => (
              <Preview
                key={favorite.Key}
                location={favorite}
                onPress={() => {
                  navigation.navigate('Home', favorite);
                }}
              />
            ))
          : null}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, paddingTop: 10, paddingBottom: 10},
});

export default Favorites;
