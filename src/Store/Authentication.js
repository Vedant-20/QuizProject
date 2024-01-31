import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {Alert, Platform, ToastAndroid} from 'react-native';

import {API_HOST} from './../utils/https';
import navigationService from '../Utils/navigationService';
import {ToastMessage} from '../components/Toast';

const initialState = {
  isLoggedIn: true,
  token: null,
};

const login = createSlice({
  name: 'Login',
  initialState: initialState,
  reducers: {
    Login: (state, action) => {
      //console.log('In login reducer', action.payload);
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    createAccount: (state, action) => {
      //console.log('In create reducer', action.payload);
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    logout: (state, action) => {
      state.isLoggedIn = false;
      state.token = null;
    },
  },
});

export const loginAction = (data, setLoader) => async dispatch => {
  // console.log('in login request');
  try {
    const res = await axios({
      method: 'POST',
      url: API_HOST + `/api/login/`,
      data: data,
    });
    //console.log('In login action', res.data);
    ToastMessage.showSuccessMessage('Login Successful');
    setLoader(false);
    dispatch(Login(res.data));
  } catch (error) {
    ToastMessage.showErrorMessage(error.response.data.message);
    setLoader(false);
  }
};

export const sendNotificationTokenAction = (data, token) => async dispatch => {
  const localHeader = {...configHeader, Authorization: `Token ${token}`};
  try {
    const res = await axios({
      method: 'POST',
      url: API_HOST + `/api/add-device-token/`,
      data: data,
      headers: localHeader,
    });
    //console.log('In sendNotificationTokenAction ', res.data);
  } catch (error) {}
};

export const logoutAction =
  (token, setLoader, setModalVisible, fToken) => async dispatch => {
    // console.log('in login request');
    const localHeader = {...configHeader, Authorization: `Token ${token}`};

    try {
      const res = await axios({
        method: 'POST',
        url: API_HOST + `/api/logout/`,
        headers: localHeader,
        data: {device_token: fToken},
      });
      //console.log('In login action', res.data);
      ToastMessage.showSuccessMessage('Logout Successful');
      setLoader(false);
      setModalVisible(false);
      dispatch(logout());
    } catch (error) {
      ToastMessage.showSuccessMessage('Logout Successful');
      setLoader(false);
      setModalVisible(false);
      dispatch(logout());
    }
  };

export const changePasswordAction =
  (token, data, setLoader) => async dispatch => {
    const localHeader = {...configHeader, Authorization: `Token ${token}`};

    try {
      const res = await axios({
        method: 'PATCH',
        url: API_HOST + `/api/change-password/`,
        data: data,
        headers: localHeader,
      });
      // console.log('OTP verify action', res.data);
      ToastMessage.showSuccessMessage('Password changed successfully');
      navigationService.navigate('Home');
      setLoader(false);
    } catch (error) {
      ToastMessage.showErrorMessage(error.response.data.message);
      setLoader(false);
    }
  };
export const forgotPasswordAction = data => async dispatch => {
  // console.log('in login request');
  try {
    const res = await axios({
      method: 'POST',
      url: API_HOST + `/api/forgot-password-send-otp/`,
      data: data,
      headers: configHeader,
    });
    //console.log('In login action', res.data);
    ToastMessage.showSuccessMessage('OTP sent to your number');
    navigationService.navigate('ForgotPasswordOTP', {
      mobile: data.mobile_no,
    });
  } catch (error) {
    ToastMessage.showErrorMessage(error.response.data.message);
  }
};

export const registerAction = data => async dispatch => {
  // console.log('in login request');
  try {
    const res = await axios({
      method: 'POST',
      url: API_HOST + `/api/register/`,
      data: data,
      headers: configHeader,
    });
    console.log('In register action', res.data);
    ToastMessage.showSuccessMessage('register Successful');
    dispatch(createAccount(res.data));
    //navigationService.navigate('Login');
  } catch (error) {
    ToastMessage.showErrorMessage(error.response.data.message);
  }
};

export const sendMobileNumberAction = (data, setLoader) => async dispatch => {
  // console.log('in login request');
  try {
    const res = await axios({
      method: 'POST',
      url: API_HOST + `/api/send-otp/`,
      data: data,
      headers: configHeader,
    });
    //console.log('In login action', res.data);
    ToastMessage.showSuccessMessage('OTP Sent');
    setLoader(false);
    navigationService.navigate('OTP', {mobile: data.mobile_no});
  } catch (error) {
    ToastMessage.showErrorMessage(error.response.data.message);
    setLoader(false);
  }
};

export const verifyOTPAction = data => async dispatch => {
  console.log('in verifyOTPAction ', data);
  try {
    const res = await axios({
      method: 'POST',
      url: API_HOST + `/api/verify-otp/`,
      data: data,
      headers: configHeader,
    });
    // console.log('OTP verify action', res.data);
    navigationService.navigate('Signup', {mobile: data.mobile_no});
  } catch (error) {
    ToastMessage.showErrorMessage(error.response.data.message);
  }
};

export const verifyForgotPassOTPAction = data => async dispatch => {
  // console.log('in verifyOTPAction ', data);
  try {
    const res = await axios({
      method: 'PATCH',
      url: API_HOST + `/api/forgot-password/`,
      data: data,
      headers: configHeader,
    });
    // console.log('OTP verify action', res.data);
    ToastMessage.showSuccessMessage('Password Changed');
    navigationService.navigate('Login');
  } catch (error) {
    ToastMessage.showErrorMessage(error.response.data.message);
    navigationService.navigate('ForgotPassword');
  }
};

export const {Login, createAccount, logout} = login.actions;
export default login.reducer;
