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

  const store = createStore(
    persistedReducer,
    // DEV only! - The next line gives Redux DevTool the ability to expose all the store data.
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
  );

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
