import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  View,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {addFavorite, removeFavorite} from '../actions/weather';
import {Button} from 'react-native-elements';
import colors from './colors';
import {currentConditions} from '../utils/api';

export const FavoriteButton = (props) => {
  const weather = useSelector((state) => state.weather);
  const favorites = weather.favorites;
  const darkMode = useSelector((state) => state.settings.darkMode);
  const dispatch = useDispatch();
  const alreadyFavorite = favorites.filter(
    (favorite) => favorite.Key === props.location.Key,
  ).length;

  const pressHandler = () => {
    alreadyFavorite
      ? dispatch(removeFavorite(props.location))
      : dispatch(addFavorite(props.location));
  };

  return (
    <View style={styles.container}>
      <Button
        type={'clear'}
        containerStyle={{
          borderRadius: 30,
        }}
        titleStyle={{color: 'red'}}
        onPress={pressHandler}
        icon={
          alreadyFavorite ? (
            <Icon name="heart" size={30} color={'red'} solid />
          ) : (
            <Icon name="heart" size={30} color={colors.inactive[darkMode]} />
          )
        }></Button>
    </View>
  );
};

export const Preview = (props) => {
  const darkMode = useSelector((state) => state.settings.darkMode);
  const metric = useSelector((state) => state.settings.metric);
  const location = props.location;
  const [error, setError] = useState();
  const [visable, setVisable] = useState(false);
  const [conditions, setConditions] = useState(undefined);

  useEffect(() => {
    currentConditions(location.Key).then((res) => {
      if (res && res.length) {
        setConditions(res[0]);
      } else if (res.status) {
        setError(res);
        setVisable(true);
      }
    });
  }, []);

  return conditions ? (
    <TouchableNativeFeedback onPress={props.onPress}>
      <View
        style={[
          {backgroundColor: colors.mainColor[darkMode]},
          styles.previewLine,
        ]}>
        <View style={styles.column}>
          <Text style={{color: colors.active[darkMode], fontSize: 20}}>
            {location.LocalizedName}
          </Text>
          <Text style={{color: colors.inactive[darkMode]}}>
            {location.Country.LocalizedName}
          </Text>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text
              style={{
                color: colors.active[darkMode],
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              {Math.round(conditions.Temperature[metric].Value)}°{' '}
              {conditions.Temperature[metric].Unit}
            </Text>
          </View>
          <View style={styles.column}>
            <FavoriteButton location={location} />
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  ) : (
    <ActivityIndicator size="large" />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginStart: 10,
  },
  previewLine: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
