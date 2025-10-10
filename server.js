require('dotenv').config
const express = require("express");
const cors = require("cors");
const shopifyRouter = require("./src/routes/shopify"); // path to your router
const app = express();
app.use(cors());
// Make sure this matches your frontend call
app.use("/api/shopify", shopifyRouter);
app.listen(8080, () => console.log("Server running on port 8080"));