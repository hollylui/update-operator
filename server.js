const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

const { PORT, DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;
app.set(PORT, PORT || 4000);

app.use(express.json());
app.use(cors());

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => console.log("we are connected to the database."))
  .catch((error) =>
    console.log("an error occurred while connecting ot the db", error)
  );

const songRoutes = require("./routes/songRoutes");
app.use("/api/songs", songRoutes);

app.all("*", (req, res) => {
  res.status(500).send("Invalid path");
});

app.listen(PORT, () => console.log("Server started on port " + PORT));
