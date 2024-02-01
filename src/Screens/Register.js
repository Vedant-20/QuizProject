import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import React, { useState } from 'react';

export default function Register() {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleRegister = () => {
    
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register To Play The Quiz</Text>

      
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor='yellow'
        value={username}
        onChangeText={(text) => setUsername(text)}
      />

      
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor='yellow'
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />

      
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor='yellow'
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />

      <Text style={styles.little} >
        Already Have an Account ? , SignIn
      </Text>

      
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
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
    fontSize: 24,
    color:'lime',
    textDecorationLine:'underline',
    fontWeight: '900',
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
    backgroundColor: 'yellow',
    padding: 10,
    paddingLeft:50,
    paddingRight:50,
    borderRadius: 10,
    marginTop:16,
  },
  buttonText: {
    color: 'purple',
    fontSize: 16,
    fontWeight: 'bold',
  },
  little: {
    fontSize:14,
    color:'yellow',
    marginBottom:36
  }
});
