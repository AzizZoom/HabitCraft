export const adjustHabitDifficulty = (habit) => {
  let updatedHabit = { ...habit };

  // Reduce difficulty if missed 2 days
  if (updatedHabit.missedDays >= 2) {
    updatedHabit.difficulty = Math.max(1, updatedHabit.difficulty * 0.8);
    updatedHabit.missedDays = 0;
  }

  // Increase difficulty if 5 day streak
  if (updatedHabit.completedStreak >= 5) {
    updatedHabit.difficulty = updatedHabit.difficulty * 1.1;
    updatedHabit.completedStreak = 0;
  }

  return updatedHabit;
};

export const calculateStrengthScore = (habit) => {
  if (habit.totalDays === 0) return 0;
  return ((habit.completedDays / habit.totalDays) * habit.difficulty).toFixed(2);
};
