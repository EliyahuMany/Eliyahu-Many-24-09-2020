import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator, StatusBar, Text} from 'react-native';
import {SearchBar, Overlay} from 'react-native-elements';
import {useSelector} from 'react-redux';
import colors from '../ui/colors';
import {autoComplete, geoSearch} from '../utils/api';
import Suggestions from './suggestions';
import WeatherDisplay from './weather';
import {search as searchText} from '../../locals';
import Geolocation from '@react-native-community/geolocation';
import ErrorModal from '../ui/error';

const Home = (props) => {
  const [text, setText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [location, setLocation] = useState();
  const [error, setError] = useState();
  const [visable, setVisable] = useState(false);
  const darkMode = useSelector((state) => state.settings.darkMode);

  useEffect(() => {
    if (props.route.params) {
      setLocation(props.route.params);
    } else {
      Geolocation.getCurrentPosition((info) =>
        geoSearch(info).then((res) => {
          if (res && res.Key) {
            setLocation(res);
          } else if (res.status) {
            setError(res);
            setVisable(true);
          }
        }),
      );
    }
  }, [props.route.params]);

  const endEditingHandler = () => {
    autoComplete(text).then((res) => {
      if (res && res.length) {
        setSuggestions(res);
      } else if (res.status) {
        setError(res);
        setVisable(true);
      }
    });
  };

  const locationHandler = (suggestion) => {
    setLocation(suggestion);
    setText('');
    setSuggestions([]);
  };

  const changeTextHandler = (value) => {
    // check if the new value is combined only from english chars
    const english = /^[A-Za-z0-9 ]*$/;

    if (english.test(value)) {
      setText(value);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.background[darkMode]}}>
      <StatusBar
        backgroundColor={colors.background[darkMode]}
        barStyle={darkMode === 'dark' ? 'light-content' : 'dark-content'}
      />
      <ErrorModal
        isVisible={visable}
        error={error}
        onPress={() => {
          setVisable(false);
        }}
      />
      <SearchBar
        placeholder={searchText}
        value={text}
        clearIcon={true}
        searchIcon={true}
        round={true}
        onClear={() => setSuggestions([])}
        onEndEditing={endEditingHandler}
        containerStyle={{
          borderBottomWidth: 0,
          borderTopWidth: 0,
          backgroundColor: colors.background[darkMode],
        }}
        inputContainerStyle={{
          backgroundColor: colors.mainColor[darkMode],
        }}
        onChangeText={changeTextHandler}
      />
      {suggestions && suggestions.length ? (
        <Suggestions suggestions={suggestions} onSelect={locationHandler} />
      ) : location ? (
        <WeatherDisplay location={location} />
      ) : (
        <View style={{flex: 1, backgroundColor: colors.background[darkMode]}}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
};

export default Home;
