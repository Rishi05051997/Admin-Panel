import Associate from '../models/associate.model'
// const associates = [
//     {
//         _id: "1", 
//         item:"Amazon",
//         qty: 10,
//         date: new Date(),

//     },
//     {
//         _id: "1", 
//         item:"Amazon",
//         qty: 10,
//         date: new Date(),

//     },
//     {
//         _id: "1", 
//         item:"Amazon",
//         qty: 10,
//         date: new Date(),

//     },
// ];

export default {
    finadAll(req, res, next) {
        res.json(associates);
    },
    create(req, res) {
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
};