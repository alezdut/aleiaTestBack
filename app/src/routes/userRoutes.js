const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middlewares/requireAuth");
const User = mongoose.model("User");

const router = express.Router();

router.get("/users/all", requireAuth, (req, res) => {
  User.find()
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

router.get("/users/", requireAuth, (req, res) => {
  const email = req.query.email;
  User.findOne({ email: email })
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


module.exports = router;
