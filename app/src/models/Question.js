const mongoose = require("mongoose");

//each question has name ex "Question 1", description ex "the question itself", and the correct answer reference
const questionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  answer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Answer",
    required: true,
  },
});

mongoose.model("Question", questionSchema);
