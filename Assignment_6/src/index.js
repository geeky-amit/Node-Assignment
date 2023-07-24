const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();
//connect to DB
//"mongodb+srv://tapasamit02:amit123@blogs.taudum5.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(
  process.env.DATABASE_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to DB");
  }
);

app.listen(3000, () => console.log("Server running......"));
