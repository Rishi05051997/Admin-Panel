// const express = require('express');
import express from "express";
// import  mongoose from " mongoose";
const mongoose = require('mongoose');
import {router} from '../src/config/routes'

const app = express(); 
const PORT = 3000;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/associate-builder');



// middleware 
app.use('/api', router);

app.get('/', (req, res) => {
    res.json({
        msg: 'Welcome to Associate builder backend...!!!'
    })
})


// app.get('/associates', (res, req) => {
//     res.json(associates);
// })

app.listen(PORT , () => {
    console.log(`server running at ${PORT}`)
});