import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => Alert.alert("Username", "Demo User")}
      >
        <Text>👤 Username: Demo User</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => Alert.alert("Stats", "Coming Soon")}
      >
        <Text>🏆 Total Habits Created</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => Alert.alert("Settings", "Coming Soon")}
      >
        <Text>⚙️ App Settings</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={{ fontWeight: "bold" }}>
          🚀 Upcoming Features
        </Text>
        <Text>• AI Habit Coach</Text>
        <Text>• Mood Tracking</Text>
        <Text>• Burnout Prediction</Text>
        <Text>• Cloud Sync</Text>
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

export default ProfileScreen;
