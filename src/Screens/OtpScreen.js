import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, TextInput, FlatList} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import LoginSVG from '../assets/Images/login.svg';
import CustomButton from '../components/CustomButton';

const OtpScheme = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  otp: yup
    .string()
    .matches(/^\d{4}$/, 'OTP must be exactly 4 digits')
    .required('OTP is required'),
});

const OtpScreen = ({navigation, route}) => {
  const email = route.params.email;
  const token = route.params.token;
  const otpInputs = useRef([]);
  const [timer, setTimer] = useState(60);
  const [otpSent, setOtpSent] = useState(false);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleResendOTP = () => {
    // Implement logic to resend OTP (e.g., API call)
    setOtpSent(true);
    setTimer(60);
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    if (value === '') return;

    if (index < otpInputs.current.length - 1) {
      otpInputs.current[index + 1].focus();
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{email: '', otp: ''}}
        validationSchema={OtpScheme}
        onSubmit={values => {
          console.log(values);
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.form}>
            <LoginSVG width={200} height={200} style={styles.loginImage} />
            <Text style={styles.title}>Forgot Password</Text>
            <FlatList
              data={[0, 1, 2, 3]}
              renderItem={({item, index}) => (
                <TextInput
                  ref={input => (otpInputs.current[index] = input)}
                  style={styles.input}
                  onChangeText={value => {
                    handleChange('otp')(
                      values.otp.slice(0, index) +
                        value.charAt(value.length - 1),
                    );
                    handleOtpChange(index, value);
                  }}
                  onBlur={handleBlur('otp')}
                  value={values.otp.charAt(index)}
                  keyboardType="numeric"
                  maxLength={1}
                />
              )}
              keyExtractor={item => item.toString()}
              horizontal
            />

            <Text style={styles.timer}>Resend OTP in {timer} seconds</Text>

            <CustomButton
              disabled={errors.otp == null && values.otp != '' ? false : true}
              label={'Submit'}
              onPress={handleSubmit}
            />
            {/* <CustomButton
              disabled={timer === 0 && !otpSent ? false : true}
              label={'Resend OTP'}
              onPress={handleResendOTP}
            /> */}
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  form: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Roboto-Medium',
    fontSize: 28,
    fontWeight: '500',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    height: 40,
    width: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    marginBottom: 20,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  timer: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default OtpScreen;
