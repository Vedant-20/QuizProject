import { View, Text ,TextInput, TouchableOpacity, StyleSheet} from 'react-native'
import React, { useState } from 'react'

const AddQuestion = () => {

    const [question, setQuestion] = useState('');
  const [option, setOption] = useState(['']);
  const [correctAnswer, setCorrectAnswer] = useState('');

  const handleAddQuestion = () => {
    
    if (!question || option) {
      alert('Please fill in all fields.');
      return;
    }

    
    onSubmit({
      question,
      option,
      correctAnswer,
    });

    
    setQuestion('');
    setOption('');
    setCorrectAnswer('');
  };
  return (
    <View style={styles.container}>

<Text style={styles.title}>Add Question</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Question"
        placeholderTextColor='orange'
        value={question}
        onChangeText={(text) => setQuestion(text)}
        multiline
      />

      
        <TextInput
          
          style={styles.input}
          placeholder='option 1'
          placeholderTextColor='orange'
          value={option}
          onChangeText={()=>{}}
        />
        <TextInput
          
          style={styles.input}
          placeholder='option 2'
          placeholderTextColor='orange'
          value={option}
          onChangeText={()=>{}}
        />
        <TextInput
          
          style={styles.input}
          placeholder='option 3'
          placeholderTextColor='orange'
          value={option}
          onChangeText={()=>{}}
        />
        <TextInput
          
          style={styles.input}
          placeholder='option 4'
          placeholderTextColor='orange'
          value={option}
          onChangeText={()=>{}}
        />
      

      
      <TextInput
        style={styles.input}
        placeholder="Correct Answer"
        placeholderTextColor='orange'
        value={correctAnswer}
        onChangeText={(text) => setCorrectAnswer(text)}
      />

      
      <TouchableOpacity style={styles.submitButton} onPress={handleAddQuestion}>
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
        color:'yellow',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 36,
        textDecorationLine:'underline'
      },
    input: {
      width: '80%',
      height: 40,
      borderColor: 'orange',
      borderWidth: 2,
      borderRadius:10,
      marginBottom: 36,
      paddingLeft: 16,
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


export default AddQuestion