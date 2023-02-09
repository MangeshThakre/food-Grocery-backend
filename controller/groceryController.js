const groceryModel = require("../model/grocerySchema.js");

/// add item

const addItem = async (req, res) => {
  const data = req.body;
  if (data.length < 1) {
    return res
      .status(400)
      .json({ success: false, message: "Item is required" });
  }
  try {
    const groceryInfo = groceryModel(data);
    const result = await groceryInfo.save(data);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/// remove item
const removeItem = async (req, res) => {
  const { itemId } = req.params;
  try {
    const result = await groceryModel.findByIdAndDelete(itemId);
    if (!result) {
      return res.status(400).json({ success: false, message: "invalid id" });
    }
    return res.status(200).json({
      success: true,
      data: result,
      message: "successfuly remove the item"
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

////  update item
const updateItem = async (req, res) => {
  const { itemId } = req.params;
  const data = req.body;

  try {
    const result = await groceryModel.findByIdAndUpdate(itemId, data, {
      runValidators: true,
      setDefaultsOnInsert: true,
      new: true
    });

    if (!result) {
      return res.status(400).json({ success: false, message: "invalid id" });
    }
    return res.status(200).json({
      success: true,
      data: result,
      message: "successfuly update the item"
    });
  } catch (error) {
    ////validation
    if ((error.name = "CastError")) {
      return res.status(400).json({
        success: false,
        message:
          "validation fail please enter valid field type path:" + error.path
      });
    }
    return res.status(400).json({ success: false, message: error.message });
  }
};
/// get items
const getItems = async (req, res) => {
  const { search } = req.query;
  const query = {};
  if (search)
    query["$text"] = {
      $search: search,
      $caseSensitive: false,
      $diacriticSensitive: true
    };
  try {
    const result = await groceryModel.find(query);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { addItem, removeItem, updateItem, getItems };
