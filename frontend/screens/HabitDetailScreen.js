import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ContributionGrid from "../components/ContributionGrid";

const HabitDetailScreen = ({ route }) => {
  const { habit } = route.params;

  const completionRate =
    habit.totalDays === 0
      ? 0
      : ((habit.completedDays / habit.totalDays) * 100).toFixed(1);

  const dummyData = Array.from({ length: 14 }, () => ({
    count: Math.floor(Math.random() * 4),
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{habit.name}</Text>

      <View style={styles.card}>
        <Text>🔥 Current Streak: {habit.completedStreak}</Text>
        <Text>⚡ Difficulty Level: {habit.difficulty.toFixed(1)}</Text>
        <Text>💪 Total Completions: {habit.completedDays}</Text>
        <Text>📅 Total Attempts: {habit.totalDays}</Text>
        <Text>📊 Completion Rate: {completionRate}%</Text>
      </View>

      <View style={styles.card}>
        <Text style={{ marginBottom: 10 }}>
          📅 Last 14 Days Contribution
        </Text>
        <ContributionGrid data={dummyData} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F4F6F8" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  card: {
    backgroundColor: "#ffffff",
    padding: 18,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3,
  },
});

export default HabitDetailScreen;
