import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import DashboardScreen from "./screens/DashboardScreen";
import HabitDetailScreen from "./screens/HabitDetailScreen";
import AnalyticsScreen from "./screens/AnalyticsScreen";
import ProfileScreen from "./screens/ProfileScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HabitDetail"
        component={HabitDetailScreen}
        options={{ title: "Habit Details" }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Analytics") {
              iconName = focused
                ? "stats-chart"
                : "stats-chart-outline";
            } else if (route.name === "Profile") {
              iconName = focused
                ? "person"
                : "person-outline";
            }

            return (
              <Ionicons
                name={iconName}
                size={22}
                color={color}
              />
            );
          },
          tabBarActiveTintColor: "#4CAF50",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: { height: 60, paddingBottom: 5 },
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Analytics" component={AnalyticsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
