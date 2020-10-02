// foodrouter.js
var express = require("express");
var router = express.Router();
var Stock = require("../server/models/stock");
var multer = require("multer");
const ejs = require('ejs');
const path = require('path');
// const { app } = require("firebase");

// GET all
router.get("/", (req, res) => {
  Stock.find().exec((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(data);
  });
});

// GET 1
router.get("/:_id", (req, res) => {
  console.log("ssss", req);
  Stock.findById(req.params._id).exec((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(data);
  });
});

/// POST (create new data)
router.post("/", (req, res) => {
  // req.file('mypic').upload((err, uploadedFiles) => {
  //   console.log('UploadedFiles', uploadedFiles);
  // })
  var obj = new Stock(req.body);
  obj.save((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send("เพิ่มข้อมูลเรียบร้อย");
  });
});



// PUT (update current data)
router.put("/:_id", (req, res) => {
  Stock.findByIdAndUpdate(req.params._id, req.body, (err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send("อัพเดทข้อมูลเรียบร้อย");
    res.redirect("../src/components/Manage/Stock.vue");
  });
});

// DELETE (delete 1 data)
router.delete("/:_id", (req, res) => {
  console.log("ssss", req);
  Stock.findByIdAndDelete(req.params._id, (err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send("ลบข้อมูลเรียบร้อย");
  });
});



module.exports = router;
