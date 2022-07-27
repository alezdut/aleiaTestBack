const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  correct: {
    type: Boolean,
    required: true,
    default: false
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: false,
  },
});

mongoose.model("Answer", answerSchema);
