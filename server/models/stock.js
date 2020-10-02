// foodmodel.js

var mongoose = require("mongoose");

var stockSchema = mongoose.Schema(
  {
    // กำหนด ชื่อและชนิดของ document เรา
    productName: {
      type: String
    },
    productDetail: {
        type: String
      },
    productPrice: {
        type: Number
      },
    productQuantity: {
        type: Number
      },
      productImage: {
        type: String
      }
  },
  {
    // กำหนด collection ของ MongoDB หรือจะไม่กำหนดก็ได้
    collection: "product"
  }
);

// ถ้าไม่ได้กำหนด collection ข้างบน default จะเป็น "foods"
var Stock = mongoose.model("product", stockSchema);
module.exports = Stock;