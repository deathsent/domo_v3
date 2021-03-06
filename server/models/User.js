const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "users",
  }
);
module.exports = User = mongoose.model("users", UserSchema);
