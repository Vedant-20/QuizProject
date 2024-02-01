import {View, Text,TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import React, { useState } from 'react';

export default function RegisterProfile() {

  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [age, setAge] = useState('25');
  const [bio, setBio] = useState('This is my bio');

  const handleEditProfile = () => {
    
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Age:', age);
    console.log('Bio:', bio);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{firstName}'s Profile</Text>

      
      <TextInput
        style={styles.input}
        placeholder="First Name"
        placeholderTextColor='yellow'
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
      />

      
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        placeholderTextColor='yellow'
        value={lastName}
        onChangeText={(text) => setLastName(text)}
      />

      
      <TextInput
        style={styles.input}
        placeholder="Age"
        placeholderTextColor='yellow'
        value={age}
        onChangeText={(text) => setAge(text)}
        keyboardType="numeric"
      />

      
      <TextInput
        style={styles.input}
        placeholder="Bio"
        placeholderTextColor='yellow'
        value={bio}
        onChangeText={(text) => setBio(text)}
        multiline
      />

      
      <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor:'#5D3FD3',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    color:'yellow',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 96,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'yellow',
    color:'yellow',
    borderWidth: 2,
    marginBottom: 26,
    paddingLeft: 8,
  },
  button: {
    backgroundColor: 'orange',
    padding: 10,
    paddingLeft:50,
    paddingRight:50,
    borderRadius: 10,
    marginTop:14
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
