import userService from "./user.service";
// import { BAD_REQUEST } from 'http-status-codes'
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './user.model';
import {devConfig} from "./../../../config/env/development"



export default {
    async signup(req, res) {
        // try {
        // return res.json({msg: 'Signup'});
        // validate the request
    //     const {email, value } = userService.validateSchema(req.body);
        const {email, password} = req.body;
        if(!email) {
            return res.status(400).json({err:'email is required field'});
        }
        if(!password) {
            return res.status(400).json({err:'password is required field'});
        }
        User.create({email, password})
        .then( user => {
            res.json({success: true, message:'User created successfully'});
        })
        .catch(err => res.status(500).json(err));

    //     if (error && error.details) {
    //         return res.status(502).json(error);
    //     }

    //     // encrypt the user password

    //     // create new user
    //     const user = await User.create(value);
    //     return res.json(user);
    // } 
    // catch(err){
    //     return res.status(500).json(err);
    // }
    },
    async login(req, res) {
        const {email, password} = req.body;
        const user = await User.findOne({ email: email});
        const token = jwt.sign({id: user._id}, `${devConfig.secret}`, { expiresIn: '1d' });
        {return res.json({success: true, token}); } 
        if(email || password) {
            return res.status(200).json({email, password});
        }
        
        // if(!password) {
        //     return res.status(400).json({err:'password is required field'});
        // }
       
        if(!user){
            return res.status(502).json({err: 'invalid email or password'});
        }
        const matched = await bcryptjs.compare(password, user.password);
        if(!matched){
            return res.status(500).json({err:'Invalid credentials'});
        }
        
        
       
        User.create({email, password})
        .then( user => {
            res.json({success: true, message:'login successfully'});
        })
        .catch(err => res.status(500).json(err));

    }
};