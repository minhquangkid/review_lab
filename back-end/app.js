const express = require("express");

const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const adminRoute = require("./routes/admin");

app.use(adminRoute);

app.listen(5000);
