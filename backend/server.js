const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const cardsRouter = require("./routes/cards");
const childRouter = require("./routes/child");

app.use("/adult", cardsRouter);
app.use("/children", childRouter);

/**
 * Central Error Handler
 */
app.use((err, req, res, next) => {
  res
    .status(500)
    .json(`Error: Internal Server Error:::${err.name ?? "Unknown Error"}`);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
