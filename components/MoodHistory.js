import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

export default function MoodHistory({ history, onRemoveMood }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mood History</Text>
      {history.length === 0 ? (
        <Text style={styles.emptyText}>No mood history yet.</Text>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.historyItem}>
              <View style={styles.textContainer}>
                <Text style={styles.mood}>{item.mood}</Text>
                <Text style={styles.timestamp}>{item.timestamp}</Text>
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => onRemoveMood(index)}
              >
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#ede7f6', // Ungu terang
    borderRadius: 10,
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#6a1b9a',
  },
  emptyText: {
    fontStyle: 'italic',
    color: '#777',
    textAlign: 'center',
  },
  historyItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1, // Mengatur agar teks mengambil ruang tersisa
    marginRight: 10, // Jarak antara teks dan tombol delete
  },
  mood: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8e24aa',
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
  },
  deleteButton: {
    backgroundColor: '#d32f2f', // Merah
    paddingVertical: 8, // Memberikan padding vertikal agar tombol terlihat proporsional
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  deleteText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
