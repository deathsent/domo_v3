// index.js
const multer = require("multer");
var express = require("express");
var cors = require("cors");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var mongo_uri = "mongodb+srv://admin:1234@tidchat.j88pl.gcp.mongodb.net/DOMO-Store?retryWrites=true&w=majority";
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.connect(mongo_uri, { useNewUrlParser: true, useUnifiedTopology: false }).then(
  () => {
    console.log("[success] task 2 : connected to the database ");
  },
  error => {
    console.log("[failed] task 2 " + error);
    process.exit();
  }
);

const storage = multer.diskStorage({
  destination: './css/main.css',
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
}).single("myImage");

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('./css/main.css'));
app.set('view engine', 'ejs')

app.post("/stock", (req, res) => {
  upload(req, res, (err) => {
    if(err){
      alert(err)
      console.log(err + "efererere")
    }else{
      console.log(req.file + "egeggeg")
      res.send('test')
    }
  })
});


app.post('/signup',(req, res,  next) => {
  console.log(req.body)
})

var port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("[success] task 1 : listening on port " + port);
});

app.get("/api", (req, res) => {
  res.status(200).send("หน้าแรกของ api express");
});

// path สำหรับ MongoDB ของเรา

var Stock = require("./stock");
app.use("/api/stock", Stock);

// var Account = require("./accountrouter");
// app.use("/api/account", Account);

// var Order = require("./orderrouter");
// app.use("/api/order", Order);

var Users = require("./Users")
app.use("/api/users", Users)

app.use((req, res, next) => {
  var err = new Error("ไม่พบ path ที่คุณต้องการ");
  err.status = 404;
  next(err);

  module.exports = {
    dev:{
      assetsSubDirectory:'static',
      assetsPublicPath:'/',
      proxyTable:{
        '/api/users':{
          target:'http:localhost:5000',
          changeOrigin:true
        }
      }
    }
  }


});