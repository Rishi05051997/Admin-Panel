// const express = require('express');
import express from "express";
// import  mongoose from " mongoose";

const mongoose = require('mongoose');
import {router} from '../src/config/routes'
import logger from 'morgan';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import swaggerDocument from './config/swagger.json';

const app = express(); 
const PORT = 3000;
mongoose.Promise = global.Promise;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
mongoose.connect('mongodb://localhost/associate-builder', options);



app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(logger('dev'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    explorer: true
}))
// middleware 
app.use('/api', router);

app.use((req, res ,next) => {
    const error = new Error ('Not found');
    error.message = "Invalid Route"
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    return res.json({
        error : {
            message: error.message
        }
    })
})

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