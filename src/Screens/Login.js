import {View, Text,TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import React, { useState } from 'react';

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login To Play Quiz</Text>

      
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
        Don't Have an Account ? , SignUp
      </Text>

      
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
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
    textDecorationLine:"underline",
    fontSize: 34,
    fontWeight: '900',
    marginBottom: 96,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'yellow',
    borderWidth: 2,
    marginBottom: 36,
    paddingLeft: 8,
  },
  button: {
    backgroundColor: 'lime',
    padding: 10,
    paddingLeft:50,
    paddingRight:50,
    borderRadius: 10,
  },
  buttonText: {
    color: 'purple',
    fontSize: 26,
    fontWeight: 'bold',
  },
  little: {
    fontSize:14,
    color:'yellow',
    marginBottom:36
  }
});