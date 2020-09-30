import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import colors from '../ui/colors';
import {Card, ListItem} from 'react-native-elements';
import {currentConditions, fiveDaysForecasts} from '../utils/api';
import {days, realFeel, wind, windGust} from '../../locals';
import {formatDate} from '../utils/date';
import {FavoriteButton} from '../ui/favorite';
import ErrorModal from '../ui/error';

const WeatherDisplay = (props) => {
  const darkMode = useSelector((state) => state.settings.darkMode);
  const [conditions, setConditions] = useState(undefined);
  const location = props.location;
  const [error, setError] = useState();
  const [visable, setVisable] = useState(false);
  const [date, setDate] = useState(undefined);

  useEffect(() => {
    currentConditions(location.Key).then((res) => {
      console.log(res);
      if (res && res.length) {
        setDate(new Date());
        setConditions(res[0]);
      } else if (res.status) {
        setError(res);
        setVisable(true);
      }
    });
  }, []);

  return conditions ? (
    <ScrollView>
      <Card
        containerStyle={[
          styles.card,
          {backgroundColor: colors.mainColor[darkMode]},
        ]}>
        <Header date={date} location={location} />
        <Temperature conditions={conditions} />
        <FiveDays location={location} />
      </Card>
    </ScrollView>
  ) : (
    <View>
      <ErrorModal
        isVisible={visable}
        error={error}
        onPress={() => {
          setVisable(false);
        }}
      />
      <ActivityIndicator />
    </View>
  );
};

const FiveDays = (props) => {
  const darkMode = useSelector((state) => state.settings.darkMode);
  const [forecast, setForcast] = useState();
  const settings = useSelector((state) => state.settings);
  const [error, setError] = useState();
  const [visable, setVisable] = useState(false);
  const metric = settings.metric;

  useEffect(() => {
    fiveDaysForecasts(props.location.Key, metric).then((res) => {
      if (res && res.DailyForecasts) {
        setForcast(res);
      } else if (res.status) {
        setError(res);
        setVisable(true);
      }
    });
  }, [metric]);

  return forecast &&
    forecast.DailyForecasts &&
    forecast.DailyForecasts.length === 5 ? (
    forecast.DailyForecasts.map((forcast, index) => (
      <ListItem
        key={index}
        containerStyle={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: colors.mainColor[darkMode],
        }}>
        <ListItem.Title style={{color: colors.inactive[darkMode]}}>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>
            {days[new Date(forcast.Date).getDay()]}
          </Text>
          {', '}
          {formatDate(new Date(forcast.Date).getDate())}
          {'/'}
          {formatDate(new Date(forcast.Date).getMonth() + 1)}
        </ListItem.Title>
        <ListItem.Subtitle style={{color: colors.inactive[darkMode]}}>
          {Math.round(forcast.Temperature.Minimum.Value)}° -{' '}
          {Math.round(forcast.Temperature.Maximum.Value)}°{' '}
          {forcast.Temperature.Minimum.Unit}
        </ListItem.Subtitle>
      </ListItem>
    ))
  ) : (
    <ErrorModal
      isVisible={visable}
      error={error}
      onPress={() => {
        setVisable(false);
      }}
    />
  );
};

const Temperature = (props) => {
  const darkMode = useSelector((state) => state.settings.darkMode);
  const metric = useSelector((state) => state.settings.metric);
  const conditions = props.conditions;

  return (
    <View
      style={[
        styles.row,
        styles.divider,
        {
          justifyContent: 'space-between',
          borderBottomColor: colors.seconderyColor[darkMode],
        },
      ]}>
      <View style={styles.column}>
        <Text
          style={{
            fontSize: 26,
            fontWeight: 'bold',
            color: colors.active[darkMode],
          }}>
          {Math.round(conditions.Temperature[metric].Value)}
          {'° '}
          {conditions.Temperature[metric].Unit}
        </Text>
        <Text
          style={{
            color: colors.inactive[darkMode],
          }}>
          {realFeel} {Math.round(conditions.RealFeelTemperature[metric].Value)}
          {'° '}
          {conditions.RealFeelTemperature[metric].Unit}
        </Text>
      </View>
      <View style={styles.column}>
        <Text
          style={{
            color: colors.inactive[darkMode],
          }}>
          <Text style={{fontWeight: 'bold'}}>{wind}</Text>:{' '}
          {conditions.Wind.Speed[metric].Value}{' '}
          {conditions.Wind.Speed[metric].Unit}{' '}
          {conditions.Wind.Direction.English}
        </Text>
        <Text
          style={{
            color: colors.inactive[darkMode],
          }}>
          <Text style={{fontWeight: 'bold'}}>{windGust}</Text>:{' '}
          {conditions.WindGust.Speed[metric].Value}{' '}
          {conditions.WindGust.Speed[metric].Unit}
        </Text>
      </View>
    </View>
  );
};

const Header = (props) => {
  const darkMode = useSelector((state) => state.settings.darkMode);
  const location = props.location;
  const date = props.date;

  return (
    <View
      style={[
        styles.headerContainer,
        styles.divider,
        {borderBottomColor: colors.seconderyColor[darkMode]},
      ]}>
      <View style={styles.row}>
        <Text
          style={{
            flex: 1,
            color: colors.active[darkMode],
            fontWeight: 'bold',
            fontSize: 24,
          }}>
          {location.LocalizedName}, {location.Country.LocalizedName}
        </Text>
        <FavoriteButton location={location} />
      </View>
      <Text
        style={{
          color: colors.inactive[darkMode],
        }}>{`${formatDate(date.getDate())}/${formatDate(
        date.getMonth() + 1,
      )} ${formatDate(date.getHours())}:${formatDate(
        date.getMinutes(),
      )}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginBottom: 20,
    borderWidth: 0,
    borderRadius: 10,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  divider: {
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginBottom: 10,
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default WeatherDisplay;
