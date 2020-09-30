import React from 'react';
import {ScrollView} from 'react-native';
import {ListItem, Button} from 'react-native-elements';
import colors from '../ui/colors';
import {useSelector} from 'react-redux';

const Suggestions = (props) => {
  const darkMode = useSelector((state) => state.settings.darkMode);

  if (props.suggestions && props.suggestions.length) {
    return (
      <ScrollView>
        {props.suggestions.map((suggestion, index) => (
          <ListItem
            key={index}
            containerStyle={{
              paddingTop: 0,
              paddingBottom: 0,
              backgroundColor: colors.background[darkMode],
            }}>
            <Button
              title={`${suggestion.LocalizedName} (${suggestion.AdministrativeArea.LocalizedName}), ${suggestion.Country.LocalizedName}`}
              type={'clear'}
              containerStyle={{
                flex: 1,
              }}
              titleStyle={{
                textAlign: 'left',
                flex: 1,
                color: colors.inactive[darkMode],
              }}
              onPress={() => props.onSelect(suggestion)}
            />
          </ListItem>
        ))}
      </ScrollView>
    );
  }
};

export default Suggestions;
