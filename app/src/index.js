require("./models/User");
require("./models/Answer");
require("./models/Question");
require("./models/Score");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const gameRoutes = require("./routes/gameRoutes");
const requireAuth = require("./middlewares/requireAuth");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(gameRoutes);
app.use(userRoutes);

const mongoUri = "mongodb+srv://admin:admin@cluster0.quh2qho.mongodb.net/?retryWrites=true&w=majority";

if (!mongoUri) {
  throw new Error(
    `MongoURI was not supplied`
  );
}
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});
mongoose.connection.on("error", (err) => {
  console.error("Error connecting to mongo", err);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
