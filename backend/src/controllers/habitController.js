const Habit = require("../models/habitModel");

// Create Habit
exports.createHabit = async (req, res) => {
  const { name, difficulty } = req.body;

  const habit = await Habit.create({
    user: req.user._id,
    name,
    difficulty
  });

  res.status(201).json(habit);
};

// Get All Habits
exports.getHabits = async (req, res) => {
  const habits = await Habit.find({ user: req.user._id });
  res.json(habits);
};

// Mark Complete
exports.completeHabit = async (req, res) => {
  const habit = await Habit.findById(req.params.id);

  if (!habit)
    return res.status(404).json({ message: "Habit not found" });

  habit.completedDays += 1;
  habit.totalDays += 1;
  habit.completedStreak += 1;
  habit.completedToday = true;

  await habit.save();
  res.json(habit);
};

// Delete Habit
exports.deleteHabit = async (req, res) => {
  const habit = await Habit.findById(req.params.id);

  if (!habit)
    return res.status(404).json({ message: "Habit not found" });

  await habit.deleteOne();
  res.json({ message: "Habit deleted" });
};
