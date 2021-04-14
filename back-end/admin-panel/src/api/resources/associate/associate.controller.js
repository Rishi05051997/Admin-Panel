// import Joi from 'joi';
// const Joi = require('Joi')
// const Joi = require("@hapi/joi");
// import HttpStatus from 'http-status-codes';
import Associate from './associate.model'

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


    const {empId, name, location, email, role ,status, password} = req.body;
        if(!empId) {
            return res.status(400).json({err:'EmployeeId is required field'});
        }
        if(!name) {
            return res.status(400).json({err:'Name is required field'});
        }
        if(!location) {
            return res.status(400).json({err:'Location is required field'});
        }
        if(!email) {
            return res.status(400).json({err:'Email is required field'});
        }
        if(!role) {
          return res.status(400).json({err:'Role is required field'});
      }
        Associate.create({empId, name, location, email, role, status, password})
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
    const {empId, name, location, email, role, status, password} = allBody;
    if(empId, name, location, email, role) {
        return res.status(200).json({empId, name, location, email, status, password});
        
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
    Associate.create({empId, name, location, email, role, status, password})
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