const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db")
require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT || 3000

connectDB()

app.listen(PORT, () => {
  console.log("Server is running at:" + PORT);
  
})