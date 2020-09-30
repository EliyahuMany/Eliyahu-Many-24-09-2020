import React from 'react';
import {Overlay, Button} from 'react-native-elements';
import {Text, View, StyleSheet} from 'react-native';
import {errors, ok, error, darkMode} from '../../locals';
import colors from './colors';
import {useSelector} from 'react-redux';

const ErrorModal = (props) => {
  const darkMode = useSelector((state) => state.settings.darkMode);

  return props.error ? (
    <Overlay
      isVisible={props.isVisible}
      overlayStyle={[
        styles.overlay,
        {backgroundColor: colors.mainColor[darkMode]},
      ]}>
      <View>
        <Text style={[styles.text, {color: colors.inactive[darkMode]}]}>
          {error} {props.error.status}: {errors[props.error.status]}
        </Text>
        <Button
          title={ok}
          titleStyle={{color: colors.active[darkMode]}}
          onPress={props.onPress}
          buttonStyle={{backgroundColor: colors.background[darkMode]}}
        />
      </View>
    </Overlay>
  ) : null;
};

const styles = StyleSheet.create({
  overlay: {
    margin: 20,
  },
  text: {margin: 10, marginBottom: 20, fontSize: 16},
});

export default ErrorModal;
