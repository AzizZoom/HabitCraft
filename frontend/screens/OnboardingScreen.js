import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const OnboardingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to HabitCraft</Text>
      <Text>Build habits. Adapt. Grow.</Text>

      <Button
        title="Get Started"
        onPress={() => navigation.replace("Dashboard")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
});

export default OnboardingScreen;
