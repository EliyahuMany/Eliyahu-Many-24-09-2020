import settingsReducer from './settings';
import weatherReducer from './weather';
import {combineReducers} from 'redux';

const reducers = combineReducers({
  settings: settingsReducer,
  weather: weatherReducer,
});

export default reducers;
