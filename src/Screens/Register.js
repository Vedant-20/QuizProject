import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch} from 'react-redux';

import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import LoginSVG from '../assets/Images/login.svg';
import {registerAction} from '../Store/Authentication';

const RegisterSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const Register = ({navigation}) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{email: '', password: '', confirmPassword: ''}}
        validationSchema={RegisterSchema}
        onSubmit={values => {
          console.log(values);
          dispatch(
            registerAction(
              {
                email: values.email,
                password: values.password,
              },
              setLoader,
            ),
          );
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
            <Text style={styles.title}>Register</Text>
            <InputField
              label={'Email'}
              keyboardType="email-address"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              error={errors.email}
              touched={touched.email}
            />
            <InputField
              label={'Password'}
              inputType="password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              error={errors.password}
              touched={touched.password}
            />
            <InputField
              label={'Confirm Password'}
              inputType="password"
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
            />
            <CustomButton
              isLoading={loader}
              label={'Register'}
              onPress={handleSubmit}
            />
          </View>
        )}
      </Formik>
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={{marginTop: 20}}>
        <Text style={{color: '#666'}}>Already have an account? Login</Text>
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
  title: {
    fontFamily: 'Roboto-Medium',
    fontSize: 28,
    fontWeight: '500',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  loginImage: {
    alignSelf: 'center',
    marginBottom: 30,
  },
});

export default Register;
