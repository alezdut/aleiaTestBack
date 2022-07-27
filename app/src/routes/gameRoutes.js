const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middlewares/requireAuth");

const Question = mongoose.model("Question");
const Answer = mongoose.model("Answer");
const Score = mongoose.model("Score");

const router = express.Router();

router.get("/questions/all", requireAuth, (req, res) => {
  Question.find()
    .then((r) => {
      if (!r) {
        return res.status(400).json({ success: false, error: "not found" });
      }
      res.status(200).json({ success: true, data: r });
    })
    .catch((err) => {
      res.status(400).json({ success: false, error: err });
    });
});

router.get("/answers/all", requireAuth, (req, res) => {
  Answer.find()
    .then((r) => {
      if (!r) {
        return res.status(400).json({ success: false, error: "not found" });
      }
      res.status(200).json({ success: true, data: r });
    })
    .catch((err) => {
      res.status(400).json({ success: false, error: err });
    });
});

router.post("/question/new", requireAuth, (req, res) => {
  const { name, description, answerId } = req.body;
  if (!name || !description || !answerId) {
    return res
      .status(500)
      .json({ success: false, error: "must send name, description and correct answer" });
  } else {
    Answer.findById(answerId).then((r) => {
      if(r){
        Question.create({ name, description, answer: answerId })
      .then((r) => {
        res.status(200).json({ sucess: true, data: r });
      })
      .catch((err) => {
        res.status(400).json({ success: false, error: err });
      });
      }
    }).catch((e) => {
      res.status(400).json({success: false, error: "missed answer Id"})
    })
    
  }
});

router.post("/answer/new", requireAuth, (req, res) => {
  const { description } = req.body;
  if (!description) {
    return res
      .status(500)
      .json({ success: false, error: "must send answer description" });
  } else {
    
  Answer.create({ description })
      .then((r) => {
        res.status(200).json({ sucess: true, data: r });
      })
      .catch((err) => {
        res.status(400).json({ success: false, error: err });
      });
      }
})
  


router.post("/score/new", requireAuth, (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res
      .status(500)
      .json({ success: false, error: "must send an user Id" });
  } else {
    
  Score.create({ userId })
      .then((r) => {
        res.status(200).json({ sucess: true, data: r });
      })
      .catch((err) => {
        res.status(400).json({ success: false, error: err });
      });
      }
})

router.put("/question/validate", requireAuth, async(req, res) => {
  const { questionId, answerId, userId } = req.body;
  if (!questionId || !answerId || !userId) {
    return res
      .status(500)
      .json({ success: false, error: "must send an question Id, answerId and email" });
  } else {
  let {score} = await Score.findOne({userId: userId})

  const question = await Question.findById(questionId)

  if(question.answer == answerId){
      score = score + 3
      console.log(score);
  }
  else{
      score = score -1
  }
  
    Score.findOneAndUpdate({userId: userId}, {score: score}).then(r => {
      res.status(200).json({ sucess: true, data: r });
    }).catch((err) => {
      res.status(400).json({ success: false, error: err });
    });
  
  }
})

module.exports = router;
