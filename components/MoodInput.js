import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

export default function MoodInput({ onMoodSubmit }) {
  const [selectedMood, setSelectedMood] = useState(null);
  const moods = ['Happy', 'Sad', 'Excited', 'Tired', 'Angry'];

  const handleSubmit = () => {
    if (selectedMood) {
      onMoodSubmit(selectedMood);
      setSelectedMood(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Bagaimana perasaan kamu hari ini?</Text>
      <View style={styles.moodContainer}>
        {moods.map((mood) => (
          <TouchableOpacity
            key={mood}
            style={[
              styles.moodButton,
              selectedMood === mood && styles.selectedMood,
            ]}
            onPress={() => setSelectedMood(mood)}
          >
            <Text style={styles.moodText}>{mood}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Button title="Submit Mood" onPress={handleSubmit} color="#8e24aa" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 3,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  moodButton: {
    padding: 10,
    backgroundColor: '#e1bee7',
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  selectedMood: {
    backgroundColor: '#8e24aa',
  },
  moodText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
