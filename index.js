require("dotenv").config();
const express = require("express");
const cors = express("cors");
const mongoDBConnect = require("./config/databaseConnection.js");
const app = require("./app.js");
const PORT = process.env.PORT || 8081;
const groceryRouter = require("./routers/groceryRouter");
app.use(express.json());
app.use(cors());

app.use("/api", groceryRouter);
app.use("/", (req, res) => {
  res.status(200).json({ data: "tonnected to the grocery server" });
});

app.listen(PORT, () =>
  console.log(`server is running on http://localhost:${PORT} `)
);
