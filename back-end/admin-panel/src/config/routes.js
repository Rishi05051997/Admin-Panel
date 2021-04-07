import express from 'express';
import associateController from '../api/controllers/associate.controller';
export const router = express.Router();


// associates routes
router.get('/associates', associateController.finadAll);
router.post('/associates', associateController.create);