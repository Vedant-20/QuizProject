import { View, Text,TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const QuizDescription = ({ quizName='Quiz 1', quizDescription='Quiz About Alphabets', onStartQuizPress, onLeaderboardPress }) => {
  return (
    <View style={styles.container}>
      
      <Text style={styles.quizName}>{quizName}</Text>

      
      <Text style={styles.quizDescription}>{quizDescription}</Text>

      
      <TouchableOpacity style={styles.startQuizButton} onPress={onStartQuizPress}>
        <Text style={styles.buttonText}>Start Quiz</Text>
      </TouchableOpacity>

      
      <TouchableOpacity style={styles.leaderboardButton} onPress={onLeaderboardPress}>
        <Text style={styles.buttonText}>Leaderboard</Text>
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
    quizName: {
      color:'yellow',
      fontSize: 34,
      fontWeight: 'bold',
      marginBottom: 36,
    },
    quizDescription: {
      fontSize: 24,
      color:'orange',
      marginBottom: 36,
      textAlign: 'center',
    },
    startQuizButton: {
      backgroundColor: 'lime',
      padding: 15,
      borderRadius: 8,
      marginBottom: 30,
      width: '80%',
      alignItems: 'center',
    },
    leaderboardButton: {
      backgroundColor: 'cyan',
      padding: 15,
      borderRadius: 8,
      width: '80%',
      alignItems: 'center',
      
    },
    buttonText: {
      color: 'black',
      fontSize: 18,
      fontWeight: 'bold',
      
    },
  });

export default QuizDescription