const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const config = require('config');
const jwt = require('jsonwebtoken');
const ValidateApt = require('../../models/ValidateApt');

const Apartment = require('../../models/apartment');

router.get('/', (req, res) => {  
  const { priceStart, priceEnd } = req.query;

  let price;
  let params;

  if (priceStart || priceEnd) {
    price = {
      $gte: priceStart || 0,
      $lte: priceEnd || 9999999
    }
    delete req.query.priceEnd;
    delete req.query.priceStart;
  }

  params = req.query;
  if(price){
    params.price = price;
  }
  console.log(params);

  Apartment.find(params)
  .sort({ date: -1 })
  .then(apartments => res.json(apartments))
});

router.post('/', auth, (req, res) => {
  console.log('Post made');
  const { error } = ValidateApt.validate(req.body);
  if (error){
    return res.status(400).json({ msg: error.details[0].message, color: 'danger' });
  }
  const token = req.header('x-auth-token');
  const decoded = jwt.verify(token, config.get('jwtSecret'));
  req.body.userId = decoded.id;
  const newApartment = new Apartment(req.body);

  newApartment.save().then(apartment => res.json({ msg: 'Apartment listing added', color: 'success' }));
});

router.delete('/:id', auth, (req, res) => {
  console.log('Delete request made');
  const token = req.header('x-auth-token');
  const decoded = jwt.verify(token, config.get('jwtSecret'));
  
  Apartment.findById(req.params.id)
  .then(apartment => apartment.userId === decoded.id ? apartment.remove().then(() => res.json({ success: true, msg: 'Apartment listing removed', color: 'warning' })) : res.json({ msg: 'Unauthorized user', color: 'danger' }))
  .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;