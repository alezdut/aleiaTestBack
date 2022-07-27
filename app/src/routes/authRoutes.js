const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = new User({ email, password });
    await user.save();

    const token = jwt.sign(
      { userId: user._id },
      "UnBQ6hkZIWaPEqwwS91G4QV9j5Iy3q31"
    );
    res.send({ token });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: "Must provide email and password" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(422).send({ error: "Invalid password or email" });
  }
  try {
    await user.comparePassword(password);
    const token = jwt.sign(
      { userId: user._id },
      "UnBQ6hkZIWaPEqwwS91G4QV9j5Iy3q31"
    );
    const data = {
      email: user.email,
      token: token,
      isAutenticated: true
    }
    res.status(200).json({success: true, data: data});
  } catch (err) {
    return res.status(422).send({ error: "Invalid password or email" });
  }
});

module.exports = router;