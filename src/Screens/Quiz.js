import { View, Text ,Image, TouchableOpacity, StyleSheet} from 'react-native'
import React from 'react'

const Quiz = ({ question, options, onSelectOption }) => {
  return (
    <View style={styles.container}>
    <Text style={styles.title}>Please Choose One Option</Text>
      
      <View style={styles.questionBox}>
       
        <Image source={{ uri: 'https://www.creativefabrica.com/wp-content/uploads/2022/08/23/Christmas-alphabet-letter-A-Graphics-36876255-2-580x387.png' }} style={styles.questionImage} />
      </View>

      
      <View style={styles.optionsContainer}>
        
          <TouchableOpacity
            
            style={styles.optionBox}
            onPress={() => onSelectOption()}
          >
            
            <Image source={{ uri: 'https://cdn.pixabay.com/photo/2021/01/09/12/58/apple-5902283_1280.png' }} style={styles.optionImage} />
          </TouchableOpacity>
        
      </View>
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
    },
    questionBox: {
      width: '80%',
      aspectRatio: 1, 
      borderWidth: 2,
      borderRadius:10,
      borderColor: 'lime',
      marginBottom: 26,
    },
    questionImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    optionsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    optionBox: {
      width: '40%', 
      aspectRatio: 1, 
      borderWidth: 2,
      borderRadius:10,
      borderColor: 'orange',
      margin: 8,
    },
    optionImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
  });

export default Quiz