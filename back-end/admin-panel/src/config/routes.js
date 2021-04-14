// import express from 'express';
import associateController from '../api/controllers/associate.controller';
export const router = express.Router();


// associates routes
router.get('/associates', associateController.findAll);
router.get('/associates/:id', associateController.findOne);
router.post('/associates', associateController.create);
router.delete('/associates/:id', associateController.delete);
router.put('/associates/:id', associateController.update);




