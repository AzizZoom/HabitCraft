import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ContributionGrid from "../components/ContributionGrid";

const dummyData = Array.from({ length: 30 }, () => ({
  count: Math.floor(Math.random() * 4),
}));

const AnalyticsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Analytics</Text>

      <View style={styles.card}>
        <Text style={{ marginBottom: 10 }}>
          📅 Last 30 Days Contribution
        </Text>
        <ContributionGrid data={dummyData} />
      </View>

      <View style={styles.card}>
        <Text>🔥 Longest Streak</Text>
      </View>

      <View style={styles.card}>
        <Text>⚡ Average Difficulty Growth</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F4F6F8" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  card: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3,
  },
});

export default AnalyticsScreen;
