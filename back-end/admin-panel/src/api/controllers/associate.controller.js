// import Joi from 'Joi';
// const Joi = require('Joi')
// const Joi = require("@hapi/joi");
// import HttpStatus from 'http-status-codes';
import Associate from '../models/associate.model'

export default {
  findAll(req, res, next) {
    Associate.find()
      .then(associates => res.json(associates))
      .catch(err => res.status(500).json(err));
  },
  create(req, res, next) {
    // const schema = Joi.object().keys({
    //   item: Joi.string().required(),
    //   date: Joi.date().required(),
    //   due: Joi.date().required(),
    //   qty: Joi.number()
    //     .integer()
    //     .required(),
    //   tax: Joi.number().optional(),
    //   rate: Joi.number().optional(),
    // });
    // const { error, value } = Joi.validate(req.body, schema);
    // if (error && error.details) {
    //   return res.status(400).json(error);
    // }
    // Associate.create(value)
    //   .then(associate => res.json(associate))
    //   .catch(err => res.status(500).json(err));


    const {item, qty, date, due, tax, rate} = req.body;
        if(!item) {
            return res.status(400).json({err:'Item is required field'});
        }
        if(!qty) {
            return res.status(400).json({err:'Quanity is required field'});
        }
        if(!date) {
            return res.status(400).json({err:'Date is required field'});
        }
        if(!due) {
            return res.status(400).json({err:'Due is required field'});
        }
        Associate.create({item, qty, date, due, tax, rate})
        .then( associate => {
            res.json(associate);
        })
        .catch(err => res.status(500).json(err));

    
  },
  findOne(req, res) {
    const { id } = req.params;
    Associate.findById(id)
      .then(associate => {
        if (!associate) {
          return res.status(HttpStatus.NOT_FOUND).json({ err: 'Could not find any associate' });
        }
        return res.json(associate);
      })
      .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
  },
  delete(req, res) {
    const { id } = req.params;
    Associate.findByIdAndRemove(id)
      .then(associate => {
        if (!associate) {
          return res.status(HttpStatus.NOT_FOUND).json({ err: 'Could not delete any associate' });
        }
        return res.json(associate);
      })
      .catch(err => res.status(500).json(err));
  },
  update(req, res) {
    const { id } = req.params;
    const allBody = req.body;
    const {item, qty, date, due, tax, rate} = allBody;
    if(item || qty || date || due) {
        return res.status(200).json({item, qty, date, due,tax, due});
        
    }
    // if(!qty) {
    //     return res.status(400).json({err:'Quanity is required field'});
    // }
    // if(!date) {
    //     return res.status(400).json({err:'Date is required field'});
    // }
    // if(!due) {
    //     return res.status(400).json({err:'Due is required field'});
    // }
    Associate.create({item, qty, date, due, tax, rate})
    .then( associate => {
        res.json(associate);
    })
    .catch(err => res.status(500).json(err));

    // const schema = Joi.object().keys({
    //   item: Joi.string().optional(),
    //   date: Joi.date().optional(),
    //   due: Joi.date().optional(),
    //   qty: Joi.number()
    //     .integer()
    //     .optional(),
    //   tax: Joi.number().optional(),
    //   rate: Joi.number().optional(),
    // });
    // const { error, value } = Joi.validate(req.body, schema);
    // if (error && error.details) {
    //   return res.status(400).json(error);
    // }
    // Associate.create(value)
    //   .then(associate => res.json(associate))
    //   .catch(err => res.status(500).json(err));



    Associate.findOneAndUpdate({ _id: id }, value, { new: true })
      .then(associate => res.json(associate))
      .catch(err => res.status(500).json(err));
  },
};