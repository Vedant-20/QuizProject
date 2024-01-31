import React, {useEffect, useRef, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Nav from './src/Navigation';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';

import {PersistGate} from 'redux-persist/integration/react';
import Toast, {BaseToast} from 'react-native-toast-message';

import {navigationRef} from './src/Utils/navigationService';
import store from './src/Store';

const App = () => {
  var persistor = persistStore(store);
  const toastConfig = {
    success: ({...rest}) => (
      <BaseToast
        {...rest}
        style={{borderLeftColor: '#90EE90'}}
        text1Style={{
          fontFamily: 'Poppins-Regular',
          fontWeight: '500',
        }}
      />
    ),
    error: ({...rest}) => (
      <BaseToast
        {...rest}
        style={{borderLeftColor: 'crimson'}}
        text1Style={{
          fontFamily: 'Poppins-Regular',
          fontWeight: '500',
        }}
      />
    ),
  };

  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <PersistGate persistor={persistor}>
          <Nav />
          <Toast config={toastConfig} />
        </PersistGate>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
