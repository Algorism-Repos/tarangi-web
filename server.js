require('dotenv').config();
const express = require("express");
const cors = require("cors");
const path = require ("path");

const shopifyRouter = require("./src/routes/shopify"); // path to your router
const app = express();
app.use(cors());

// Make sure this matches your frontend call
app.use("/api/shopify", shopifyRouter);

const buildPath = path.join(__dirname, "build");
app.use(express.static(path.join(__dirname, "build")));

//Handling undefined routes in express to be handled in React
app.get("/*splat", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});


app.listen(8080, () => console.log("Server running on port 8080"));