import { View, Text,TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'

const AddQuiz = () => {

    const [quizName, setQuizName] = useState('');
  const [quizDescription, setQuizDescription] = useState('');

  const handleAddQuiz = () => {
    
    if (!quizName || !quizDescription) {
      alert('Please fill in all fields.');
      return;
    }

    
    onSubmit({
      quizName,
      quizDescription,
    });

   
    setQuizName('');
    setQuizDescription('');
  };


  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Add Quiz</Text>

      
      <TextInput
        style={styles.input}
        placeholder="Quiz Name"
        placeholderTextColor='yellow'
        value={quizName}
        onChangeText={(text) => setQuizName(text)}
      />

      
      <TextInput
        style={styles.input}
        placeholder="Quiz Description"
        placeholderTextColor='yellow'
        value={quizDescription}
        onChangeText={(text) => setQuizDescription(text)}
        multiline
      />

      
      <TouchableOpacity style={styles.submitButton} onPress={handleAddQuiz}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  )
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
      fontSize: 34,
      color:'yellow',
      fontWeight: 'bold',
      marginBottom: 96,
    },
    input: {
      width: '80%',
      height: 40,
      borderColor: 'yellow',
      borderWidth: 2,
      borderRadius:10,
      marginBottom: 26,
      paddingLeft: 8,
    },
    submitButton: {
      backgroundColor: 'lime',
      padding: 10,
      paddingLeft:50,
      paddingRight:50,
      borderRadius: 10,
    },
    buttonText: {
      color: 'black',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default AddQuiz