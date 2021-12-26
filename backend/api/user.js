const expressFunction = require('express');
const authorization = require('../config/authorize');
const router = expressFunction.Router();
const mongoose = require('mongoose');

var Schema = require("mongoose").Schema;
const userSchema = Schema({
    username: String,
    password: String,
    email: String,
    gender: String,
    birth: Date,
    phone: Number,
    role: String
},  {
    conllection: 'users'
});

let User
try {
    User = mongoose.model('users')
} catch (error) {
    User = mongoose.model('users', userSchema);
}


const updateUserData = (data,id) =>{
    return new Promise((resolve, reject) => {
        const query = {_id:id }
        User.findOneAndUpdate(query,{ $set :{username: data.username,
            email:data.email,
            phone: data.phone,}},(err, data) => {
            if(err){
                reject(new Error('Cannot Update'))
            }else{
                resolve(data)
            }
        })
    })
}
const getUserData = (id) => {
    return new Promise((resolve, reject) => {
        User.find({_id:id},(err, data) => {
            if(err){
                reject(new Error('Cannot get User Data'))
            }
            else{
                resolve(data)
            }
        })
    })
}


router.route('/updateuser/:id').put(authorization,(req, res) => {
    const id = req.params.id
    const payload = {
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
    }
    updateUserData(payload,id)
    .then(result => {
        res.status(200).send(result)
    })
    .catch(err => {
        console.log(err)
    })
})

router.route('/getuserdata/:id').get(authorization,(req, res) => {
    const id = req.params.id
     getUserData(id)
     .then(result => {
            res.status(200).send(result)
     })
     .catch(err => {
            console.log(err)
     })
})
module.exports = router