const mongoose = require("mongoose");

//each answer has the reference of a question
const answerSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: false,
  },
});

mongoose.model("Answer", answerSchema);
