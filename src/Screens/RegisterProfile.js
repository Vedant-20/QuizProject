import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import DatePicker from 'react-native-date-picker';
import CustomButton from '../components/CustomButton';
import {CompleteProfileAction} from '../Store/Authentication';

const ProfileSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  DateOfBirth: yup.string().required('Date of birth is required'),
  bio: yup.string().required('Bio is required'),
});

const CompleteProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.login.token);
  const [loader, setLoader] = useState(false);
  const [open, setOpen] = useState(false);
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          DateOfBirth: '',
          bio: '',
        }}
        validationSchema={ProfileSchema}
        onSubmit={values => {
          console.log(values);
          dispatch(CompleteProfileAction(values, token, setLoader));
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
            <Text style={styles.title}>Complete Your Profile</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('firstName')}
              onBlur={handleBlur('firstName')}
              value={values.firstName}
              placeholder="First Name"
            />
            {errors.firstName && touched.firstName && (
              <Text style={styles.error}>{errors.firstName}</Text>
            )}
            <TextInput
              style={styles.input}
              onChangeText={handleChange('lastName')}
              onBlur={handleBlur('lastName')}
              value={values.lastName}
              placeholder="Last Name"
            />
            {errors.lastName && touched.lastName && (
              <Text style={styles.error}>{errors.lastName}</Text>
            )}
            <View style={styles.input}>
              <Text
                style={{padding: 10}}
                onPress={() => {
                  setOpen(true);
                }}>
                {values.DateOfBirth.toString() === ''
                  ? 'Date of Birth'
                  : values.DateOfBirth.toDateString()}
              </Text>
            </View>
            <DatePicker
              modal
              mode="date"
              open={open}
              onDateChange={value => {
                setOpen(false);
                values.DateOfBirth = value;
              }}
              onConfirm={value => {
                setOpen(false);
                values.DateOfBirth = value;
              }}
              onCancel={() => {
                setOpen(false);
              }}
              style={{width: 200}}
              date={new Date()}
            />

            {errors.DateOfBirth && touched.DateOfBirth && (
              <Text style={styles.error}>{errors.DateOfBirth}</Text>
            )}
            <TextInput
              style={styles.input}
              onChangeText={handleChange('bio')}
              onBlur={handleBlur('bio')}
              value={values.bio}
              placeholder="Bio"
              multiline
            />
            {errors.bio && touched.bio && (
              <Text style={styles.error}>{errors.bio}</Text>
            )}
            <CustomButton
              isLoading={loader}
              label="Submit"
              onPress={handleSubmit}
            />
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
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

export default CompleteProfileScreen;
