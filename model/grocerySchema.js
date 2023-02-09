const mongoose = require("mongoose");
const { Schema } = mongoose;

const grocerySchema = new Schema(
  {
    itemName: { type: String, require: [true, "Item name is Require"] },
    unit: { type: String },
    quantity: { type: Number }
  },
  { timestamps: true }
);

//  search index on itemName field
userSchema.index({ itemName: "text" });
const groceryModel = grocerySchema("grocery", grocerySchema);
module.exports = groceryModel;
