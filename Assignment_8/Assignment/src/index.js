const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

dotenv.config();
//connect to DB

mongoose.connect(process.env.DATABASE_URL).then(() => {
  console.log("connected to DB");
});

app.listen(process.env.PORT, () => console.log("Server running......"));
