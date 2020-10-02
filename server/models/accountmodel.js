// accountmodel.js

var mongoose = require("mongoose");

var accountSchema = mongoose.Schema(
  {
    // กำหนด ชื่อและชนิดของ document เรา
    username: {
      type: String
    },
    password: {
        type: String
      },
    firstName: {
        type: String
      },
    lastName: {
        type: String
      },
      email: {
        unique:true,
        type: String
      },
      address: {
        type: String
      },
      role: {
        type: String
      },
  },
  {
    // กำหนด collection ของ MongoDB หรือจะไม่กำหนดก็ได้
    collection: "account"
  }
);

// ถ้าไม่ได้กำหนด collection ข้างบน default จะเป็น "foods"
var Account = mongoose.model("account", accountSchema);
module.exports = Account;