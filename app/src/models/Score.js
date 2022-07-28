const mongoose = require("mongoose");

//the score has the current score and the user that it belongs to
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
