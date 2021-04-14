// const express = require('express');
import express from "express";
// import  mongoose from " mongoose";

const mongoose = require('mongoose');
// import {router} from '../src/config/routes'
// import logger from 'morgan';
// import swaggerUi from 'swagger-ui-express';
// import cors from 'cors';
// import passport from 'passport';
// import swaggerDocument from './config/swagger.json';
import { restRouter } from "./api/";
import {devConfig} from "./config/env/development"
import {setGlobalMiddleware} from './api/middleware/global-middleware'


const app = express(); 
const PORT = devConfig.port;
mongoose.Promise = global.Promise;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}
mongoose.connect(`mongodb://localhost/${devConfig.database}`, options);



// app.use(express.json());
// app.use(express.urlencoded());
// app.use(cors());
// app.use(logger('dev'));
// app.use(passport.initialize());
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
//     explorer: true
// }))
//// Global Middleware
setGlobalMiddleware(app);

// middleware 
app.use('/api', restRouter);

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