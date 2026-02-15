const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    name: { type: String, required: true },
    difficulty: { type: Number, default: 5 },
    completedDays: { type: Number, default: 0 },
    totalDays: { type: Number, default: 0 },
    completedStreak: { type: Number, default: 0 },
    missedDays: { type: Number, default: 0 },
    completedToday: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Habit", habitSchema);
