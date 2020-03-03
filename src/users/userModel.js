const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config/config");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      index: true,
      trim: true,
      tolowercase: true,
      match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 12
    },
    subscription: {
      type: String,
      enum: ["free", "pro", "premium"],
      default: "free"
    },
    token: {
      type: String,
      default: null
    }
  },
  { timestamps: true }
);

userSchema.methods.getPublicFields = function() {
  const returnObject = {
    userData: {
      email: this.email
    },
    token: this.token
  };
  return returnObject;
};

userSchema.methods.validatePassword = function(password) {
  const compare = bcrypt.compareSync(password, this.password);
  return compare;
};

userSchema.methods.getJWT = function() {
  const preToken = jwt.sign(
    {
      id: this._id
    },
    config.secretJwtKey
  );

  const token = preToken;
  this.token = token;
  this.save();
  return token;
};

const User = mongoose.model("User", userSchema, "users");

module.exports = User;
