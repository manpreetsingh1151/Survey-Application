

const mongoose = require("mongoose");

// mongoose.connect("mongodb+srv://manpreetsingh1151:Ghotra%401315@cluster0.bsg7myf.mongodb.net/?appName=Cluster0")
mongoose.connect("process.env.MONGO_URI")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));
