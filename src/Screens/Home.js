import {View, Text,TouchableOpacity, StyleSheet} from 'react-native';
import React, { useState } from 'react';

export default function Home() {

  const [selectedTab, setSelectedTab] = useState('tab1');

  const handleTabPress = (tabName) => {
    setSelectedTab(tabName);
  };

  return (
    <View style={styles.container}>
      
      <TouchableOpacity
        style={[styles.tabButton, selectedTab === 'tab1' && styles.selectedTab]}
        onPress={() => handleTabPress('tab1')}
      >
        <Text style={styles.tabTitle}>Quiz 1</Text>
        <Text style={styles.tabDescription}>Description for Quiz 1</Text>
      </TouchableOpacity>

      
      <TouchableOpacity
        style={[styles.tabButton, selectedTab === 'tab2' && styles.selectedTab]}
        onPress={() => handleTabPress('tab2')}
      >
        <Text style={styles.tabTitle}>Quiz 2</Text>
        <Text style={styles.tabDescription}>Description for Quiz 2</Text>
      </TouchableOpacity>

      
      <TouchableOpacity
        style={[styles.tabButton, selectedTab === 'tab3' && styles.selectedTab]}
        onPress={() => handleTabPress('tab3')}
      >
        <Text style={styles.tabTitle}>Quiz 3</Text>
        <Text style={styles.tabDescription}>Description for Quiz 3</Text>
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
    padding:16
    
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    marginBottom:26,
    padding: 100,
    
    borderWidth:2,
    borderColor:'orange'
  },
  selectedTab: {
    borderBottomColor: 'blue', 
  },
  tabTitle: {
    fontSize: 18,
    color:'lime',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  tabDescription: {
    fontSize: 14,
    color: 'orange',
  },
});
