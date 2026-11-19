const mongoose = require("mongoose");

const authModel = new mongoose.Schema({
  username: {
    type: String,
    required: [
      true, "Username kiritilishi kerak"],
      trim: true
  },
  email: String
})