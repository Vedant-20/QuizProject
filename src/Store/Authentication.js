import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {Alert, Platform, ToastAndroid} from 'react-native';

import {API_HOST} from './../Utils/http';
import * as navigationService from '../Utils/navigationService';
import {ToastMessage} from '../components/Toast';

const initialState = {
  isLoggedIn: false,
  token: null,
  isProfileComplete: false,
};

const login = createSlice({
  name: 'Login',
  initialState: initialState,
  reducers: {
    Login: (state, action) => {
      //console.log('In login reducer', action.payload);
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.isProfileComplete = action.payload.isProfileCompleted;
    },
    createAccount: (state, action) => {
      //console.log('In create reducer', action.payload);
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.isProfileComplete = action.payload.isProfileCompleted;
    },
    logout: (state, action) => {
      state.isLoggedIn = false;
      state.token = null;
    },
    changeProfileStatus: (state, action) => {
      state.isProfileComplete = action.payload;
    },
  },
});

export const loginAction = (data, setLoader) => async dispatch => {
  // console.log('in login request');
  try {
    const res = await axios({
      method: 'POST',
      url: API_HOST + `/auth/login/`,
      data: data,
    });
    console.log('In login action', res.data);
    ToastMessage.showSuccessMessage('Login Successful');
    setLoader(false);
    dispatch(Login(res.data));
  } catch (error) {
    console.log('In login action', error.response?.data?.error);
    ToastMessage.showErrorMessage(
      error.response?.data?.error
        ? error.response?.data?.error
        : 'Something went wrong',
    );
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
export const forgotPasswordAction =
  (data, setLoader, onSuccess) => async dispatch => {
    // console.log('in login request');
    try {
      setLoader(true);
      const res = await axios({
        method: 'POST',
        url: API_HOST + `/auth/ForgotPassword/`,
        data: data,
      });
      console.log('In login action', res.data);
      ToastMessage.showSuccessMessage('OTP sent to your Email.');
      setLoader(false);
      onSuccess(res.data.otp);
      // navigationService.navigate('ForgotPasswordOTP', {
      //   mobile: data.mobile_no,
      // });
    } catch (error) {
      setLoader(false);
      console.log('In login action', error.response.data.error);
      ToastMessage.showErrorMessage(
        error.response.data.error || 'Something went wrong',
      );
    }
  };

export const registerAction = (data, setLoader) => async dispatch => {
  // console.log('in login request');
  try {
    setLoader(true);
    const res = await axios({
      method: 'POST',
      url: API_HOST + `/auth/register/`,
      data: data,
    });
    console.log('In register action', res.data);
    ToastMessage.showSuccessMessage('register Successful');
    setLoader(false);
    dispatch(createAccount({...res.data, isProfileCompleted: false}));
    // navigationService.navigate('CompleteProfileScreen');
  } catch (error) {
    console.log('In register action', error.response.data.error);
    setLoader(false);
    ToastMessage.showErrorMessage(error.response.data.error);
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

export const verifyOTPAction = (data, setLoader) => async dispatch => {
  try {
    setLoader(true);
    const res = await axios({
      method: 'POST',
      url: API_HOST + `/api/verify-otp/`,
      data: data,
    });
    console.log('OTP verify action', res.data);
    ToastMessage.showSuccessMessage('OTP Verified');
    setLoader(false);
    // navigationService.navigate('Signup', {mobile: data.mobile_no});
  } catch (error) {
    setLoader(false);
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

export const CompleteProfileAction =
  (data, token, setLoader) => async dispatch => {
    const localHeader = {Authorization: `Token ${token}`};
    try {
      const res = await axios({
        method: 'POST',
        url: API_HOST + `/profile/`,
        data: data,
        headers: localHeader,
      });
      console.log('In complete profile action', res.data);
      ToastMessage.showSuccessMessage('Profile Completed');
      setLoader(false);
      dispatch(changeProfileStatus(true));
      navigationService.navigate('Home');
    } catch (error) {
      console.log('In complete profile action', error);
      ToastMessage.showErrorMessage(
        error.response?.data?.error
          ? error.response?.data?.error
          : 'Something went wrong',
      );
      setLoader(false);
    }
  };

export const {Login, createAccount, logout, changeProfileStatus} =
  login.actions;
export default login.reducer;
