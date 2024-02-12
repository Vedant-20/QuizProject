import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Formik} from 'formik';
import {useDispatch} from 'react-redux';
import * as yup from 'yup';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoginSVG from '../assets/Images/login.svg';
import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import {loginAction} from '../Store/Authentication';

const LoginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={LoginSchema}
        onSubmit={values => {
          console.log(values);
          dispatch(loginAction(values, setLoader));
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
            <Text style={styles.title}>Login</Text>
            <InputField
              label={'Email ID'}
              icon={
                <MaterialIcons
                  name="alternate-email"
                  size={20}
                  color="#666"
                  style={styles.icon}
                />
              }
              keyboardType="email-address"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              error={errors.email}
              touched={touched.email}
            />
            <InputField
              label={'Password'}
              icon={
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#666"
                  style={styles.icon}
                />
              }
              inputType="password"
              fieldButtonLabel={'Forgot?'}
              fieldButtonFunction={() => {
                navigation.navigate('ForgotPassword');
              }}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              error={errors.password}
              touched={touched.password}
            />
            <CustomButton
              isLoading={loader}
              label={'Login'}
              onPress={handleSubmit}
            />
          </View>
        )}
      </Formik>
      <TouchableOpacity
        onPress={() => navigation.navigate('Signup')}
        style={{marginTop: 20}}>
        <Text style={{color: '#666'}}>Don't have an account? Signup</Text>
      </TouchableOpacity>
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
    width: '80%',
  },
  loginImage: {
    alignSelf: 'center',
    marginBottom: 30,
  },
  title: {
    fontFamily: 'Roboto-Medium',
    fontSize: 28,
    fontWeight: '500',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  icon: {
    marginRight: 5,
  },
});

export default LoginScreen;
