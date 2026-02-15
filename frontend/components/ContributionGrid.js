import React from "react";
import { View, StyleSheet } from "react-native";

const ContributionGrid = ({ data }) => {
  const getColor = (count) => {
    if (count === 0) return "#E0E0E0";
    if (count === 1) return "#A5D6A7";
    if (count === 2) return "#66BB6A";
    return "#2E7D32";
  };

  return (
    <View style={styles.grid}>
      {data.map((day, index) => (
        <View
          key={index}
          style={[
            styles.box,
            { backgroundColor: getColor(day.count) },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: 210,
  },
  box: {
    width: 20,
    height: 20,
    margin: 3,
    borderRadius: 4,
  },
});

export default ContributionGrid;
