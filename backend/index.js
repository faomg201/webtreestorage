const expressFunction = require('express');
const mongoose = require('mongoose');
var expressApp = expressFunction();

const url = 'mongodb://localhost:27017/database';
const config = {
    autoIndex: true,
    userNewUrlParser: true,
    useUnifiedTopology: true
};

expressApp.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200')
    res.setHeader('Access-Control-Allow-Methods','POST, GET, PUT, PATCH, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Option, Authorization')
    return next()
});


  
 expressApp.use(expressFunction.urlencoded({
    limit: '50mb',
    parameterLimit: 100000,
    extended: true 
  }));

expressApp.use(expressFunction.json({
    limit: '50mb'
  }));

expressApp.use((req, res, next) => {
    mongoose.connect(url, config)
    .then(() => {
        console.log('Connected to MongoDB...');
        next();
    })
    .catch(err => {
        console.log('Cannot connect to MongoDB');
        res.status(501).send('Cannot connect to MongoDB')
    });
});

expressApp.use('/signup', require('./routes/signup'))
expressApp.use('/login', require('./routes/signin'))
expressApp.use('/admin', require('./api/createadmin'))
expressApp.use('/user',require('./api/user'))

expressApp.listen(3000, function(){
    console.log('Listening on port 3000')
});
