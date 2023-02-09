const mongoose = require("mongoose");
const { Schema } = mongoose;

const grocerySchema = new Schema(
  {
    itemName: { type: String, require: [true, "Item name is Require"] },
    unit: { type: String, default: "kilogram" },
    quantity: { type: Number }
  },
  { timestamps: true }
);

//  search index on itemName field
grocerySchema.index({ itemName: "text" });
const groceryModel = mongoose.model("grocery", grocerySchema);
module.exports = groceryModel;
