const express = require("express")
const users = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const User = require("./models/User")
users.use(cors())

process.env.SECRET_KEY = 'secret'





// // POST (create new data)
// router.post("/", (req, res) => {
//   console.log("ssss",req.body);
//   var obj = new Usert(req.body);
//   obj.save((err, data) => {
//     if (err) return res.status(400).send(err);
//     res.status(200).send("เพิ่มข้อมูลเรียบร้อย");
//   });
// });


// // DELETE (delete 1 data)
// router.delete("/:_id", (req, res) => {
//     console.log("ssss",req);
//     Account.findByIdAndDelete(req.params._id, (err, data) => {
//     if (err) return res.status(400).send(err);
//     res.status(200).send("ลบข้อมูลเรียบร้อย");
//   });
// });


users.post("/register", (req, res) =>{
    const today = new Date()
    const userData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        role:req.body.role,
        password: req.body.password,
        created: today,

    }
    User.findOne({
        email:req.body.email
    })
    .then(user =>{
        if(!user){
            bcrypt.hash(req.body.password, 10, (err, hash)=>{
                userData.password = hash
                User.create(userData)
                .then(user => {
                    res.json({status: user.email + ' registed'})
                })
                .catch(err =>{
                    res.send('error: '+err)
                })
            })
        }else{
            console.log(res);
            res.json({err: 'User already exists'})
        }
    })
    .catch(err =>{
        res.send('error: '+ err)
    })
})

users.post('/login', (req, res) =>{
    User.findOne({
        email:req.body.email
    })
    .then(user => {
        if(user){
            if(bcrypt.compareSync(req.body.password, user.password)){
                const payload ={
                    _id:user._id,
                    first_name:user.first_name,
                    last_name:user.last_name,
                    email:user.email,
                    role:user.role,
                    password:user.password
                }
                let token = jwt.sign(payload, process.env.SECRET_KEY, {
                    expiresIn:1440
                })
                res.send(token)
            }else{
                res.json({error: 'User does now exist'})
            }
        }else{
            res.json({error: 'User does not exsit'})
        }
    })
    .catch(err =>{
        res.send('error: ' + err)
    })
})

users.get('/' , (req, res) =>{
    User.find().exec((err, data) => {
            if (err) return res.status(400).send(err);
            res.status(200).send(data);
    })
})

users.get('/:_id', (req,res ) => {
    User.findById(req.params._id).exec((err, data) =>{
        if (err) return res.status(400).send(err);
        res.status(200).send(data);
    })
})




users.put("/:_id", (req, res) => {
    User.findByIdAndUpdate(req.params._id, req.body, (err, data) =>{
        if (err) return res.status(400).send(err);
        res.status(200).send("อัพเดทข้อมูลเรียบร้อย")
    })
})

users.delete("/:_id", (req, res) => {
    console.log("ssss",req);
    User.findByIdAndDelete(req.params._id, (err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send("ลบข้อมูลเรียบร้อย");
  });
});

//     console.log("ssss",req.body);
//     Account.findByIdAndUpdate(req.params._id, req.body, (err, data) => {
//     if (err) return res.status(400).send(err);
//     res.status(200).send("อัพเดทข้อมูลเรียบร้อย");
//   });
// });


module.exports = users