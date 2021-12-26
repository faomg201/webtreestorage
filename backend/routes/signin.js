const expressFunction = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = expressFunction.Router();

const key = 'MY_KEY';

var Schema = require("mongoose").Schema;

const userSchema = Schema({
    username: String,
    password: String,
    email: String,
    gender: String,
    birth: String,
    phone: String,
    role: String
},  {
    collection: 'users'
});

let User
try {
    User = mongoose.model('users')
}   catch(error){
    User = mongoose.model('users', userSchema);
}

const compareHash = async(plainText, hashText) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plainText, hashText, (err, data) => {
            if(err) {
                reject(new Error('Error bcrypt compare'))
            }else{
                resolve({status: data});
            }
        })
    });
}

const findUser = (username) => {
    return new Promise((resolve, reject) => {
        User.findOne({username: username}, (err, data) => {
            if(err){
                reject(new Error('Cannot find username!'));
            }else{
                if(data){
                    resolve({id:data._id, username: data.username, password: data.password, role: data.role})
                }else{
                    reject(new Error('Cannot find username!'));
                }
            }
        })
    })
}

router.route('/signin')
    .post(async (req, res) => {
        const payload = {
            username: req.body.username,
            password: req.body.password,
        };
        console.log(payload);

        try{
            const result = await findUser(payload.username);
            const loginStatus = await compareHash(payload.password, result.password);
            console.log(result)
            console.log(loginStatus)
            const status = loginStatus.status;
           
            if(status){
                const token = jwt.sign(result, key, {expiresIn: '15d'});
                res.status(200).json({result, token, status});
            }else{
                res.status(200).json({status})
            }
        } catch(error) {
            res.status(404).send(error);
        }
    })
module.exports = router


