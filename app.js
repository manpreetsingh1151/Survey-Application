
const express = require('express');
const path = require("path");
const connectDB = require("./db");
const Business = require("./models/Business");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// serve static files
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).send("Database connection failed");
  }
});


app.post("/submit", async (req, res) => {
    try {
    const businessName = req.body.bname;
    const communicatorName = req.body.cname;
    const issueDesciption = req.body.idescription;
    const surveyorComments = req.body.scomments;
    const cDate = req.body.tdate;
    await Business.create({
        businessName: businessName,
        communicatorName: communicatorName,
        issueDesciption: issueDesciption,
        surveyorComments: surveyorComments,
        cDate: cDate
    });

    res.send("Survey submitted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error saving survey");
  }
})

module.exports = app;
