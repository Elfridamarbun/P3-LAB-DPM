import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // import ini benar
import MoodInput from './components/MoodInput';
import MoodHistory from './components/MoodHistory';

export default function App() {
  const [moodHistory, setMoodHistory] = useState([]);

  // Fungsi untuk menambahkan suasana hati ke riwayat
  const addMood = (mood) => {
    const timestamp = new Date().toLocaleString();
    setMoodHistory((prevHistory) => [...prevHistory, { mood, timestamp }]);
  };

  // Fungsi untuk menghapus semua riwayat
  const clearHistory = () => {
    setMoodHistory([]);
  };

  // Fungsi untuk memuat riwayat dari AsyncStorage saat aplikasi dimuat
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const savedHistory = await AsyncStorage.getItem('moodHistory');
        if (savedHistory) {
          setMoodHistory(JSON.parse(savedHistory));
        }
      } catch (error) {
        console.error('Failed to load mood history:', error);
      }
    };
    loadHistory();
  }, []); // Hanya dijalankan saat komponen dimuat pertama kali

  // Simpan riwayat ke AsyncStorage setiap kali moodHistory berubah
  useEffect(() => {
    const saveHistory = async () => {
      try {
        await AsyncStorage.setItem('moodHistory', JSON.stringify(moodHistory));
      } catch (error) {
        console.error('Failed to save mood history:', error);
      }
    };
    saveHistory();
  }, [moodHistory]); // Hanya dijalankan saat moodHistory berubah

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mood Tracker</Text>
      <MoodInput onMoodSubmit={addMood} />
      <Button title="Clear All History" onPress={clearHistory} color="#d32f2f" />
      <ScrollView style={styles.scrollContainer}>
        <MoodHistory
          history={moodHistory}
          onRemoveMood={(index) => {
            setMoodHistory((prevHistory) =>
              prevHistory.filter((_, i) => i !== index)
            );
          }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3e5f5', // Latar belakang ungu muda
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#8e24aa', // Warna ungu gelap
  },
  scrollContainer: {
    marginTop: 20,
    flex: 1,
  },
});
