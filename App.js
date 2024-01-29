import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
} from 'react-native';




function App() {
  const isDarkMode = useColorScheme() === 'dark';


  return (
    <SafeAreaView >
      <Text>
        Hello WOrld
      </Text>
    </SafeAreaView>
  );
}


export default App;
