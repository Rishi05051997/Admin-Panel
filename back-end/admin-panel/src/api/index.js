const express = require('express');
import {associateRouter} from './resources/associate';
import {userRouter} from './resources/user';


export const restRouter = express.Router();
restRouter.use('/associates', associateRouter);
restRouter.use('/users', userRouter);
