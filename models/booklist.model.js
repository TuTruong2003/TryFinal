const mongoose = require("mongoose");

// define Schema Class
const Schema = mongoose.Schema;

// Create a Schema object
const bookSchema = new Schema({
  title: { type: String, required: true },
  author: {type: String, required: true },
  description: {type: String },
  pages: {type:Number  }

});


const bookModel = mongoose.model("300372032-AnhTu", bookSchema);
module.exports = bookModel;