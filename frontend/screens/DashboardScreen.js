import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HabitCard from "../components/HabitCard";
import {
  adjustHabitDifficulty,
  calculateStrengthScore,
} from "../utils/habitEngine";

const STORAGE_KEY = "HABITS_STORAGE";
const DATE_KEY = "LAST_DATE";

const DashboardScreen = ({ navigation }) => {
  const [habits, setHabits] = useState([]);
  const [newHabitName, setNewHabitName] = useState("");

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    const storedHabits = await AsyncStorage.getItem(STORAGE_KEY);
    const today = new Date().toDateString();
    const lastDate = await AsyncStorage.getItem(DATE_KEY);

    let parsedHabits = storedHabits ? JSON.parse(storedHabits) : [];

    if (lastDate !== today) {
      parsedHabits = parsedHabits.map((habit) => ({
        ...habit,
        completedToday: false,
      }));

      await AsyncStorage.setItem(DATE_KEY, today);
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(parsedHabits)
      );
    }

    setHabits(parsedHabits);
  };

  const saveHabits = async (updatedHabits) => {
    setHabits(updatedHabits);
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedHabits)
    );
  };

  const handleComplete = (id) => {
    const updatedHabits = habits.map((habit) => {
      if (habit.id === id && !habit.completedToday) {
        let updatedHabit = {
          ...habit,
          completedDays: habit.completedDays + 1,
          totalDays: habit.totalDays + 1,
          completedStreak: habit.completedStreak + 1,
          missedDays: 0,
          completedToday: true,
        };

        return adjustHabitDifficulty(updatedHabit);
      }
      return habit;
    });

    saveHabits(updatedHabits);
  };

  const deleteHabit = (id) => {
    const updatedHabits = habits.filter(
      (habit) => habit.id !== id
    );
    saveHabits(updatedHabits);
  };

  const addHabit = () => {
    if (!newHabitName.trim()) return;

    const newHabit = {
      id: Date.now().toString(),
      name: newHabitName,
      difficulty: 5,
      completedDays: 0,
      totalDays: 0,
      completedStreak: 0,
      missedDays: 0,
      completedToday: false,
    };

    saveHabits([...habits, newHabit]);
    setNewHabitName("");
  };

  const totalHabits = habits.length;
  const completedTodayCount = habits.filter(
    (h) => h.completedToday
  ).length;

  return (
    <View style={styles.container}>
      {/* Gradient Header */}
      <LinearGradient
        colors={["#4CAF50", "#2E7D32"]}
        style={styles.headerContainer}
      >
        <Text style={styles.headerTitle}>HabitCraft</Text>
        <Text style={styles.headerSubtitle}>
          Build. Adapt. Grow.
        </Text>
      </LinearGradient>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>
          📊 Total Habits: {totalHabits}
        </Text>
        <Text style={styles.statsText}>
          ✅ Completed Today: {completedTodayCount}
        </Text>
      </View>

      {/* Add Habit */}
      <View style={styles.addHabitContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add new habit..."
          value={newHabitName}
          onChangeText={setNewHabitName}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={addHabit}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HabitCard
            habit={item}
            strengthScore={calculateStrengthScore(item)}
            onComplete={() => handleComplete(item.id)}
            onDelete={() => deleteHabit(item.id)}
            onPress={() =>
              navigation.navigate("HabitDetail", {
                habit: item,
              })
            }
          />
        )}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
  },
  headerContainer: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#E8F5E9",
    marginTop: 4,
  },
  statsContainer: {
    margin: 20,
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 15,
    elevation: 4,
  },
  statsText: {
    fontSize: 14,
    color: "#444",
  },
  addHabitContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 15,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default DashboardScreen;
