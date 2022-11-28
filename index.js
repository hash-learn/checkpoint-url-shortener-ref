require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./routes');
const app = express();

// custom middleware
app.use(function(req,res,next){
    console.log("first middleware running",req.path)
    next()
})

// Built-in middleware
app.use(express.json());        // Middleware which is parsing our request JSON
app.use(express.urlencoded({extended:true}));        // Middleware which executes or reads url encoded request
app.use(express.static('public'))

// Third party middleware
if (process.env.NODE_ENV === "development"){
    app.use(morgan('tiny'));
}
app.use(cors());

// Middleware is a function which takes in 3 parameters : req, res, next

// request ----> function() ---> returns manipulated Request ---> next function() ---> response

// Use the defined routes
app.use(router)

// Middleware for REST API routes
app.get('/',(req,res) => {
    res.sendFile(__dirname + "/public/index.html")
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})