const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contactSchema = new Schema(
  {
    id: {
      type: String,
      trim: true,
      unique: true
    },
    name: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 50
    },
    email: {
      type: String,
      index: true,
      unique: true,
      trim: true,
      minlength: 6,
      validate: () => console.log(this)
    },
    phone: {
      type: String,
      index: true,
      unique: true,
      trim: true,
      minlength: 7,
      maxlength: 10
    }
  },
  {
    timestamps: true
  }
);

const Contact = mongoose.model("Contact", contactSchema, "contacts");

module.exports = Contact;
