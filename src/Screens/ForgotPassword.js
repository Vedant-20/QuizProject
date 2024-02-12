import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import CustomButton from '../components/CustomButton';
import LoginSVG from '../assets/Images/login.svg';
import {useNavigation} from '@react-navigation/native';
import {ToastMessage} from '../components/Toast';
import {useDispatch} from 'react-redux';
import {Formik} from 'formik';
import * as yup from 'yup';
import {forgotPasswordAction} from '../Store/Authentication';

const ForgotPassword = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

  const ForgotPasswordSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
  });

  const handleSendOTP = email => {
    ToastMessage.showSuccessMessage('OTP sent successfully! Check your email');
    dispatch(
      forgotPasswordAction({email}, setLoader, token => {
        navigation.navigate('Otp', {email: email, token: token});
      }),
    );
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{email: ''}}
        validationSchema={ForgotPasswordSchema}
        onSubmit={values => {
          console.log(values);
          handleSendOTP(values.email);
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <LoginSVG width={200} height={200} style={styles.loginImage} />
            <Text style={styles.title}>Send OTP</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              onChangeText={handleChange('email')}
            />
            {errors.email && touched.email && (
              <Text style={{color: 'red'}}>{errors.email}</Text>
            )}
            <CustomButton label="Send OTP" onPress={handleSubmit} />
          </>
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
    width: '80%',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default ForgotPassword;
