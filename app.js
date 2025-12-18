
const express = require('express');
require("./db");
const Business = require("./models/Business");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// serve static files
app.use(express.static("public"));

app.post("/submit", async (req, res) => {
    try {
    const businessName = req.body.bname;
    await Business.create({
        businessName: businessName
    });

    // console.log("Business Name:", businessName);
    res.send("Survey submitted successfully");
    res.send("Survey submitted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error saving survey");
  }
    
})

app.listen(3000, () => {
    console.log("Server running on port 3000");
})