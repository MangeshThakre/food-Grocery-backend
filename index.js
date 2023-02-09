require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoDBConnect = require("./config/databaseConnection.js");
const app = require("./app.js");
const PORT = process.env.PORT || 8081;
const groceryRouter = require("./routers/groceryRouter");
app.use(express.json());
app.use(cors());

// connect to database
mongoDBConnect();

// routes
app.use("/api", groceryRouter);
app.use("/", (req, res) => {
  res.status(200).json({ data: "connected to the grocery server" });
});

app.listen(PORT, () =>
  console.log(`server is running on http://localhost:${PORT} `)
);
