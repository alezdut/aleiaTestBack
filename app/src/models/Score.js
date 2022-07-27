const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
  score: {
    type: Number,
    required: true,
    default: 0
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

mongoose.model("Score", scoreSchema);
