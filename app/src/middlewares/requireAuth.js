const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ error: "You must be logged in." });
  }

  const token = authorization.replace("Bearer ", "");
  jwt.verify(
    token,
    "UnBQ6hkZIWaPEqwwS91G4QV9j5Iy3q31",
    async (err, payload) => {
      if (err) {
        return res.status(401).send({ error: "You must be logged in." });
      }

      const { userId } = payload;

      const user = await User.findById(userId);

      req.user = user;
      next();
    }
  );
};
