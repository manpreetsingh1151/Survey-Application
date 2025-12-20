
const express = require('express');
const path = require("path");
const connectDB = require("./db");
const Business = require("./models/Business");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// serve static files
app.use(express.static(path.join(__dirname, "public")));

// app.use(express.static("public"));
connectDB();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use(async (req, res, next) => {
  try {
    // await connectDB();
    next();
  } catch (err) {
    res.status(500).send("Database connection failed");
  }
});

app.post("/submit", async (req, res) => {
    try {
    await Business.create({
        businessName: req.body.bname,
        communicatorName: req.body.cname,
        issueDesciption: req.body.idescription,
        surveyorComments: req.body.scomments,
        cDate: req.body.tdate
    });

    res.send("Survey submitted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error saving survey");
  }
})


//search functionality////////////

app.get("/search", async (req, res) => {
  try {
    const query = req.query.q;
    if (!query || typeof query !== "string") {
      return res.redirect("/");
    }

    const results = await Business.find({
      businessName: { $regex: query.trim(), $options: "i" }
    });

    if (results.length === 0) {
      return res.send(`
        <h2>No results found</h2>
        <a href="/">Back</a>
      `);
    }

    let html = `
      <h2>Search Results</h2>
      <a href="/">Back</a>
      <ul>
    `;

    results.forEach(item => {
      const formattedDate = item.cDate
        ? item.cDate.toISOString().split("T")[0]
        : "N/A";

      html += `
        <li>
          <strong>${item.businessName}</strong><br>
          Communicator: ${item.communicatorName}<br>
          Issue: ${item.issueDesciption}<br>
          Date: ${item.cDate.toISOString().split("T")[0]}
          Date: ${formattedDate}
        </li><br>
      `;
    });

    html += "</ul>";

    res.send(html);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error searching surveys");
  }
});


//////////////////////////////



module.exports = app;
