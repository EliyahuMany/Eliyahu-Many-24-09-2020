import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {persistStore, persistReducer} from 'redux-persist';
import {Provider, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {PersistGate} from 'redux-persist/integration/react';

import Tabs from './src/components/';
import reducers from './src/reducers';
import {createStore} from 'redux';

const App = () => {
  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
  };

  const persistedReducer = persistReducer(persistConfig, reducers);

  const store = createStore(persistedReducer);

  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Tabs />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
