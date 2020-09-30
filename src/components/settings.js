import React from 'react';
import {View, StyleSheet, Switch} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {ListItem, Text} from 'react-native-elements';
import {toggleDarkMode} from '../actions/settings';
import {toggleMetric} from '../actions/settings';
import colors from '../ui/colors';
import {darkMode as darkModeText, metricOrImperial} from '../../locals';

const Settings = (props) => {
  const darkMode = useSelector((state) => state.settings.darkMode);
  const metric = useSelector((state) => state.settings.metric);
  const dispatch = useDispatch();

  const toggleList = [
    {
      text: darkModeText,
      value: darkMode === 'dark',
      onPress: () => {
        dispatch(toggleDarkMode());
      },
    },
    {
      text: metricOrImperial,
      value: metric === 'Metric',
      onPress: () => {
        dispatch(toggleMetric());
      },
    },
  ];

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: colors.background[darkMode]},
      ]}>
      {toggleList.map((item, index) => (
        <View style={styles.row} key={index}>
          <View style={{flex: 1}}>
            <ListItem
              containerStyle={[
                {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  backgroundColor: colors.mainColor[darkMode],
                  borderBottomColor: colors.seconderyColor[darkMode],
                  borderBottomWidth: 1,
                },
                index === toggleList.length - 1
                  ? styles.bottomRadius
                  : index === 0
                  ? styles.topRadius
                  : null,
              ]}
              onPress={() => item.onPress()}>
              <Text style={{color: colors.inactive[darkMode], fontSize: 16}}>
                {item.text}
              </Text>
              <Switch value={item.value} onValueChange={item.onPress} />
            </ListItem>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 10,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginStart: 10,
    marginEnd: 10,
  },
  bottomRadius: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },
  topRadius: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
});

export default Settings;
