const express = require("express");
const { connection } = require("./config/db");
const { router } = require("./routes/userRoute");

const cors = require("cors"); 
const app = express();
require('dotenv').config(); 

app.use(express.json());

app.use(
  cors()
);

const port = process.env.PORT; 

 app.use("/api",router)

app.get("/", (req, res) => {
  try {
    res.send("Welcome");
  } catch (error) {
    console.log("Error");
  }
});

app.listen(port, async () => {
  try {
    await connection;
    console.log("Connected to db");
  } catch (error) {
    console.log("Error occurred");
  }
  console.log(`Running on ${port}`);
});
