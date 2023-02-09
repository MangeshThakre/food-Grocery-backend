const express = require("express");
const groceryRouter = express.Router();
const {
  addItem,
  removeItem,
  updateItem,
  getItems
} = require("../controller/groceryController.js");

groceryRouter.post("/grocery", addItem);
groceryRouter.delete("/grocery/:itemId", removeItem);
groceryRouter.patch("/grocery/:itemId", updateItem);
groceryRouter.get("/grocery", getItems);

module.exports = groceryRouter;
