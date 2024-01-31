import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector, useDispatch} from 'react-redux';

import Home from '../Screens/Home';
import Register from '../Screens/Register';
import Login from '../Screens/Login';

const Stack = createStackNavigator();

const LoginStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login}></Stack.Screen>
      <Stack.Screen name="Signup" component={Register}></Stack.Screen>
    </Stack.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home}></Stack.Screen>
    </Stack.Navigator>
  );
};

const AppStack = () => {
  const loggedIn = useSelector(state => state.login.isLoggedIn);
  console.log('loggedIn', loggedIn);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {!loggedIn ? (
        <Stack.Screen name="LoginStack" component={LoginStack}></Stack.Screen>
      ) : (
        <Stack.Screen name="HomeStack" component={HomeStack}></Stack.Screen>
      )}
    </Stack.Navigator>
  );
};

export default AppStack;
