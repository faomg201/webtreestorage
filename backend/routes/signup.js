var expressFunction = require('express');
const router = expressFunction.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');



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
    conllection: 'users'
});

let User
try {
    User = mongoose.model('users')
} catch (error) {
    User = mongoose.model('users', userSchema);
}

const makeHash = async(plainText) => {
    const result = await bcrypt.hash(plainText, 10);
    return result;
}

const insertUser = (dataUser) => {
    return new Promise ((resolve, reject) => {
        var new_user = new User({
            username: dataUser.username,
            password: dataUser.password,
            email: dataUser.email,
            gender: dataUser.gender,
            birth: dataUser.birth,
            phone: dataUser.phone,
            role: dataUser.role
        });
        new_user.save((err, data) => {
            if(err){
                reject(new Error('Cannot insert user to DB!'));
            }else{
                resolve({massage: 'Sign up successfully',show: data});
            }
        });
    });
}






router.route('/adduser')
    .post((req, res) => {
        makeHash(req.body.password)
        .then(hashText => {
            const payload = {
                username: req.body.username,
                password: hashText,
                email: req.body.email,
                gender: req.body.gender,
                birth: req.body.birth,
                phone: req.body.phone,
                role: "user"
            }
            console.log(payload);
            insertUser(payload)
                .then(result => {
                    console.log(result);
                    res.status(200).json(result);
                })
                .catch(err => {
                    console.log(err);
                })
        })
        .catch(err => {
        
        })
    });

  
    
module.exports = router
