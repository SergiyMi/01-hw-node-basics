const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const urlSchema = new Schema(
  {
    url: {
      type: String,
      required: true
    },
    shortUrl: String
  },
  { timestamps: true }
);

module.exports = Urls = mongoose.model("Urls", urlSchema);
