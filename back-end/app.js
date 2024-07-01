const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const adminRoute = require("./routes/admin");

app.use(adminRoute);

const MONGODB_URI =
  "mongodb+srv://minhquang:25031998@cluster0.0tlx60u.mongodb.net/review-lab";

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
