const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  title: {type: String, required: true, min: 3},
  contentText: {type: String, required: false, min: 3},
  status: {type: Boolean, required: true},
  id: {type: String, required: true, min: 3},
  creationDate: {type: Date, required: true},
});

module.exports = mongoose.model("Movie", movieSchema);