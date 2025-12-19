
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
    const communicatorName = req.body.cname;
    const issueDesciption = req.body.idescription;
    const surveyorComments = req.body.scomments;
    const cDate = req.body.tdate;
    // const fDate = doc.cDate.toISOString().split("T")[0];
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

// app.listen(3000, () => {
//     console.log("Server running on port 3000");
// })