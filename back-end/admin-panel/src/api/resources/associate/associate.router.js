import express from "express";
import passport from 'passport';
import associateController from './associate.controller';


export var associateRouter = express.Router();

associateRouter
    .route('/')
    .post(passport.authenticate('jwt', {session: false}),associateController.create)
    .get(passport.authenticate('jwt', {session: false}),associateController.findAll);

associateRouter
    .route('/:id')
    .put(passport.authenticate('jwt', {session: false}),associateController.update)
    .delete(passport.authenticate('jwt', {session: false}),associateController.delete)
    .get(passport.authenticate('jwt', {session: false}),associateController.findOne);

