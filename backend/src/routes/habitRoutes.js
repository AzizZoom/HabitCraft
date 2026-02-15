const express = require("express");
const {
  createHabit,
  getHabits,
  completeHabit,
  deleteHabit
} = require("../controllers/habitController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);

router.get("/", getHabits);
router.post("/", createHabit);
router.put("/:id/complete", completeHabit);
router.delete("/:id", deleteHabit);

module.exports = router;
