import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const HabitCard = ({
  habit,
  onComplete,
  onDelete,
  strengthScore,
  onPress,
}) => {
  const progress =
    habit.totalDays === 0
      ? 0
      : habit.completedDays / habit.totalDays;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[
        styles.card,
        habit.completedToday && { backgroundColor: "#D4EDDA" },
      ]}
    >
      <Text style={styles.title}>{habit.name}</Text>

      <Text style={styles.meta}>
        🔥 Streak: {habit.completedStreak}
      </Text>

      <Text style={styles.meta}>
        ⚡ Difficulty: {habit.difficulty.toFixed(1)}
      </Text>

      <Text style={styles.meta}>
        💪 Strength Score: {strengthScore}
      </Text>

      <View style={styles.progressBar}>
        <View
          style={[styles.progressFill, { width: `${progress * 100}%` }]}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={(e) => {
          e.stopPropagation();
          onComplete();
        }}
        disabled={habit.completedToday}
      >
        <Text style={styles.buttonText}>
          {habit.completedToday
            ? "Completed Today ✓"
            : "Mark Complete"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        <Text style={styles.deleteText}>Delete Habit</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    padding: 18,
    marginVertical: 10,
    borderRadius: 20,
    elevation: 4,
  },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  meta: { fontSize: 14, marginBottom: 4, color: "#555" },
  progressBar: {
    height: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 5,
    marginVertical: 10,
  },
  progressFill: {
    height: 8,
    backgroundColor: "#4CAF50",
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 12,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  deleteButton: { marginTop: 10 },
  deleteText: {
    color: "red",
    textAlign: "center",
    fontWeight: "500",
  },
});

export default HabitCard;
